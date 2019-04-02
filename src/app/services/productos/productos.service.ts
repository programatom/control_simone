import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { URL_SERVICES, TOKEN } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  isProductoNuevoNavParam:boolean;

  constructor(private http: HttpService) { }

  getProductos(token) {
    let url = URL_SERVICES + "productos";
    return this.http.httpGet(url, token);
  }

  cargarArchivo(formData , token) {
    let url = URL_SERVICES + "guardarImagen";
    return this.http.httpPut(url, formData, token, "file");
  }

  crearProducto(data:{
    producto
    imagenes
  } , token) {
    let url = URL_SERVICES + "crearProducto";
    return this.http.httpPost(url, data, token);
  }

  updateProducto(data:{
    producto
    imagenes
  } , token){
    let url = URL_SERVICES + "modificarProducto";
    return this.http.httpPost(url, data, token);
  }

  eliminarImagen(data ,token){
    let url = URL_SERVICES + "eliminarImagen";
    return this.http.httpPost(url, data, token);
  }

  getImagenes(token){
    let url = URL_SERVICES + "imagenes";
    return this.http.httpGet(url, token);
  }

  showProducto(token, id){
    let url = URL_SERVICES + "productoShow/" + id;
    return this.http.httpGet(url, token);
  }
}
