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

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resetToken = this.activatedRoute.snapshot.params['resetToken']
  }

  submitReset(form: NgForm){
    if (form.value.newPassword === form.value.newPasswordRepeat) {
      console.log("working up to this point!", form.value.newPassword, this.resetToken);
      this.authService.resetForgottenPassword(form.value.newPassword, this.resetToken)
        .subscribe(
          (response: Response) => {
            const data = response.json();
            console.log(data);
            this.router.navigateByUrl('/login')
          },
          (error) => console.log(error)
        );
    }
  }

}
