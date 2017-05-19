import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Response} from "@angular/http";
import {UserInfoService} from "../user-info.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private userInfoService: UserInfoService) { }

  errorMessage: string;

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.router.navigateByUrl('dashboard');
    }
  }

  onLogin(form: NgForm) {

    this.errorMessage = undefined;

    this.authService.login(form.value)
      .subscribe(
        (response: Response) => {
          const data = response.json();
          this.authService.setToken(data.token);
          // this.userInfoService.change(data.user);
          sessionStorage.setItem('userInfo', JSON.stringify(data.user));
          this.router.navigateByUrl('*/path');
        },
        (error) => this.errorMessage = error._body
      );


  }


}
