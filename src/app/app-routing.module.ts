import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as Component from 'src/app/components';

const routes: Routes = [
  // testing
  {
    component: Component.TestHomeComponent, path: 'test/home',
    data: { breadcrumb: 'Home', description: 'Just mucking around!' },
  },
  {
    component: Component.TestComponent, path: 'test/data',
    data: { breadcrumb: 'Test', description: 'Just mucking around!' },
  },

  // real
  {
    component: Component.HomeComponent, path: '',
    data: { breadcrumb: 'Test', description: 'Just mucking around!' },
  },
  {
    component: Component.ProjectComponent, path: 'project',
    data: { breadcrumb: 'Project', description: 'View projects.' },
  },
  {
    component: Component.DeviceComponent, path: 'device',
    data: { breadcrumb: 'Device', description: 'View devices.' },
  },
  {
    component: Component.DataComponent, path: 'data',
    data: { breadcrumb: 'Data', description: 'Browse options for viewing data.' },
  },
  {
    component: Component.RawComponent, path: 'data/raw',
    data: { breadcrumb: 'Raw', description: 'Raw options for viewing data.' },
  },
  {
    component: Component.IntelligentComponent, path: 'data/intelligent',
    data: { breadcrumb: 'Intelligent', description: 'Intelligent / predictive options for viewing data.' },
  },
  {
    component: Component.GraphComponent, path: 'data/raw/graph',
    data: { breadcrumb: 'Graph', description: 'Graph options for viewing data.' },
  },
  {
    component: Component.TableComponent, path: 'data/raw/table',
    data: { breadcrumb: 'Table', description: 'Tabular options for viewing data.' },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
