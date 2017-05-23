import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../auth.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {
  userTwo: any;
  sfId: string;
  onPictureError = false;

  @Input('firstName') first: any;



  constructor(private authService: AuthService, public sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    // this.userTwo = JSON.parse(sessionStorage.getItem('userInfo'));
    // this.sfId = this.userTwo.salesforceId;
  }

  logout() {
    this.authService.logout();
  }

  function(event) {
    console.log(event)
  }

  picError() {
    this.onPictureError = true;
  }
}
