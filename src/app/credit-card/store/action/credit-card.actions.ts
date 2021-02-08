import { createAction, props } from '@ngrx/store';
import {CreditCard} from "../../../models/credit-card";

export const loadCreditCard = createAction(
  '[ICreditCardState] Load CreditCard'
);


export const loadCreditCardSuccess = createAction(
  '[CreditCard] Load Credit Card Success',
  (creditCard: CreditCard) => ({creditCard})
);

export const payingWithCreditCard = createAction(
  '[CreditCard] Paying with Credit Card',
  (creditCard: CreditCard) => ({creditCard})
)

export const payingWithCreditCardSuccess = createAction(
  '[CreditCard] Paying Success',
  (creditCard: CreditCard) => ({creditCard})
);

export const payingWithCreditCardError = createAction(
  '[CreditCard] Paying Error',
  (creditCard: CreditCard) => ({creditCard})
);
