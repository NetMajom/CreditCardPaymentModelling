import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardPaymentComponent } from './credit-card-payment.component';
import { Store, StoreModule } from '@ngrx/store';

describe('CreditCardPaymentComponent', () => {
  let component: CreditCardPaymentComponent;
  let fixture: ComponentFixture<CreditCardPaymentComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ CreditCardPaymentComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardPaymentComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
