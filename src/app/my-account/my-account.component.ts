import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../auth.service";
import {NgForm} from "@angular/forms";
import {Response} from "@angular/http";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
  providers: []
})
export class AccountComponent implements OnInit {
  user: any;
  firstName: string;
  lastName: string;
  email: string;
  sfId: string;
  onPictureError = false;
  passwordMessage;


  constructor(public sanitizer: DomSanitizer, private authService: AuthService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));

    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
    this.sfId = this.user.salesforceId;
  }

  picError() {
    this.onPictureError = true;
  }

  onChange(form: NgForm) {

    this.passwordMessage = undefined;

    if (form.value.newPassword === form.value.newPasswordRepeat) {
      this.authService.changePassword(form.value)
        .subscribe(
          (response: Response) => {
            const data = response.json();
            console.log(data);
            this.passwordMessage = "Password was changed successfully!"
          },
          (error) => this.passwordMessage = "Problem with the server, please contact Assure Services!"
        );
    } else {
      this.passwordMessage = "The passwords did not match!"
    }
  }

}

