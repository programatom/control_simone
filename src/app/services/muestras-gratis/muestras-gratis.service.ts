import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class MuestrasGratisService {

  constructor(private http:HttpService) {

  }

  muestrasGratisSinVer(token){
    let url = URL_SERVICES + "muestrasPedidoSinVer";
    return this.http.httpGet(url, token);
  }
}
