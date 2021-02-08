export class CreditCard {
  private _creditcardNumber: string;
  private _cardHolder: string;
  private _expirationDate: Date;
  private _securityCode: string | undefined;
  private _amount: number;


  constructor(creditcardNumber: string, cardHolder: string, expirationDate: Date, amount: number, securityCode?: string) {
    this._creditcardNumber = creditcardNumber;
    this._cardHolder = cardHolder;
    this._expirationDate = expirationDate;
    this._amount = amount;
    this._securityCode = securityCode;
  }

  get creditcardNumber(): string {
    return this._creditcardNumber;
  }


  set creditcardNumber(value: string) {
    if (value && value.trim().length >= 13 && value.trim().length <= 19) {
      this._creditcardNumber = value;
    } else {
      throw new Error('Please set a valid value for the credit card numnber');
    }
  }

  get cardHolder(): string {
    return this._cardHolder;
  }

  set cardHolder(value: string) {
    if (value && value.trim().length >= 4 && value.trim().length <= 21) {
      this._cardHolder = value;
    } else {
      throw new Error('Please set a valid value for the card holer name.');
    }
  }

  get expirationDate(): Date {
    return this._expirationDate;
  }

  set expirationDate(value: Date) {
    if (value.getDate() > Date.now()) {
      this._expirationDate = value;
    } else {
      throw new Error('The expiration date must be greater than today');
    }
  }

  get securityCode(): string | undefined {
    return this._securityCode;
  }

  set securityCode(value: string | undefined) {
    this._securityCode = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    if (value > 0) {
      this._amount = value;
    } else {
      throw new Error('The amount must be a positive number and must be greater than 0')
    }
  }
}
