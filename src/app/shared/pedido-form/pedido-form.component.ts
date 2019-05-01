import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmpleadosService, ProductosService, PedidosService } from 'src/app/services/services.index';
import { TOKEN } from 'src/app/config/config';
import swal from 'sweetalert';
declare function pluginBootstrapSelect();

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html'
})
export class PedidoFormComponent implements OnInit {

  @Input('pedido') pedidoInput: any;
  @Input('nuevo') nuevo: string;
  @Output("newPedido") newPedido = new EventEmitter();

  pedido = new Object() as {
    id?: number
    user_id: number
    descuento: number
    periodicidad: string //select definido previo
    repartidor_habitual: string //select según datos de tabla
    repartidor_excepcional: string //select según datos de tabla
    estado: string //select definido previo
    dia_de_entrega: string // un dia o dias separados por commas.
    forma_de_pago: string // select definido previo
    faltan_datos:number
    visto:number
  };

  productosNuevos: Array<{
    id: number
    cantidad: number
    nombre: string
    precio: number
    total: number
  }> = [];

  productos = [];
  empleados = [];
  title: string;
  subtitle: string;

  constructor(
    private productosServ: ProductosService,
    private empleadosServ: EmpleadosService,
    private pedidosServ: PedidosService) {

      this.pedido.faltan_datos = 0;
      this.pedido.visto = 1;


    }

  ngAfterViewInit() {
  }

  ngOnInit() {

    if (this.nuevo == "true") {
      this.title = "Pedido nuevo"
      this.subtitle = "Genere un pedido nuevo con un id de usuario válido"
    } else {
      this.title = "Edición de pedido"
      this.subtitle = "No puede cambiar el ID de usuario en la edición del pedido"
    }

    if (this.pedidoInput != "null") {
      this.initVarsPedido();
    }else{
      this.pedido.periodicidad = "semanal";
      this.pedido.estado = "en proceso";
      this.pedido.forma_de_pago = "efectivo";
    }

    this.productosServ.getProductos(TOKEN).subscribe((productos: any) => {
      this.productos = productos.data;
    });

    this.empleadosServ.getEmpleadosBasicAdmin(TOKEN).subscribe((empleados) => {
      console.log(empleados)
      if (empleados.status == "success") {
        this.empleados = empleados.data;
      }
    });
    pluginBootstrapSelect();

  }

  failValidacionCamposPedido() {
    let pedido = this.pedido;
    let keys = ["user_id",
      "descuento",
      "periodicidad",
      "repartidor_habitual",
      "repartidor_excepcional",
      "estado",
      "dia_de_entrega",
      "forma_de_pago",];

    if (pedido.user_id <= 0) {
      return [true, "Ingrese un id de usuario válido"];
    };

    if (pedido.descuento < 0 || pedido.descuento > 100) {
      return [true, "El campo de descuento debe ser un numero entre 0 y 100"];
    };

    if (pedido.descuento < 0 || pedido.descuento > 100) {
      return [true, "El campo de descuento debe ser un numero entre 0 y 100"];
    };

    if (this.productosNuevos.length == 0 ) {
      return [true, "Debe haber al menos un producto en el pedido!"];
    };

    /*
    var diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
    if (pedido.periodicidad == "diaria") {
      let dias = pedido.dia_de_entrega.split(",");
      if (dias.length == 1) {
        return [true, "Al elegir periodicidad diaria debería haber al menos dos días de entrega a la semana. Si se elige un solo día, entonces la periodicidad debe ser semanal"];
      };

      for (let i = 0; i < dias.length; i++) {
        let dia = dias[i];
        var match = false;
        for (let j = 0; j < diasSemana.length; j++) {
          if (dia == diasSemana[j]) {
            match = true;
          }
        }
        if (match == false) {
          return [true, "Al elegir periocididad diaría debe especificar los dias de entrega en la semana separador por coma y en minúsculas"];
        }
      }
    } else {
      var match = false;
      for (let j = 0; j < diasSemana.length; j++) {
        if (pedido.dia_de_entrega == diasSemana[j]) {
          match = true;
        }
      }
      if (match == false) {
        return [true, "Debe ingresar un dia de la semana en minúsculas sin tildes en el campo dia de entrega"];
      }

    }
    */

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (pedido[key] == undefined) {
        key = key.replace("_", " ");
        return [true, "El campo: " + key + " es requerido"];
      }
    }




    return true;
  }

  initVarsPedido() {
    let pedido = this.pedidoInput;
    this.pedido.id = this.pedidoInput.id;
    this.pedido.user_id = this.pedidoInput.user_id;
    this.pedido.descuento = this.pedidoInput.descuento;
    this.pedido.dia_de_entrega = this.pedidoInput.dia_de_entrega;
    this.pedido.periodicidad = this.pedidoInput.periodicidad;
    this.pedido.repartidor_habitual = this.pedidoInput.repartidor_habitual;
    this.pedido.repartidor_excepcional = this.pedidoInput.repartidor_excepcional;
    this.pedido.estado = this.pedidoInput.estado;
    this.pedido.forma_de_pago = this.pedidoInput.forma_de_pago;

    let productos = pedido.productos;

    for (let i = 0; i < productos.length; i++) {
      let producto = productos[i];
      let pivot = producto.pivot;
      let cantidad = pivot.cantidad;

      this.productosNuevos.push({
        "nombre": producto.nombre,
        "precio": producto.precio,
        "cantidad": cantidad,
        "total": cantidad * producto.precio,
        "id": producto.id
      })
    }

    return;
  }


  guardarPedido() {
    let validArray = this.failValidacionCamposPedido();

    if (validArray[0]) {
      swal("Error", validArray[1], "error")
      return;
    };


    console.log(this.pedido);
    console.log(this.productosNuevos);

    let data = {
      "pedido": this.pedido,
      "productos": this.productosNuevos
    };

    if (this.nuevo == "true") {
      this.nuevoPedido(data);
      return;
    }





    this.pedidosServ.updatePedidoAdmin(data, TOKEN).subscribe((respuesta) => {
      if (respuesta.status == "success") {
        swal("Exito!", "Se guardó el pedido con éxito", "success");
        console.log(respuesta);

      } else {
      }
    });
  }


  nuevoPedido(data) {
    data.pedido.dia_de_entrega = parseInt(data.pedido.dia_de_entrega);
    this.pedidosServ.storePedidoAdmin(data, TOKEN).subscribe((respuesta) => {
      if (respuesta.status == "success") {

        swal("Exito!", "Se creó el pedido con éxito", "success");
        this.productosNuevos = [];
        this.pedido = new Object() as any;
        this.pedido.periodicidad = "semanal";
        this.pedido.estado = "en proceso";
        this.pedido.forma_de_pago = "efectivo";
        this.newPedido.emit();
        console.log(respuesta);
      } else {
        swal("Error", "No existe el ID de usuario ingresado!", "error");
      }
    })
  }

  agregarProductoAPedidoNuevo(producto) {

    let insert = true;
    for (let i = 0; i < this.productosNuevos.length; i++) {

      if (this.productosNuevos[i].id == producto.id) {
        insert = false;
        producto.cantidad = producto.cantidad + 1;
        producto.total = producto.total + producto.precio;
        break;
      }
    }

    if (insert) {
      producto.cantidad = 1;
      producto.total = producto.precio;
      this.productosNuevos.push(producto);
    }
  }

  eliminarProductoAPedidoNuevo(index) {

    this.productosNuevos.splice(index, 1);

  }

}
