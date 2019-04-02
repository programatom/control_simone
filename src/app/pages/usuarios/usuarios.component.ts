import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/services.index';
import { TOKEN } from 'src/app/config/config';
import { Router } from '@angular/router';
declare function initPluginDataTable();

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios = [];

  constructor(private usuariosServ: UsuariosService,
              private router: Router) { }

  ngOnInit() {
    this.usuariosServ.getUsuarios(TOKEN).subscribe((respuesta)=>{
      console.log(respuesta);
      initPluginDataTable();
      this.usuarios = respuesta.data;
    })
  }

  irAUsuario(usuario){
    this.router.navigateByUrl("/usuario/" + usuario.id);
  }

}
