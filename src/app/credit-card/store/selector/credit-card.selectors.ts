import { createFeatureSelector, createSelector } from '@ngrx/store';
import {creditCardFeatureKey, ICreditCardState} from "../reducer/credit-card.reducer";

export const selectCreditCardState = createFeatureSelector<ICreditCardState>(
  creditCardFeatureKey,
);

export const selectCreditCard = createSelector(
  selectCreditCardState,
  (state: ICreditCardState) => state.creditCardData
);
