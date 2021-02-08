import * as fromCreditCard from './credit-card.actions';

describe('loadCreditCards', () => {
  it('should return an action', () => {
    expect(fromCreditCard.loadCreditCards().type).toBe('[CreditCard] Load CreditCards');
  });
});
