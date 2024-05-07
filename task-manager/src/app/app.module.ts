import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ManagerComponent } from './manager/manager.component';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HoverDirective } from './hover.directive';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ManagerComponent,
    HoverDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgScrollbarModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }