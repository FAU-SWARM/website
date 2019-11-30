import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { TestComponent } from 'src/app/components/test/test.component';
import { RawDataComponent } from 'src/app/components/raw-data/raw-data.component';


const routes: Routes = [
  {
    component: HomeComponent, path: '',
    data: { breadcrumb: 'Home', description: 'Just mucking around!' },
  },
  {
    component: TestComponent, path: 'test',
    data: { breadcrumb: 'Test', description: 'Just mucking around!' },
  },
  {
    component: RawDataComponent, path: 'raw',
    data: { breadcrumb: 'Raw', description: 'Graph stuff.' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
