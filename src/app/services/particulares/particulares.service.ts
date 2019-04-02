import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ParticularesService {

  constructor(private http: HttpService) { }

  updateParticularAdmin(data,token){
    let url = URL_SERVICES + "particularesUpdate";
    return this.http.httpPost(url, data, token);
  }
}
