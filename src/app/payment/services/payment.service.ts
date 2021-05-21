import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultResponse } from '../model/payment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { initiatePaymentUrl, preparePhoneIdUrl } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  public token = 'pk_qe47h0nra6lbfzrth641ndsztmm9hh_1';

  // tslint:disable-next-line: typedef
  createAutorizationHeader(headers: HttpHeaders){
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', this.token);
  }

  // check/:phoneID
  validatePhoneNumber(phoneID: number): Observable<defaultResponse> {
    return this.http.get<defaultResponse>(`${preparePhoneIdUrl}` + phoneID);
  }

  initiatePayment(chargeData): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json',
      'x-api-key': this.token });
    this.createAutorizationHeader(header);
    return this.http.post(`${initiatePaymentUrl}`, { chargeData }, {headers: header});
  }
}
