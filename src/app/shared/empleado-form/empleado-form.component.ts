import { Component, OnInit, Input } from '@angular/core';
import { EmpleadosService } from 'src/app/services/services.index';
import { TOKEN } from 'src/app/config/config';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styles: []
})
export class EmpleadoFormComponent implements OnInit {

  @Input("empleado") empleadoInput;

  empleado = new Object () as {
    dni:number
    nombre:string
  }

  constructor(private empleadoServ: EmpleadosService) { }

  ngOnInit() {
    this.empleado = this.empleadoInput;
  }

  guardarEmpresa(){
    let data = this.empleado;
    this.empleadoServ.updateEmpleadoAdmin(data,TOKEN).subscribe((respuesta)=>{
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
