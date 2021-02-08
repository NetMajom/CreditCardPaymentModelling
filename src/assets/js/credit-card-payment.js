(function () {

  // Const variables
  const CURRENT_YEAR = new Date().getFullYear().toString().slice(2);
  const NAME_VALIDATION_REG = /(\w)*/;


  //Container elements
  let cardHolder = document.getElementById('card_wrapper');


  // Display elements
  let cardNumberDisp = document.getElementById('card_number');
  let cardMonthDisp = document.getElementById('card_month');
  let cardYearDisp = document.getElementById('card_year');
  let cardNameDisp = document.getElementById('card_name');
  // let cardBINDisp = document.getElementById('card_bin');
  let cardCVSDisp = document.getElementById('card_cvs');


  // Input fields
  let cardNumberField = document.getElementById('card_number_field');
  let cardMonthField = document.getElementById('card_month_field');
  let cardYearField = document.getElementById('card_year_field');
  let cardNameField = document.getElementById('card_name_field');
  // let cardBINField = document.getElementById('card_bin_field');
  let cardCVSField = document.getElementById('card_cvs_field');


  // Register events
  cardNumberField.addEventListener('input', cardNumberInputHandler);
  cardMonthField.addEventListener('input', cardMonthInputHandler);
  cardYearField.addEventListener('input', cardYearInputHandler);
  // cardBINField.addEventListener('input', cardBINInputHandler);
  cardNameField.addEventListener('input', cardNameInputHandler);
  cardCVSField.addEventListener('input', cardCVSInputHandler);

  cardCVSField.addEventListener('focusin', cardCVSFocusInHandler);
  cardCVSField.addEventListener('focusout', cardCVSFocusOuHandler);


  // Event Handlers
  function cardNumberInputHandler(event) {

    let fieldInput = event.target.value;
    let keyPressed = event.data;
    let isInteger = integerCheck(keyPressed);
    let filterOutput = integerFilter(fieldInput);
    let spaceRm = removeSpaces(filterOutput);
    let paddedInput = padInput(spaceRm);

    if (isInteger) {
      updateCardNumberDisplay(cardNumberDisp, stringClamper(paddedInput, 32));
      // changeFocusOnComplete(cardBINField, stringClamper(paddedInput, 18), 18);
    } else {
      updateCardNumberDisplay(cardNumberDisp, stringClamper(filterOutput, 32), '0000 0000 0000');
    }
    paddedInput = spaceRm
    event.target.value = stringClamper(paddedInput, 32);
  }

  function cardMonthInputHandler(event) {
    let fieldInput = event.target.value;
    let filterOutput = integerFilter(fieldInput);
    let spaceRm = removeSpaces(filterOutput);
    let clampedInput = stringClamper(spaceRm, 2);
    let validMonth = monthValidator(clampedInput);

    if (validMonth) {
      changeFocusOnComplete(cardYearField, clampedInput, 2);
      updateCardNumberDisplay(cardMonthDisp, clampedInput);
      event.target.value = stringClamper(clampedInput, 2);
      return;
    }

    if (clampedInput.length === 2) {
      event.target.value = '';
      updateCardNumberDisplay(cardMonthDisp, '', 'mm');
      return;
    }

    updateCardNumberDisplay(cardMonthDisp, clampedInput, 'mm');
    event.target.value = stringClamper(clampedInput, 2);
  }

  function cardYearInputHandler(event) {
    let fieldInput = event.target.value;
    let filterOutput = integerFilter(fieldInput);
    let spaceRm = removeSpaces(filterOutput);
    let clampedInput = stringClamper(spaceRm, 2);
    let validation = yearValidation(clampedInput);

    if (validation) {
      updateCardNumberDisplay(cardYearDisp, clampedInput);
      changeFocusOnComplete(cardCVSField, clampedInput, 2);
      return;
    }
    if (clampedInput.length === 2) {
      event.target.value = '';
      updateCardNumberDisplay(cardYearDisp, '', 'yy');
      return;
    }
    updateCardNumberDisplay(cardYearDisp, clampedInput, 'yy');
    event.target.value = clampedInput;
  }

  /*
  function cardBINInputHandler(event){
    let fieldInput = event.target.value;
    let filterOutput = integerFilter(fieldInput);
    let spaceRm = removeSpaces(filterOutput);
    let clampedInput = stringClamper(spaceRm, 4);

    if (clampedInput) {
      changeFocusOnComplete(cardMonthField, clampedInput, 4);
      // updateCardNumberDisplay(cardBINDisp, clampedInput);
      event.target.value = clampedInput;
      return;
    }

    if (clampedInput.length === 4) {
      event.target.value = '';
      updateCardNumberDisplay(cardMonthDisp, '', '0000');
      return;
    }

    // updateCardNumberDisplay(cardBINDisp, clampedInput, '0000');
    event.target.value = clampedInput;
  }
  */

  function cardNameInputHandler(event){
    let fieldInput = event.target.value;
    let keyPressed = event.data;
    let isNonInteger = !integerCheck(keyPressed);
    let filterOutput = nonIntegerFilter(fieldInput);

    if (isNonInteger) {
      updateCardNumberDisplay(cardNameDisp, stringClamper(filterOutput, 25));
    } else {
      updateCardNumberDisplay(cardNameDisp, stringClamper(filterOutput, 25), 'Card User Name');
    }
    updateCardNumberDisplay(cardNameDisp, stringClamper(filterOutput, 25), 'Card User Name');
    event.target.value = stringClamper(filterOutput, 25);
  }

  function cardCVSInputHandler(event){
    let fieldInput = event.target.value;
    let filterOutput = integerFilter(fieldInput);
    let spaceRm = removeSpaces(filterOutput);
    let clampedInput = stringClamper(spaceRm, 4);

    if (clampedInput) {
      changeFocusOnComplete(cardNameField, clampedInput, 3);
      updateCardNumberDisplay(cardCVSDisp, clampedInput);
      event.target.value = clampedInput;
      return;
    }

    if (clampedInput.length === 4) {
      event.target.value = '';
      updateCardNumberDisplay(cardCVSDisp, '', '000');
      return;
    }

    updateCardNumberDisplay(cardCVSDisp, clampedInput, '000');
    event.target.value = clampedInput;
  }

  function cardCVSFocusInHandler(event){
    cardHolder.classList.add('flip');
  }

  function cardCVSFocusOuHandler(event){
    cardHolder.classList.remove('flip');
  }

  // Helper functions
  function padInput(value) {
    return [...value].map((v, i) => {
      if (i === 0) {
        return v;
      }
      if ((i % 4) === 0) {
        return `   ${v}`;
      }
      return v;
    }).join('');
  }

  function integerCheck(value) {
    return (Number.isInteger(+value));
  }

  function integerFilter(value) {
    return [...value].filter(char => integerCheck(char)).join('')
  }

  function nonIntegerFilter(value) {
    return [...value].filter(char =>{
      if(char == ' '){
        return true;
      }
      return !integerCheck(char);
    }).join('')
  }

  function removeSpaces(value) {
    return [...value].filter(char => char != ' ').join('');
  }

  function stringClamper(str, letterCount) {
    return str.length > letterCount ?
      str.substring(0, letterCount) :
      str;
  }

  function updateCardNumberDisplay(element, setValue, defaultValue) {
    if (setValue.length === 0) {
      element.textContent = defaultValue;
      return;
    }
    element.textContent = setValue;
    return;
  }

  function monthValidator(value) {
    let intValue = parseInt(value);
    if (value === '00' || intValue > 12 || value === '') {
      return false;
    }
    return true;
  }

  function yearValidation(value) {
    let cardValidPeriod = +value - +CURRENT_YEAR;

    if (value === '00' || cardValidPeriod > 4 || cardValidPeriod < 0) {
      return false;
    }
    return true;
  }

  function changeFocusOnComplete(elementToFocus, checkValue, charCount) {
    if (checkValue.length === charCount) {
      elementToFocus.focus();
    }
  }

}());
