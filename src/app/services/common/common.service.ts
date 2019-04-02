import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  objectHasUndefinedValues(object){
    let keys =Object.keys(object);
    for(let i = 0; i < keys.length; i ++){
      let key = keys[i];
      if(object[key] == undefined){
        return [true, "El campo " + key + " es requerido!"];
      }
    }
    return [false, null];
  }
}
