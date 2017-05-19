import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()



export class CalculateService {




  constructor(private http: Http) {}
  putStateRequest(stateData: any) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', '243Cs5Z3zu37hS3cghZFH3AepF7oS7zx1H6lcZo6');

    return this.http.put('https://005e8n6dy3.execute-api.us-west-2.amazonaws.com/testing/blue-skies-calculation', stateData, {headers: headers});
  }

}
