import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-new-deal',
  templateUrl: './new-deal.component.html',
  styleUrls: ['./new-deal.component.css']
})
export class NewDealComponent implements OnInit {
  user: any;
  sfId: string;
  onLoadIframe = false;


  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    this.sfId = this.user.salesforceId;

    setTimeout(()=> {
      this.onLoadIframe = true;
    },2000)
  }



}
