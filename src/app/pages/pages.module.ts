import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms"

import { EmpleadosComponent } from './empleados/empleados.component';
import { CuponesComponent } from './cupones/cupones.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntregasComponent } from './entregas/entregas.component';

import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { SharedModule } from '../shared/shared.module';
import { ServicesModule } from '../services/services.module';
import { PedidoComponent } from './pedidos/pedido/pedido.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto/producto.component';
import { FechaPipe } from '../pipes/fecha.pipe';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    EmpleadosComponent,
    CuponesComponent,
    DashboardComponent,
    EntregasComponent,
    PagesComponent,
    PedidosComponent,
    PedidoComponent,
    UsuariosComponent,
    UsuarioComponent,
    ProductosComponent,
    ProductoComponent
    ],
  exports:[
    EmpleadosComponent,
    CuponesComponent,
    DashboardComponent,
    EntregasComponent,
    PagesComponent,
    PedidosComponent,
    UsuariosComponent,
    UsuarioComponent,
    ProductosComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    FormsModule,
    SharedModule,
    ServicesModule,
    PipesModule
  ],
  providers:[
    FechaPipe
  ]
})
export class PagesModule { }
