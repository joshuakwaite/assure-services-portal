import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  userInfo = {};

  constructor(private http: Http, private router: Router) {
  }

  setToken = function (token: any) {
    sessionStorage.setItem('userToken', token)
  };

  getToken = function () {
    return sessionStorage.getItem('userToken')
  };

  removeToken = function () {
    sessionStorage.removeItem('userToken');
  };


  login = function (user: any) {
    return this.http.post('auth/login', user)
      .subscribe(
        (response: Response) => {
          const data = response.json();
          this.setToken(data.token);
          console.log(data);
          this.userInfo = data.user;
          this.router.navigateByUrl('my-account');
          return data
        },
        (error) => console.log(error)
      );
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


