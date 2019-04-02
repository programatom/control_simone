import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpService) { }

  getUsuarios(token){

    let url= URL_SERVICES + "usuarios";
    return this.http.httpGet(url, token);
  }

  getUsuarioShowAdmin(token, id){
    let url = URL_SERVICES + "usuarioShowAdmin/" + id;
    return this.http.httpGet(url, token);
  }

  registerUser(data:{
    email:string
	  password:string
	  name:string
	  password_confirmation:string
	  role:string
  }){
    let url = URL_SERVICES + "register";
    return this.http.httpPost(url, data);
  }

 updateUser(data:{
   email:string
   password:string
   name:string
 }, token){
   let url  = URL_SERVICES + "usuarioUpdate";
   return this.http.httpPost(url, data, token);
 };
}
