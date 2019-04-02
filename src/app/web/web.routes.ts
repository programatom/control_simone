import { Routes, RouterModule } from "@angular/router";
import { WebComponent } from './web.component';
import { PrincipalComponent } from './principal/principal.component';


const webRoutes:Routes = [
  {
    path:"web",
    component: WebComponent,
    children:[
      {path:"principal", component: PrincipalComponent},
      {path:"", redirectTo: "/web/principal", pathMatch:"full"},
    ]
  },
]

export const WEB_ROUTES = RouterModule.forChild( webRoutes );
