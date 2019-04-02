import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { APP_ROUTES } from './app.routes';

import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { WebModule } from './web/web.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    SharedModule,
    NgbModalModule,
    WebModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
