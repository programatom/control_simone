import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { CuponesService } from 'src/app/services/services.index';
import { TOKEN } from 'src/app/config/config';
import swal from 'sweetalert';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styles: []
})
export class CuponesComponent implements OnInit {

  cupon = new Object() as {
    codigo
    fecha_expiracion
    tipo
  };
  cupones = []
  constructor(@Inject(DOCUMENT) private _document,
              private cuponServ: CuponesService) { }

  ngOnInit() {
    let radio:any = document.getElementById("radio1");
    radio.checked = true;
    this.cuponServ.buscarCupones(TOKEN).subscribe((cupones)=>{
      console.log(cupones);
      if(cupones.status == "success"){
        this.cupones = cupones.data;
      }else{

      }
    })
  }

  aplicarCodigoRandom(){
    this.cupon.codigo = Math.round((Math.random()* 1000) * 412)
  }

  crearCupon(){
    let radio:any = document.getElementById("radio1")

    if(radio.checked){
      this.cupon.tipo = "unico";
    }else{
      this.cupon.tipo = "multiple";
    }

    console.log(this.cupon);

    this.cuponServ.crearCupon(this.cupon, TOKEN).subscribe((respuesta)=>{
      console.log(respuesta);
      if(respuesta.status == "success"){
        this.cupones.push(respuesta.data);
        swal("Exito!", "Se agregó el cupón con éxito", "success");

      }else{
        let errores = respuesta.data;
        let keys = Object.keys(errores);
        swal("Error!", errores[keys[0]].toString() , "error");
      }
    })
  }

  eliminarCupon(index){
    let id = this.cupones[index].id;
    let data = {
      "id" : id
    };
    this.cupones.splice(index , 1)
    this.cuponServ.eliminarCupon(data, TOKEN).subscribe((resp)=>{
      console.log(resp);
    })
  }


}
