import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponent } from './web.component';
import { WEB_ROUTES } from './web.routes';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [
    WebComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    WEB_ROUTES
  ],
  exports:[
    PrincipalComponent,
    WebComponent
  ]
})

export class WebModule { }
