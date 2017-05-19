import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {


  constructor(private http: Http, private router: Router) {
  }



  // getUserInfo = function () {
  //   console.log(this.userInfo);
  //   return this.userInfo;
  // };

  // setUserData = function (info) {
  //   // console.log(info);
  //   // this.userInfo.firstName = info.firstName;
  //   // this.userInfo.lastName = info.lastName;
  //   // this.userInfo.email = info.email;
  //   // console.log(this.userInfo)
  // };

  setToken = function (token: any) {
    sessionStorage.setItem('userToken', token)
  };

  getToken = function () {
    return sessionStorage.getItem('userToken')
  };

  removeToken = function () {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userInfo');
  };


  login = function (user: any) {
    return this.http.post('auth/login', user)

  };

  logout = function () {
    this.removeToken();
    this.router.navigateByUrl('/login')
  };

  isAuthenticated = function () {
    return !!this.getToken();
  };

  signup = function (user: any) {
    return this.http.post('/auth/signup', user)
  };




}

 export class UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}
