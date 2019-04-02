import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { FormsModule } from '@angular/forms';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { ParticularFormComponent } from './particular-form/particular-form.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { EmpleadoFormComponent } from './empleado-form/empleado-form.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    PedidoFormComponent,
    UsuarioFormComponent,
    ParticularFormComponent,
    EmpresaFormComponent,
    EmpleadoFormComponent,
    ProductoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    PedidoFormComponent,
    UsuarioFormComponent,
    ParticularFormComponent,
    EmpresaFormComponent,
    EmpleadoFormComponent,
    ProductoFormComponent
  ]
})
export class SharedModule { }
