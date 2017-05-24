import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { Ng2OrderModule } from 'ng2-order-pipe';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { NewDealComponent } from './new-deal/new-deal.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccountComponent } from './my-account/my-account.component';
import { AuthService } from './auth.service';
import { httpFactory } from './http.factory';
import { AuthGuard } from "./auth-guard.service";
import { BlueSkiesCalculatorComponent } from './blue-skies-calculator/blue-skies-calculator.component';
import { CalculateService } from "./blue-skies-http.service";
import { UserInfoService } from "./user-info.service";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetComponent } from './reset/reset.component'


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard]  },
  { path: 'new-deal', component: NewDealComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'blue-skies', component: BlueSkiesCalculatorComponent, canActivate: [AuthGuard] },
  { path: 'my-account', component: AccountComponent, canActivate: [AuthGuard]  },
  { path: 'forgot-password', component: ForgotPasswordComponent  },
  { path: 'reset/:resetToken', component: ResetComponent  },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '*/path', redirectTo: '/login', pathMatch: 'full' }
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
    AccountComponent,
    BlueSkiesCalculatorComponent,
    ForgotPasswordComponent,
    ResetComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2OrderModule
  ],
  providers: [AuthService, {
    provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions]},
    AuthGuard,
    CalculateService,
    UserInfoService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
