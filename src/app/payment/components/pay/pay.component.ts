import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {defaultResponse, preparePhoneModel} from '../../model/payment.model';
import {PaymentService} from '../../services/payment.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(
    private paymentService: PaymentService
  ) { }

  paymentSuccess = false;
  paymentSuccessMsg;
  paymentError = false;
  paymentErrorMsg;
  othersError = false;
  othersErrorMsg;

  platformStatus = false;
  platformName: preparePhoneModel;
  platformMessage;
  error = this.platformStatus;

  customerPayForm: FormGroup = new FormGroup({
    checkoutName: new FormControl('Deogratias Alison', Validators.required),
    phoneNumber: new FormControl('0744004897',
      [Validators.required, Validators.minLength(10),
        Validators.maxLength(10)
      ]),
    securityCode: new FormControl('2607', [Validators.required,
      Validators.minLength(4), Validators.maxLength(4)]),
  });

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  findPlatformNumber() {
    const phoneNumber = this.customerPayForm.value.phoneNumber;

    this.paymentService.validatePhoneNumber(phoneNumber).subscribe((response: defaultResponse) => {
      if (response.success){
        this.platformStatus = response.success;
        this.error = !this.platformStatus;
        this.platformName   = response.object;
      }else{
        this.platformStatus = response.success;
        this.error = !this.platformStatus;
        this.platformMessage = response.object;
      }
    });
  }

  // tslint:disable-next-line: typedef
  customerPay(platform: preparePhoneModel) {
    if (this.customerPayForm.valid){
      const amount = 28000;
      const chargeData = {
        oder_details: { _id: 8, total_item: 100, amount },
        user: {
          phone: this.customerPayForm.value.phoneNumber,
          password: this.customerPayForm.value.securityCode,
          fullName: this.customerPayForm.value.checkoutName
        },
        others: {
          platformCode: platform.code, platformName: platform.name, platformID: platform.ID
        }
      };

      if (platform.phoneNo === chargeData.user.phone){
        this.paymentService.initiatePayment(chargeData).subscribe((response) => {
          if (response.success){
            this.paymentSuccess    = response.success;
            this.paymentSuccessMsg = response.object;

            this.customerPayForm.reset();
          }else {
            if (response.status === 503) {
              this.othersError = !response.success;
              this.othersErrorMsg = response.object;
            }else {
              this.paymentError     = !response.success;
              this.paymentErrorMsg  = response.object;
            }
          }
        });
      } else {
        this.paymentError     = true;
        this.paymentErrorMsg  = 'something went wrong in your phone number';
      }
    }else {
      this.paymentErrorMsg  = 'something went wrong in your phone number';
      console.log(this.paymentErrorMsg);
    }
  }

}
