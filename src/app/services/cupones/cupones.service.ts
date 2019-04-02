import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { ObjRespuestaServidor } from 'src/app/interfaces/interfaces';
import { HttpService } from "../http.service";

@Injectable({
  providedIn: 'root'
})
export class CuponesService {

  constructor(private http: HttpService) { }

  crearCupon ( data, token):Observable<ObjRespuestaServidor>{
    let url = URL_SERVICES + "cuponesStore";
    return this.http.httpPost(url, data ,token);
  }

  eliminarCupon ( data, token):Observable<ObjRespuestaServidor>{
    let url = URL_SERVICES + "cuponesDelete";
    return this.http.httpPost(url, data ,token);
  }

  buscarCupones(token){
    let url = URL_SERVICES + "cupones";
    return this.http.httpGet(url, token);
  }
}
