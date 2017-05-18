import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
  providers: [AuthService]
})
export class MyAccountComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
