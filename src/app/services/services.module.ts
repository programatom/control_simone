import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosService, EntregasService, PedidosService, CuponesService, ProductosService, UsuariosService, CommonService, EmpresasService, MuestrasGratisService } from './services.index';

import { HttpClientModule } from '@angular/common/http';
import { ParticularesService } from './particulares/particulares.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    EmpleadosService,
    PedidosService,
    EntregasService,
    CuponesService,
    ProductosService,
    UsuariosService,
    ParticularesService,
    CommonService,
    EmpresasService,
    MuestrasGratisService
  ]
})
export class ServicesModule { }
