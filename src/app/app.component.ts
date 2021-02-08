import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {CreditCard} from "./models/credit-card";
import {PayingService} from "./services/paying.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Credit Card Payment Modelling';
  public position = { X: 'Right' };
  public creditCard$: Observable<CreditCard | undefined>;

  constructor(private payingService: PayingService) {
    this.creditCard$ = payingService.creditCardData$;
  }
}
