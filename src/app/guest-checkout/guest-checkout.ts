import { Component, inject } from '@angular/core';
import { Checkout } from '../checkout';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-guest-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './guest-checkout.html',
  styleUrl: './guest-checkout.css'
})
export class GuestCheckout {
  checkout: Checkout = inject(Checkout);
  paymentForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    cardNumber: new FormControl('')
  })

  pay(){
    this.checkout.pay(
      this.paymentForm.value.firstName ?? '',
      this.paymentForm.value.lastName ?? '',
      this.paymentForm.value.cardNumber ?? ''
    );
  }
}
