import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EntregasComponent } from './entregas/entregas.component';
import { CuponesComponent } from './cupones/cupones.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './pedidos/pedido/pedido.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoComponent } from './productos/producto/producto.component';



const pagesRoutes:Routes = [
  {
    path:"",
    component: PagesComponent,
    children:[
      {path:"dashboard", component: DashboardComponent, data:{ titulo: "Dashboard"}},
      {path:"empleados", component: EmpleadosComponent, data:{ titulo: "Empleados"}},
      {path:"entregas", component: EntregasComponent, data:{ titulo: "Entregas"}},
      {path:"cupones", component: CuponesComponent, data:{ titulo: "Cupones"}},
      {path:"usuarios", component: UsuariosComponent, data:{ titulo: "Usuarios"}},
      {path:"usuario/:id", component: UsuarioComponent, data:{ titulo: "Usuario"}},
      {path:"pedidos", component: PedidosComponent, data:{ titulo: "Pedidos"}},
      {path:"pedido/:id", component: PedidoComponent, data:{ titulo: "Pedido"}},
      {path:"productos", component: ProductosComponent, data:{ titulo: "Productos"}},
      {path:"producto/:id", component: ProductoComponent, data:{ titulo: "Producto"}},

      {path:"", redirectTo: "/dashboard", pathMatch:"full"},
    ]
  },
]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
