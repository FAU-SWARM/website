import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { TestComponent } from 'src/app/components/test/test.component';


const routes: Routes = [
  {
    component: HomeComponent, path: '',
    data: { breadcrumb: 'Home', description: 'Welcome home. :)' },
  },
  {
    component: TestComponent, path: 'test',
    data: { breadcrumb: 'Test', description: 'Just mucking around!' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
