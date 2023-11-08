import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view-components/home/home.component';
import { LoginComponent } from './view-components/presignin/login/login.component';
import { RegisterComponent } from './view-components/presignin/register/register.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ToastBarModule } from './components/toast-bar/toast-bar.module';
import { SingletonService } from './services/singleton.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    ToastBarModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    
  ],
  providers: [SingletonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
