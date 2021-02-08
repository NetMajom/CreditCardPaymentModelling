import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {CreditCardPaymentComponent} from "./credit-card-payment/credit-card-payment.component";
import {creditCardFeatureKey, reducer} from "./store/reducer/credit-card.reducer";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';


@NgModule({
  declarations: [CreditCardPaymentComponent, FieldErrorDisplayComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(creditCardFeatureKey, reducer),
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    CreditCardPaymentComponent
  ]
})
export class CreditCardModule {
}
