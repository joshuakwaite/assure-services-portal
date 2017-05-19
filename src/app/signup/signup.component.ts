import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Response} from "@angular/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {

  passwordMessage;
  passwordRepeat;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    this.passwordMessage = undefined;

    if (form.value.password !== this.passwordRepeat) {
      this.passwordMessage = "Passwords do not match!"
    } else {
      this.authService.signup(form.value)
        .subscribe(
          (response: Response) => {
            // const data = response.json();
            this.router.navigateByUrl('/login');
          },
          (error) => {
            this.errorMessage = error._body;
            console.log(error)
          }
        );
    }
  }


}
