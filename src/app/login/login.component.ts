import {Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Response} from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  errorMessage: string;

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.router.navigateByUrl('blue-skies');
    }
  }

  onLogin(form: NgForm) {

    this.errorMessage = undefined;

    this.authService.login(form.value)
      .subscribe(
        (response: Response) => {
          const data = response.json();
          this.authService.setToken(data.token);
          sessionStorage.setItem('userInfo', JSON.stringify(data.user));
          this.router.navigateByUrl('blue-skies');
        },
        (error) => this.errorMessage = error._body
      );


  }


  testFunction(event) {
    console.log(event)
  }

  ngOnChanges () {

  }

  }
