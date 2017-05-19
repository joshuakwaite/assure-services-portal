import { Component, OnInit } from '@angular/core';

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



  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));

    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
  }


}

