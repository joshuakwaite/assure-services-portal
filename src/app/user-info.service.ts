import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

export interface Info {
  userInfo: any;
}

@Injectable()
export class UserInfoService {
info: Info = { userInfo : {} };
change(input) {
  this.info.userInfo = input;
  console.log(this.info)
}
}
// userChange: Subject<string> = new Subject<string>();
//   constructor() {
//     this.userInfo = ""
//   }
//
//   changeUser(user) {
//     this.userInfo = user;
//     this.userChange.next(this.userInfo);
//   }
//
// }
