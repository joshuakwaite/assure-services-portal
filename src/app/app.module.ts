import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { NewDealComponent } from './new-deal/new-deal.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AuthService } from './auth.service';
import { httpFactory } from './http.factory';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'new-deal', component: NewDealComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '*/path', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    DocumentsComponent,
    NewDealComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    MyAccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthService, {
    provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions]}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
