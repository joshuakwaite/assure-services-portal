"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_service_1 = require("../auth.service");
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.authService.isAuthenticated()) {
            this.router.navigateByUrl('dashboard');
        }
    };
    LoginComponent.prototype.onLogin = function (form) {
        var _this = this;
        this.errorMessage = undefined;
        this.authService.login(form.value)
            .subscribe(function (response) {
            var data = response.json();
            _this.authService.setToken(data.token);
            sessionStorage.setItem('userInfo', JSON.stringify(data.user));
            _this.router.navigateByUrl('my-account');
        }, function (error) { return _this.errorMessage = error._body; });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css'],
        providers: [auth_service_1.AuthService]
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
