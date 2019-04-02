import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http: HttpService) { }

  updateEmpresaAdmin(data,token){
    let url = URL_SERVICES + "empresasUpdate";
    return this.http.httpPost(url, data, token);
  }
}
