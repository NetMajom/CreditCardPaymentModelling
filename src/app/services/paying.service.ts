import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {CreditCard} from "../models/credit-card";
import {selectCreditCard} from "../credit-card/store/selector/credit-card.selectors";
import {
  loadCreditCard,
  payingWithCreditCard, payingWithCreditCardError,
  payingWithCreditCardSuccess
} from "../credit-card/store/action/credit-card.actions";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class PayingService {
  public postId: any;
  public errorMessage: any;
  readonly creditCardData$: Observable<CreditCard | undefined>;

  constructor(private http: HttpClient, private store: Store, private toastrService: ToastrService) {
    this.creditCardData$ = this.store.pipe(select(selectCreditCard))
  }

  samplePOSTRequest(creditCardPayData: CreditCard): Subscription {
    const headers = { 'Authorization': 'Secret Token', 'Custom-Header': 'Some Credit Card example text' };
    return this.http.post<any>('https://jsonplaceholder.typicode.com/users', {title: 'POST Request'}, { headers }).subscribe({
      next: data => {
        this.postId = data.id;
        this.sendPayment(creditCardPayData);
        this.toastrService.success('Your payment successfully processed', 'Payment Processed');
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
        this.storeError(creditCardPayData);
        this.toastrService.error('There was an error during the processsing', 'Payment Error');
      }
    });
  }

  fakeSuccessResponse() {
    return new HttpResponse({
      status: 200,
      statusText: 'Credit Card payment successfully processed',
      body: 'Paying was successful'
    });
  }

  fakeErrorResponse() {
    return new HttpResponse({
      status: 402,
      statusText: 'Credit Card payment unsuccessful',
      body: 'There was an error during the payment process'
    });
  }

  getCCData(): void {
    this.store.dispatch(loadCreditCard());
  }

  sendPayment(creditCardPayData: CreditCard) {
    this.store.dispatch(payingWithCreditCard(creditCardPayData));
  }

  storeCreditCard(creditCardData: CreditCard) {
    this.store.dispatch(payingWithCreditCardSuccess(creditCardData))
  }

  storeError(creditCardData: CreditCard) {
    this.store.dispatch(payingWithCreditCardError(creditCardData));
  }
}
