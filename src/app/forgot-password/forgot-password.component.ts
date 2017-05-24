import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetSuccessful = false;


  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  passwordReset(form: NgForm) {
    console.log(form.value);
    this.authService.forgotPassword(form.value.email)
      .subscribe(
        (response: Response) => {
          const data = response.json();
          console.log(data);
          this.resetSuccessful = true;
        },
        (error) => console.log(error)
      )

  }

}
