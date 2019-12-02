import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// 3rd party
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgJsonEditorModule } from 'ang-jsoneditor';


import { AppRoutingModule } from './app-routing.module';
import * as Service from 'src/app/services';

import { AppComponent }         from 'src/app/components/app/app.component';
import { HomeComponent }        from 'src/app/components/home/home.component';
import { DeviceComponent }      from 'src/app/components/device/device.component';
import { ProjectComponent }     from 'src/app/components/project/project.component';
import { DataComponent }        from 'src/app/components/data/data.component';
import { SettingsComponent }    from './components/home/settings/settings.component';
import { RawComponent }         from 'src/app/components/data/raw/raw.component';
import { IntelligentComponent } from 'src/app/components/data/intelligent/intelligent.component';
import { TableComponent }       from 'src/app/components/data/raw/table/table.component';
import { GraphComponent }       from 'src/app/components/data/raw/graph/graph.component';


import { UtilityFilterComponent } from 'src/app/components/utility/filter/filter.component';
import { UtilityGraphComponent } from 'src/app/components/utility/graph/graph.component';
import { UtilityTableComponent } from 'src/app/components/utility/table/table.component';




@NgModule({
  declarations: [
    // Object.keys(Component).map((key) => { return Component[key] }),
    AppComponent, HomeComponent, DeviceComponent,
    ProjectComponent, RawComponent, DataComponent, IntelligentComponent, TableComponent, GraphComponent,
    UtilityFilterComponent, UtilityGraphComponent, UtilityTableComponent, SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,

    // 3rd party
    NgbModule, NgSelectModule, NgJsonEditorModule,
  ],
  providers: [
    Object.keys(Service).map((key) => { return Service[key] }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
