import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {CreditCardPaymentComponent} from "./credit-card/credit-card-payment/credit-card-payment.component";

const routes: Routes = [
  {
    path: 'app-component',
    component: AppComponent
  },
  {
    path: 'creditcard-payment',
    component: CreditCardPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
