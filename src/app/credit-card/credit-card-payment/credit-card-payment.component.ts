import {AfterViewChecked, Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PayingService} from "../../services/paying.service";
import {currentDate} from "../store/reducer/credit-card.reducer";
import {CreditCard} from "../../models/credit-card";

@Component({
  selector: 'app-credit-card-payment',
  templateUrl: './credit-card-payment.component.html',
  styleUrls: ['./credit-card-payment.component.scss']
})
export class CreditCardPaymentComponent implements OnInit, AfterViewChecked {
  public payForm: FormGroup;
  public currMonth = currentDate.getMonth();
  public currYear = currentDate.getFullYear();

  constructor(
    private store: Store,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private payingService: PayingService) {
    this.payForm = this.setupForm();
  }


  ngOnInit(): void {

  }

  setupForm(): FormGroup {
    return this.formBuilder.group({
      amount: ['',
        [
          Validators.required,
          Validators.pattern(/(\d{1,4}((\,|\.|\s)(\d00)){1,2}|(\d{3,7}))/)
        ]
      ],
      cardHolderName: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(21),
          Validators.pattern(/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/)
        ]
      ],
      creditCardNumber: ['',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(19),
          this.removeSpaces
        ]
      ],
      expirationMonth: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
        Validators.min(this.currMonth),
        Validators.max(12)]],
      expirationYear: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2),
        Validators.min(parseInt(this.currYear.toString().slice(-2))),
        Validators.max(99)]
      ],
      securityCode: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.min(111), Validators.max(999)]
      ]
    });
  }

  ngAfterViewChecked() {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/credit-card-payment.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  removeSpaces(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
    }
    return null;
  }

  isFieldValid(fieldName: string): boolean | undefined {
    return !this.payForm?.get(fieldName)?.valid && (this.payForm?.get(fieldName)?.dirty || this.payForm?.get(fieldName)?.touched);
  }

  submitPayForm() {
    if (this.payForm?.valid) {
      const payFormData = new CreditCard(
        this.payForm.get('creditCardNumber')?.value,
        this.payForm.get('cardHolderName')?.value,
        new Date(parseInt(this.currYear.toString().slice(0, 2) + this.payForm.get('expirationYear')?.value), this.payForm.get('expirationMonth')?.value),
        this.payForm.get('amount')?.value,
        this.payForm.get('securityCode')?.value);
      //Simulate the sending to server
      this.payingService.samplePOSTRequest(payFormData);
    }
  }
}
