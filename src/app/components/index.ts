
import { AppComponent } from 'src/app/components/app/app.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { RawDataComponent } from 'src/app/components/raw-data/raw-data.component';
import { DeviceComponent } from 'src/app/components/device/device.component';
import { ProjectComponent } from 'src/app/components/project/project.component';
import { RawComponent } from 'src/app/components/data/raw/raw.component';
import { DataComponent } from 'src/app/components/data/data.component';
import { IntelligentComponent } from 'src/app/components/data/intelligent/intelligent.component';
import { TableComponent } from 'src/app/components/data/raw/table/table.component';
import { GraphComponent } from 'src/app/components/data/raw/graph/graph.component';
import { OldComponent } from 'src/app/components/home/old/old.component';


import { TestComponent } from 'src/app/components/test/test.component';
import { HomeComponent as TestHomeComponent } from 'src/app/components/test/home/home.component';


import { UtilityFilterComponent } from 'src/app/components/utility/filter/filter.component';
import { UtilityGraphComponent } from 'src/app/components/utility/graph/graph.component';
import { UtilityTableComponent } from 'src/app/components/utility/table/table.component';


export {
    AppComponent,
    HomeComponent,
    // /level-1
    ProjectComponent,
    DeviceComponent,
    // /level-2
    DataComponent,
    // /level-3
    RawComponent,
    IntelligentComponent,
    // /level-4
    TableComponent,
    GraphComponent,

    // random or display types
    RawDataComponent,
    OldComponent,

    // /test
    TestHomeComponent,
    TestComponent,

    // utility
    UtilityFilterComponent, UtilityGraphComponent, UtilityTableComponent,
};