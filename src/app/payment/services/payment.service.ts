import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {defaultResponse} from '../model/payment.model';
import {HttpClient} from '@angular/common/http';
import {initiatePaymentUrl, preparePhoneIdUrl} from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }


  // check/:phoneID
  validatePhoneNumber(phoneID: number): Observable<defaultResponse> {
    return this.http.get<defaultResponse>(`${preparePhoneIdUrl}` + phoneID);
  }

  initiatePayment(chargeData): Observable<defaultResponse> {
    return this.http.post<defaultResponse>(`${initiatePaymentUrl}`, {chargeData});
  }

}
