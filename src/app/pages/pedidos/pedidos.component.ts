import { Component, OnInit, Inject } from '@angular/core';
import { PedidosService, ProductosService, EmpleadosService } from 'src/app/services/services.index';
import { ObjPedido, ObjRespuestaServidor } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { TOKEN } from 'src/app/config/config';
import swal from 'sweetalert';
import { DOCUMENT } from '@angular/platform-browser';

declare function initPluginDataTable();
declare function pluginBootstrapSelect();

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {


  pedidos:Array<ObjPedido>;

  pedidoNuevo = false;
  textoBotonPedido: string = "Agregar pedido nuevo";
  pedido: any;


  constructor(private pedidosServ: PedidosService,
              private router: Router,
              private productosServ: ProductosService,
              private empleadosServ: EmpleadosService,
              @Inject(DOCUMENT) private _document,) {
              }


  ngOnInit() {


    this.pedido = this._document.getElementById("pedido-form-1");
    this.pedido.style.display = "none";
    pluginBootstrapSelect()
    this.pedidosServ.getPedidosBasicAdmin(TOKEN).subscribe((respuesta:ObjRespuestaServidor)=>{
      initPluginDataTable();
      console.log(respuesta.data)

      if(respuesta.status == "success"){
        this.pedidos = respuesta.data;
      }else{

      }
    });

  }
  mostrarPedidoNuevoForm(){

    if(this.textoBotonPedido == "Agregar pedido nuevo"){
      this.textoBotonPedido = "Ocultar pedido nuevo";
      this.pedido.style.display = "inline";
    }else{
      this.textoBotonPedido = "Agregar pedido nuevo";
      this.pedido.style.display = "none";
    }
  }

  irAPedido(pedido){
    this.router.navigateByUrl("/pedido/" + pedido.id);
  }

}
