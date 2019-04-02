import { Component, OnInit, Inject } from '@angular/core';
import { ProductosService } from 'src/app/services/services.index';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TOKEN } from 'src/app/config/config';
import { DOCUMENT } from '@angular/platform-browser';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {

  nuevo:boolean;
  producto = {};
  componentInit = false;
  imagenes = [];
  loadingElementDisplay: any;

  constructor(private productosServ: ProductosService,
              private route: ActivatedRoute,
              @Inject(DOCUMENT) private _document,) { }

  ngOnInit() {
    this.loadingElementDisplay = this._document.getElementById("loading-screen").style.display;
    let isNuevo = this.productosServ.isProductoNuevoNavParam;
    if(isNuevo == undefined){
      isNuevo = true;
    }
    if(isNuevo){
      this.nuevo = true;
      this.componentInit = true;
    }else{
      this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
        this.productosServ.showProducto(TOKEN, params.get("id"))
      )
    ).subscribe((respuesta)=>{
      this.nuevo = false;
      this.producto = respuesta.data;
      this.imagenes = respuesta.data.imagenes;
      this.componentInit = true;
    })
    }
  }
}
