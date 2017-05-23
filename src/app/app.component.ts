import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: any;
  firstName: any;


  constructor(){}

  ngOnInit() {
    // this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    // this.firstName = this.user.firstName;
    // console.log(this.firstName);
  }


}
