import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UsuariosService } from 'src/app/services/services.index';
import { TOKEN } from 'src/app/config/config';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  usuario = new Object() as {
    api_token
    email
    email_verified_at
    id
    name
    role
    created_at
    updated_at
    data_rol
    pedidos
}
  data_rol:any;
  pedidos = {

  };

  dataInit = false;
  rol_element:any;
  usuario_element:any;

  textoBotonRol:string = "Mostrar datos del rol";
  textoBotonUsuario:string = "Mostrar Usuario";

  constructor(private route: ActivatedRoute,
              private usuarioServ: UsuariosService,
              @Inject(DOCUMENT) private _document,) { }

  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.usuarioServ.getUsuarioShowAdmin(TOKEN, params.get("id"))
      )
    ).subscribe((data) => {

      console.log(data);
      var usuario = data.data;
      this.usuario.id = usuario.id;
      this.usuario.name = usuario.name;
      this.usuario.email = usuario.email;
      this.usuario.role = usuario.role;
      this.usuario.created_at = usuario.created_at;
      this.usuario.updated_at = usuario.updated_at;
      this.data_rol = usuario.data_rol[0];
      this.displayLogic(usuario.role);

    });
  }

  mostrarRol(){
    if(this.rol_element.style.display == "none"){
      this.textoBotonRol = "Ocultar datos de " + this.usuario.role;
      this.rol_element.style.display = "inline";
    }else{
      this.textoBotonRol = "Mostrar datos de " + this.usuario.role;
      this.rol_element.style.display = "none";
    }
  }

  mostrarUsuario(){
    if(this.usuario_element.style.display == "none"){
      this.textoBotonUsuario = "Ocultar datos de usuario";
      this.usuario_element.style.display = "inline";
    }else{
      this.textoBotonUsuario = "Mostrar datos de usuario";
      this.usuario_element.style.display = "none";
    }
  }

  displayLogic(role){

    if(role == "particular"){
      // MUESTRO META DATA Y PEDIDOS
      this.dataInit = true;
      setTimeout(()=>{
        this.usuario_element = this._document.getElementById("usuario-form-edit");
        this.usuario_element.style.display = "none";

        this.rol_element = this._document.getElementById("particular-form");
        this.textoBotonRol = "Mostrar datos de particular";
        this.rol_element.style.display = "none";
        return;

      },100)
    }

    if(role == "empresa"){
      // MUESTRO META DATA Y PEDIDOS
      this.dataInit = true;
      setTimeout(()=>{
        this.usuario_element = this._document.getElementById("usuario-form-edit");
        this.usuario_element.style.display = "none";

        this.rol_element = this._document.getElementById("empresa-form");
        this.rol_element.style.display = "none";
        this.textoBotonRol = "Mostrar datos de empresa";
        return;
      },100)
    }

    if(role == "empleado"){
      // MUESTRO META DATA Y PEDIDOS

      this.dataInit = true;
      setTimeout(()=>{
        this.usuario_element = this._document.getElementById("usuario-form-edit");
        this.usuario_element.style.display = "none";

        this.rol_element = this._document.getElementById("empleado-form");
        this.rol_element.style.display = "none";
        this.textoBotonRol = "Mostrar datos de empleado";
        return;
      },100)
    }
  }

}
