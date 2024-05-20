import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager/manager.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportComponent } from './report/report.component';
import { AuthComponent } from './auth-component/auth-component';

const routes: Routes = [];

  const appRoutes: Routes = [
    {path: '', component: AuthComponent},
    {path: 'about', component: AboutComponent},
    {path: 'app', component:ManagerComponent},
    {path: 'report', component:ReportComponent},
    { path: 'auth', component: AuthComponent},
    {path: 'not-found', component: NotFoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })

export class AppRoutingModule {


 }
