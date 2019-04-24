import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PedidosService } from 'src/app/services/services.index';
import { switchMap } from 'rxjs/operators';
import { TOKEN } from 'src/app/config/config';
import * as moment from 'moment';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: []
})
export class PedidoComponent implements OnInit {

  pedido: any = {};
  request: any;
  totalProductos: number = 0;

  esteMes = [];
  estaSemana = [];
  historico = [];

  activeDisplayEntregas = "";
  pedidoElement: any;
  textoBotonPedido: string = "Editar pedido";

  componentInit = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private pedidosServ: PedidosService,
    @Inject(DOCUMENT) private _document) {
    this.pedido.usuario = [{
      "role": ""
    }];

  }

  date() {
    // Esto me dice el dia de la semana
    console.log(new Date("2019-02-07 21:08:49"));
  }

  ngOnInit() {




    this.activeDisplayEntregas = "Esta semana";

    document.getElementById("estaSemana").style.display = "flex";
    document.getElementById("esteMes").style.display = "none";
    document.getElementById("historico").style.display = "none";

    // Pasar una variable entre página y página

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.pedidosServ.getPedidosShowAdmin(TOKEN, params.get("id"))
      )
    ).subscribe((data) => {
      console.log(data)
      this.pedido = data.data;
      console.log(this.pedido)
      this.componentInit = true;
      setTimeout(()=>{
        this.pedidoElement = this._document.getElementById("pedido-form-2");
        this.pedidoElement.style.display = "none";

      },500)
      let productos = this.pedido.productos;
      for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        let precio = producto.precio;
        let cantidad = producto.pivot.cantidad;
        this.totalProductos = this.totalProductos + precio * cantidad;
      }

      this.totalProductos = this.numberToDisplayStyle(this.totalProductos)
      this.filterEntregasDates();

    });
  }



  editarPedido(){

    if(this.textoBotonPedido == "Editar pedido"){
      this.textoBotonPedido = "Ocultar edición pedido";
      this.pedidoElement.style.display = "inline";
    }else{
      this.textoBotonPedido = "Editar pedido";
      this.pedidoElement.style.display = "none";

    }
  }

  numberToDisplayStyle(number) {
    let string = number.toString();
    let split = string.split(".");
    if (split.length == 1) {
      return this.numberWithCommas(string) + ".00";
    } else {
      return this.numberWithCommas(string);
    }
  }


  numberWithCommas(string) {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  filterEntregasDates() {


    let entregas = this.pedido.entregas;
    for (let i = 0; i < entregas.length; i++) {
      //2019-02-18 13:39:18
      let entrega = entregas[i];
      let fecha = entrega.fecha_de_entrega;
      if( this.isThisWeek(fecha)){
        this.estaSemana.push(entrega);
        continue;
      }
      if( this.isThisMonth(fecha)){
        this.esteMes.push(entrega);
        continue;
      }
      this.historico.push(entrega);
    }


  }

  isThisMonth(fecha){
    let hoy = new Date();
    let esteMes = hoy.getMonth();
    let mesComparar = new Date(fecha).getMonth();
    if( esteMes != mesComparar){
      return false;
    }else{
      return true;
    }
  }

  isThisWeek(fecha){
    var now = moment();
    var input = moment(fecha);
    return now.isoWeek() == input.isoWeek();
  }

  cambiarDisplayEntregas(tipo){
    if(tipo == "mes"){
      document.getElementById("estaSemana").style.display = "none";
      document.getElementById("esteMes").style.display = "flex";
      document.getElementById("historico").style.display = "none";
      this.activeDisplayEntregas = "Este mes"
    }else if (tipo == "semana"){
      document.getElementById("estaSemana").style.display = "flex";
      document.getElementById("esteMes").style.display = "none";
      document.getElementById("historico").style.display = "none";
      this.activeDisplayEntregas = "Esta semana"
    }else{
      document.getElementById("estaSemana").style.display = "none";
      document.getElementById("esteMes").style.display = "none";
      document.getElementById("historico").style.display = "flex";
      this.activeDisplayEntregas = "Historico"
    }
  }

}
