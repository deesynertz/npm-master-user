import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DefaultResponse, PreparePhoneModel} from '../../model/payment.model';
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
  platformName: PreparePhoneModel;
  platformMessage;
  error = this.platformStatus;

  customerPayForm: FormGroup = new FormGroup({
    checkoutName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('',
      [Validators.required, Validators.minLength(10),
        Validators.maxLength(10)
      ]),
    securityCode: new FormControl('', [Validators.required,
      Validators.minLength(4), Validators.maxLength(4)]),
  });

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  findPlatformNumber() {
    const phoneNumber = this.customerPayForm.value.phoneNumber;

    this.paymentService.validatePhoneNumber(phoneNumber).subscribe((response: DefaultResponse) => {
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
  customerPay(platform: PreparePhoneModel) {
    if (this.customerPayForm.valid){
      const amount = 6789;
      const chargeData = {
        oder_details: { _id: 6, total_item: 100, amount },
        user: {
          phone: this.customerPayForm.value.phoneNumber,
          password: this.customerPayForm.value.securityCode,
          fullName: this.customerPayForm.value.checkoutName
        },
        others: {
          platformCode: platform.code, platformName: platform.name, platformID: platform.ID
        }
      };

      // console.log(chargeData);

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
