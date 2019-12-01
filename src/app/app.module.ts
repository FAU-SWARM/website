import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// 3rd party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


import { AppRoutingModule } from './app-routing.module';
import * as Component from 'src/app/components';
import * as Service from 'src/app/services';

@NgModule({
  declarations: [
    Object.keys(Component).map((key) => { return Component[key] }),
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,

    // 3rd party
    NgbModule, NgSelectModule,
  ],
  providers: [
    Object.keys(Service).map((key) => { return Service[key] }),
  ],
  bootstrap: [Component.AppComponent]
})
export class AppModule { }
