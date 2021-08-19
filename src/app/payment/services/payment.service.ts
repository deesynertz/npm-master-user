import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../model/payment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { initiatePaymentUrl, preparePhoneIdUrl } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  private publicKey = 'sk_tee0243vk8x405a1dv23n18kk5h3ha_1';

  // tslint:disable-next-line: typedef
  createAutorizationHeader(headers: HttpHeaders){
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', this.publicKey);
  }

  // check/:phoneID
  validatePhoneNumber(phoneID: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`${preparePhoneIdUrl}` + phoneID);
  }

  initiatePayment(chargeData): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json',
      'x-api-key': this.publicKey });
    this.createAutorizationHeader(header);
    return this.http.post(`${initiatePaymentUrl}`, { chargeData }, {headers: header});
  }
}
