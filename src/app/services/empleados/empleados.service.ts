import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { ObjRespuestaServidor } from 'src/app/interfaces/interfaces';
import { HttpService } from "../http.service";


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpService) {

  }

  updateEmpleadoAdmin(data, token){
    let url = URL_SERVICES + "empleadoUpdate";
    return this.http.httpPost(url, data, token);
  };

  getEmpleadosBasicAdmin(token:string):Observable<ObjRespuestaServidor>{
    let url = URL_SERVICES + "empleados";
    return this.http.httpGet(url, token);
  }

  getEmpleadoShowAdmin(token:string, id):Observable<ObjRespuestaServidor>{
    let url = URL_SERVICES + "empleadoShow/" + id;
    return this.http.httpGet(url, token);
  }
}
