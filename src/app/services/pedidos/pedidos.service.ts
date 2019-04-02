import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { ObjRespuestaServidor } from 'src/app/interfaces/interfaces';
import { HttpService } from "../http.service";


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpService) {

  }

  storePedidoAdmin(data:{
    pedido:any,
    productos:any
  }, token){
    let url = URL_SERVICES + "pedidoStoreAdmin";
    return this.http.httpPost(url, data, token);
  }

  updatePedidoAdmin(data:{
    pedido:any,
    productos:any
  }, token){
    console.log(data);
    let url = URL_SERVICES + "pedidoUpdate";
    return this.http.httpPost(url, data, token);
  }

  getPedidosBasicAdmin(token:string, filter?):Observable<ObjRespuestaServidor>{
    let url = URL_SERVICES + "pedidos/" + filter;
    return this.http.httpGet(url, token);
  }

  getPedidosShowAdmin(token:string, id):Observable<ObjRespuestaServidor>{
    let url = URL_SERVICES + "pedidoShowAdmin/" + id;
    return this.http.httpGet(url, token);
  }

  getPedidoWhere(data, token):Observable<ObjRespuestaServidor>{
    let url = URL_SERVICES + "pedidoWhere";
    return this.http.httpPost(url, data, token);
  }
}
