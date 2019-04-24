import { Component, OnInit, Input } from '@angular/core';
import { ParticularesService } from 'src/app/services/services.index';
import { TOKEN } from 'src/app/config/config';

@Component({
  selector: 'app-particular-form',
  templateUrl: './particular-form.component.html',
  styles: []
})
export class ParticularFormComponent implements OnInit {

  @Input('particular') particularInput: any;

  particular = new Object() as {
    telefono:string
    calle:string
    numero:number
    piso:number
    depto:string
    localidad:string
    provincia:string
    observaciones:string
  }


  constructor(private particularServ: ParticularesService) { }

  ngOnInit() {
    this.particular = this.particularInput;
  }


  guardarParticular(){
    let data = this.particular;
    this.particularServ.updateParticularAdmin(data,TOKEN).subscribe((respuesta)=>{
      console.log(respuesta);
      if(respuesta.status == "success"){
        swal("Exito!", "Se actualizaron los datos con éxito", "success");

      }else{
        let errores = respuesta.data;
        let keys = Object.keys(errores);
        swal("Error!", errores[keys[0]].toString() , "error");
      }
    })
  }



}
