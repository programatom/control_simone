import { Component, OnInit, Inject } from '@angular/core';
import { ProductosService } from 'src/app/services/services.index';
import { TOKEN, URL_ASSETS } from 'src/app/config/config';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {

  productos = [];
  loadingElementDisplay: any;

  constructor(private productosServ: ProductosService,
              private router:Router,
              @Inject(DOCUMENT) private _document) { }

  ngOnInit() {
    this.buscarProductos();
  }

  buscarProductos(){
    this.loadingElementDisplay = this._document.getElementById("loading-screen").style.display;
    this.loadingElementDisplay = "inline"
    this.productosServ.getProductos(TOKEN).subscribe((respuesta)=>{
      console.log(respuesta);
      if(respuesta.status == "success"){
        let productos = respuesta.data;
        for(let i = 0; i < productos.length; i ++){
          let producto = productos[i];
          let imagenes = producto.imagenes;
          imagenes.find((element)=>{
            if(element.pivot.rol == "principal"){
              let urlFotoPpal = URL_ASSETS + element.url;
              producto.imagen_principal = urlFotoPpal;
              this.productos.push(producto);
            }
          })
        }
        this.loadingElementDisplay = "none"
      }
    })
  }

  modificarProducto(producto){
    this.productosServ.isProductoNuevoNavParam = false;
    this.router.navigateByUrl("/producto/" + producto.id);
  }

  nuevoProducto(){
    this.productosServ.isProductoNuevoNavParam = true;
    this.router.navigateByUrl("/producto/" + 0);
  }

}
