import { Component, OnInit } from '@angular/core';
import {Response} from "@angular/http";
import {AuthService} from "../auth.service";
import {Router, ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  password;
  passwordRepeat;
  resetToken;
  errorMessage;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resetToken = this.activatedRoute.snapshot.params['resetToken']
  }

  submitReset(form: NgForm){
    if (form.value.newPassword === form.value.newPasswordRepeat) {
      this.authService.resetForgottenPassword(form.value.newPassword, this.resetToken)
        .subscribe(
          (response: Response) => {
            const data = response.json();
            console.log(data);
            this.router.navigateByUrl('/login')
          },
          (error) => console.log(error)
        );
    } else {
      this.errorMessage = "Passwords do not match!"
    }
  }

}
