"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AuthService = (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
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
        this.setToken = function (token) {
            sessionStorage.setItem('userToken', token);
        };
        this.getToken = function () {
            return sessionStorage.getItem('userToken');
        };
        this.removeToken = function () {
            sessionStorage.removeItem('userToken');
            sessionStorage.removeItem('userInfo');
        };
        this.login = function (user) {
            return this.http.post('auth/login', user);
        };
        this.logout = function () {
            this.removeToken();
            this.router.navigateByUrl('/login');
        };
        this.isAuthenticated = function () {
            return !!this.getToken();
        };
        this.signup = function (user) {
            return this.http.post('/auth/signup', user);
        };
    }
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
var UserInfo = (function () {
    function UserInfo() {
    }
    return UserInfo;
}());
exports.UserInfo = UserInfo;
