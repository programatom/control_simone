import { Component, OnInit, Inject, Input } from '@angular/core';
import { ProductosService } from 'src/app/services/services.index';
import { TOKEN, URL_ASSETS } from 'src/app/config/config';
import { DOCUMENT } from '@angular/platform-browser';
import swal from "sweetalert";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html'
})
export class ProductoFormComponent implements OnInit {

  @Input("producto") productoInput;
  @Input("imagenes") imagenesInput;
  @Input("nuevo") nuevo;



    loadingElementDisplay: any;
    imagenPrincipalObj: {
      url: string
      id: number
      rol: string
      pivot?
    };

    producto: {
      nombre: string
      precio: number
      descripcion: string
      posicion:number
    }

    imagenesSecundariasArray = [];
    imagenes = [];

    url_assets = URL_ASSETS;

    galeryChoiceDistinguisher = "";
  textoBotonFinal: any;

  constructor(private productosServ: ProductosService,
    @Inject(DOCUMENT) private _document,
    private modalService: NgbModal,
    private router: Router) { }

    ngOnInit() {

      this.loadingElementDisplay = this._document.getElementById("loading-screen").style.display;
      if(this.nuevo){
        this.producto = {
          nombre: "",
          precio: 0,
          descripcion: "",
          posicion:0
        }
        this.inicializarImagenPPal("" , 0);
        this.textoBotonFinal = "Crear producto";
      }else{
        this.producto = this.productoInput;
        this.textoBotonFinal = "Modificar producto";
        for(let i = 0; i < this.imagenesInput.length; i ++){
          let imagen = this.imagenesInput[i];
          if(imagen.pivot.rol == "principal"){
            this.inicializarImagenPPal(URL_ASSETS + imagen.url , imagen.id);
          }else{
            imagen.url = URL_ASSETS + imagen.url;
            this.imagenesSecundariasArray.push(imagen);
          }
        }
      }
    }

    inicializarImagenPPal(url , id){
      this.imagenPrincipalObj = {
        url: url,
        id: id,
        rol: "principal"
      }
    }

    cargarImagen(event, tipo) {
      let elem = event.target;
      if (elem.files.length > 0) {
        let formData = new FormData();
        formData.append('imagen', elem.files[0], elem.files[0].name);
        this.loadingElementDisplay = "inline"

        this.productosServ.cargarArchivo(formData, TOKEN).subscribe(
          (respuesta) => {
            this.loadingElementDisplay = "none";
            if (respuesta["status"] == "success") {
              if (tipo == "principal") {
                this.instanciarImagenPrincipal(respuesta.data)
              } else {
                this.agregarImagenSecundaria(respuesta.data)
              }
              console.log(respuesta);
            } else {
              swal("Error", respuesta.data, "error")
              console.log(respuesta);
            }
          });
      }
      elem.value = "";
    }

    eliminarImagen(imagen, index){
      this.loadingElementDisplay = "inline";
      this.productosServ.eliminarImagen(imagen, TOKEN).subscribe((respuesta)=>{
        this.loadingElementDisplay = "none";
        if(respuesta.status == "success"){
          swal("Éxito", respuesta.data, "success")
          this.imagenes.splice(index, 1);
        }else{
          swal("Error", respuesta.data, "error")

        }
      })
    }

    instanciarImagenPrincipal(imagen) {
      this.imagenPrincipalObj.rol = "principal";
      this.imagenPrincipalObj.id = imagen.id;
      this.imagenPrincipalObj.url = URL_ASSETS + imagen.url;
      console.log(this.imagenPrincipalObj.url)
    }

    agregarImagenSecundaria(imagen) {
      let imagenSecundaria = new Object() as any;
      imagenSecundaria.rol = "secundaria";
      imagenSecundaria.id = imagen.id;
      imagenSecundaria.url = URL_ASSETS + imagen.url;
      this.imagenesSecundariasArray.push(imagenSecundaria);
    }

    eliminarImagenSecundaria(index){
      this.imagenesSecundariasArray.splice(index,1)
    }

    elegirImagenDesdeGaleria(imagen) {
      if (this.galeryChoiceDistinguisher == "principal") {
        this.instanciarImagenPrincipal(imagen);
      } else {
        this.agregarImagenSecundaria(imagen)
      }
    }

    irALaGaleria(content, tipo) {
      this.loadingElementDisplay = "inline"
      this.productosServ.getImagenes(TOKEN).subscribe((imagenes) => {
        this.loadingElementDisplay = "none"
        this.imagenes = imagenes.data;
        this.galeryChoiceDistinguisher = tipo;
        this.modalService.open(content, { ariaLabelledBy: 'Elegir imagen' + tipo }).result.then((result) => {
        }, (reason) => {
        });
      })
    }

    guardarProducto(){
      if(this.imagenPrincipalObj.url == ""){
        swal("Error" , "Debe haber al menos una imagen principal" , "error")
        return;
      }


      this.loadingElementDisplay = "inline";

      if(this.nuevo){
        let imagenes = JSON.parse(JSON.stringify(this.imagenesSecundariasArray));
        imagenes.push(this.imagenPrincipalObj);
        let data ={
          producto : this.producto,
          imagenes : imagenes
        };
        this.productosServ.crearProducto(data, TOKEN).subscribe((respuesta)=>{
          console.log(respuesta);
          this.loadingElementDisplay = "none";
          if(respuesta.status == "success"){
            swal("Exito",  "Se creó el producto con éxito", "success");
            this.router.navigateByUrl("/productos");
          }else{
            let errores = respuesta.data;
            let keys = Object.keys(errores);
            swal("Error!", errores[keys[0]].toString() , "error");
          }
        })
      }else{
        if(this.imagenPrincipalObj.pivot == undefined){
          this.imagenPrincipalObj.pivot = new Object() as any ;
          this.imagenPrincipalObj.pivot.rol = this.imagenPrincipalObj.rol;
        }

        for(let i = 0; i < this.imagenesSecundariasArray.length; i ++){
          let imagenSecundaria = this.imagenesSecundariasArray[i];
          if(imagenSecundaria.pivot == undefined){
            imagenSecundaria.pivot = new Object() as any ;
            imagenSecundaria.pivot.rol = imagenSecundaria.rol;
          }
        }

        let imagenes = JSON.parse(JSON.stringify(this.imagenesSecundariasArray));
        imagenes.push(this.imagenPrincipalObj);
        let data ={
          producto : this.producto,
          imagenes : imagenes
        };

        this.productosServ.updateProducto(data, TOKEN).subscribe((respuesta)=>{
          console.log(respuesta);
          this.loadingElementDisplay = "none";
          if(respuesta.status == "success"){
            swal("Exito",  "Se modificó el producto con éxito", "success");
            this.router.navigateByUrl("/productos");
          }else{
            let errores = respuesta.data;
            let keys = Object.keys(errores);
            swal("Error!", errores[keys[0]].toString() , "error");
          }
        })
      }
    }

}
