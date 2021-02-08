import { Action, createReducer, on } from '@ngrx/store';
import {CreditCard} from "../../../models/credit-card";
import {
  loadCreditCard,
  loadCreditCardSuccess,
  payingWithCreditCard, payingWithCreditCardError,
  payingWithCreditCardSuccess
} from "../action/credit-card.actions";

export const currentDate = new Date();
export const creditCardFeatureKey = 'creditCard';

export interface ICreditCardState {
  isLoading?: boolean;
  error?: any;
  creditCardData?: CreditCard;
}

export const initialCreditCardState: CreditCard =
  new CreditCard(
    '',
    '',
    currentDate,
    0,
    '');

export const initialState: ICreditCardState = {
  isLoading: false,
  error: null,
  creditCardData: initialCreditCardState
};


export const creditCardReducer = createReducer(
  initialState,
  on(loadCreditCard, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(loadCreditCardSuccess, (state: ICreditCardState, {creditCard}) => ({
    ...state,
    isLoading: false,
    error: null,
    creditCardData: creditCard
  })),
  on(payingWithCreditCard, (state: ICreditCardState, {creditCard}) => ({
    ...state,
    isLoading: false,
    error: null,
    creditCardData: creditCard
  })),
  on(payingWithCreditCardSuccess, (state: ICreditCardState, {creditCard}) => ({
    ...state,
    isLoading: false,
    error: null,
    creditCardData: creditCard
  })),
  on(payingWithCreditCardError, (state: ICreditCardState, {creditCard}) => ({
    ...state,
    isLoading: false,
    error: 'There was an error',
  })),
);

export function reducer(state: ICreditCardState | undefined, action: Action): any {
  return creditCardReducer(state, action);
}
