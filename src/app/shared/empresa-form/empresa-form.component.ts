import { Component, OnInit, Input } from '@angular/core';
import { EmpresasService } from 'src/app/services/services.index';
import { TOKEN } from 'src/app/config/config';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styles: []
})
export class EmpresaFormComponent implements OnInit {


  @Input('empresa') empresaInput: any;

  empresa = new Object() as {
    nombre:string
    razon_social:string
    CUIT:number
    dom_fiscal:string
    saldo:number
    telefono:number
    calle:string
    numero:number
    piso:number
    depto:string
    nombre_receptor:string
    provincia:string
    localidad:string
    observaciones:string
  }

  constructor(private empresasServ: EmpresasService) { }

  ngOnInit() {
    this.empresa = this.empresaInput;
  }

  guardarEmpresa(){
    let data = this.empresa;
    this.empresasServ.updateEmpresaAdmin(data,TOKEN).subscribe((respuesta)=>{
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
