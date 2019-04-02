import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from 'src/app/services/services.index';
import { TOKEN } from 'src/app/config/config';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styles: []
})
export class UsuarioFormComponent implements OnInit {

  @Input('usuario') usuarioInput: any;
  @Input('nuevo') nuevo: string;

  usuario = new Object as {
    email:string
    name:string
    password:string
    role:string
    password_confirmation:string
  };

  title:string;
  subtitle:string;

  constructor(private usuarioServ: UsuariosService) { }

  ngOnInit() {
    if(this.nuevo == "true"){
      this.title = "Crear nuevo usuario";
      this.subtitle = "Una vez creado el usuario podrá agregar más datos pertinentes"
      this.usuario.email = "";
      this.usuario.name = "";
      this.usuario.password = "";
      this.usuario.password_confirmation = "";
      this.usuario.role = "particular";
    }else{
      this.usuario = this.usuarioInput;
      this.title = "Modificar datos del usuario";
      this.subtitle = "Recuerde realizar cambios en los datos del usuario solo en casos específicos"
    }
  }

  guardarUsuario(){

    let data = this.usuario;
    console.log(data)

    if(this.nuevo == "true"){
      this.usuarioServ.registerUser(data).subscribe((respuesta)=>{
        console.log(respuesta);
        if(respuesta.status == "success"){
          swal("Exito!", "Se creó el usuario con éxito", "success");
        }else{
          let errores = respuesta.data;
          let keys = Object.keys(errores);
          swal("Error!", errores[keys[0]].toString() , "error");
        }
      })
    } else {
      this.usuarioServ.updateUser(data, TOKEN).subscribe((respuesta)=>{
        console.log(respuesta);
        if(respuesta.status == "success"){
          swal("Exito!", "Se actualizaron los datos con éxito", "success");
        }else{
          let errores = respuesta.data;
          let keys = Object.keys(errores);
          swal("Error!", errores[keys[0]][0].toString() , "error");
        }
      })
    }

  }

}
