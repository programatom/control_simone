import { Injectable } from '@angular/core';

import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { ObjRespuestaServidor } from 'src/app/interfaces/interfaces';
import { HttpService } from "../http.service";

@Injectable({
  providedIn: 'root'
})
export class EntregasService {

  constructor(private http: HttpService) {

  }

  getEntregasBasic(token:string):Observable<ObjRespuestaServidor>{
    let url = URL_SERVICES + "entregas";
    return this.http.httpGet(url, token);
  }

}
