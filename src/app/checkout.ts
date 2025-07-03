import { Injectable, inject } from '@angular/core';
import { ChartOperations } from './chart-operations';

@Injectable({
  providedIn: 'root'
})
export class Checkout {
  chartOperator: ChartOperations = inject(ChartOperations);

  constructor() { }

  pay(firstName: string, lastName: string, cardNumber: string) {
    if (firstName != '' && lastName != '' && cardNumber != '' && this.chartOperator.numberOfProducts > 0) {
      console.log(firstName + " " + lastName + " paid the " + this.chartOperator.chartTotal +
        "$ purchase by the card with number " + cardNumber);
      alert("Thanks for payment! ");

      this.chartOperator.removeAllProducts();
    }else if (this.chartOperator.numberOfProducts <= 0){
      alert("Chart is empty! ");
    } else {
      alert("Fill the missing points and try again! ");
    }
  }
}