import { Component, OnInit } from '@angular/core';
import { MuestrasGratisService, PedidosService } from 'src/app/services/services.index';
import { TOKEN } from 'src/app/config/config';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  muestrasGratisSinVer = [];
  muestrasGratisSinVerRaw = [];
  muestrasGratisSinVerCount:number;

  pedidosSinVer: any =[];
  pedidosSinVerRaw = [];
  pedidosSinVerCount:number;
  muestraElegida: any;

  pedidosSinDatos = [];
  pedidosSinDatosRaw = [];
  pedidosSinDatosCount: number;

  constructor(private muestrasGratisServ: MuestrasGratisService,
              private pedidosServ: PedidosService,
              private router: Router,
              private modalService: NgbModal) {

              }

  ngOnInit() {
    this.muestrasGratisServ.muestrasGratisSinVer(TOKEN).subscribe((muestrasGratisSinVer)=>{
      console.log(muestrasGratisSinVer)
      this.muestrasGratisSinVerRaw = muestrasGratisSinVer.data;
      this.muestrasGratisSinVerCount = muestrasGratisSinVer.data.length;
      if(this.muestrasGratisSinVerCount > 15){
        this.muestrasGratisSinVer = muestrasGratisSinVer.data.splice(0,15);
      }else{
        this.muestrasGratisSinVer = muestrasGratisSinVer.data;
      }
    })

    this.pedidosServ.getPedidosBasicAdmin(TOKEN, true).subscribe((pedidosSinVer)=>{
      console.log(pedidosSinVer);
      this.pedidosSinVerRaw = pedidosSinVer.data;
      this.pedidosSinVerCount = pedidosSinVer.data.length;
      if(this.pedidosSinVerCount > 15){
        this.pedidosSinVer = pedidosSinVer.data.splice(0,15);
      }else{
        this.pedidosSinVer = pedidosSinVer.data;
      }
    })
    let data = {
      "faltan_datos": 1
    }
    this.pedidosServ.getPedidoWhere(data, TOKEN).subscribe((pedidosSinDatos)=>{
      console.log(pedidosSinDatos);
      this.pedidosSinDatosRaw = pedidosSinDatos.data;
      this.pedidosSinDatosCount = pedidosSinDatos.data.length;
      if(this.pedidosSinDatosCount > 15){
        this.pedidosSinDatos = pedidosSinDatos.data.splice(0,15);
      }else{
        this.pedidosSinDatos = pedidosSinDatos.data;
      }
    })
  }

  irAPedido(pedido, index){
    let data = {
      "pedido":{
        "id":pedido.id,
        "visto":1
      },
      "productos":[]
    }
    this.pedidosServ.updatePedidoAdmin(data,TOKEN).subscribe(()=>{
      this.pedidosSinVerRaw.splice(index, 1);
      this.pedidosSinVer = this.pedidosSinVerRaw.splice(0, 15);
    })
    this.router.navigateByUrl("/pedido/" + pedido.id);
  }

  irAMuestra(muestra, index ,content){
    this.muestraElegida = muestra;
    this.modalService.open(content);
  }



}
