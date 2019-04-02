import { Component, OnInit } from '@angular/core';
import { EntregasService } from 'src/app/services/services.index';
import { ObjEntregas } from 'src/app/interfaces/interfaces';
import { TOKEN } from 'src/app/config/config';
declare function initPluginDataTable();

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styles: []
})
export class EntregasComponent implements OnInit {

  entregas:ObjEntregas;

  constructor(private entregasServ: EntregasService) { }

  ngOnInit() {
    this.entregasServ.getEntregasBasic(TOKEN).subscribe((respuesta)=>{
      console.log(respuesta);
      initPluginDataTable();

      if(respuesta.status == "success"){
        this.entregas = respuesta.data;
      }
    })
  }

}
