import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {DomSanitizer} from "@angular/platform-browser";
// import {Subject} from "rxjs";
import {UserInfoService, Info} from "../user-info.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService, UserInfoService]
})
export class NavbarComponent implements OnInit {
  user: any;
  sfId: string;
  onPictureError = false;
  // _subscription;

  // info: Info;


  // sfIdChange: Subject<string> = new Subject<string>();

  constructor(private authService: AuthService, public sanitizer: DomSanitizer, private userInfoService: UserInfoService) {
    // this.sfId = ""
    // this.user = userInfoService.userInfo;
    // this._subscription = userInfoService.changeUser(JSON.parse(sessionStorage.getItem('userInfo')))
    //   .subscribe(
    //     (value) => {
    //   this.user = value
    // },
    //     (error) => console.log(error)
    //   )
    // this.info = this.userInfoService.info;
    // this.user = this.userInfoService.info.userInfo;
    // this.sfId = this.userInfoService.info.userInfo.salesforceId;
    //
    // console.log(this.info)
  }

  // getObject() {
  //   console.log(this.userInfoService.info)
  // }

  // ngAfterViewChecked() {
    // this.info = this.userInfoService.info;
    // this.user = this.userInfoService.info.userInfo;
    // this.sfId = this.userInfoService.info.userInfo.salesforceId;
  // }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    this.sfId = this.user.salesforceId;
    // this.sfIdChange.next(this.sfId);
  }

  // ngOnDestroy() {
  //   this._subscription.unsubscribe();
  // }

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
