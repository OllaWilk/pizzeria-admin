/* eslint-disable no-restricted-globals */
import {settings, select} from '../settings.js'; //w setings exportuję rzeczy. Tutaj je importuję. bo są potrzebne..yes.. floor is made of floor
import BaseWidget from './BaseWidget.js';

class AmountWidget extends BaseWidget{
  constructor(element){
    super(element, settings.amountWidget.defaultValue);
    const thisWidget = this;
    thisWidget.getElements(element);
    //thisWidget.value = settings.amountWidget.defaultValue;
    //thisWidget.setValue(thisWidget.input.value);
    thisWidget.initActions();

    //console.log('AmountWidget: ', thisWidget);
    // console.log('constructor arguments: ', element);
  }

  getElements() {
    const thisWidget = this;
    //thisWidget.element = element;
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input); //thisWidget.element przy BaseWidget  thisWidget.element jest podmieniony na thisWidget.dom.wrapper a do thisWigdet.input/linkDecrease/linkIncrease dodaję dom
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  /*  UWAGA TA CZĘŚĆ KODU ZOSTAŁA PRZENIESIONA DO PLIKU BASEWIDGET.JS
    setValue(value){
    const thisWidget = this;

    const newValue = thisWidget.parseValue(value);

    //Pętla wykona się tylko wtedy giedy wartość dodanego produktu będzie większa niż dotychczasowa, większa lub równa niż minimalna wartość i maksymalna wartość.
    if (newValue != thisWidget.value && thisWidget.isValid(newValue)) {
      thisWidget.value = newValue;
      thisWidget.announce();
    }
    //jeśli (nowa wartość newValue równa się pierwotna wartość thisWidget.value oraz && nowa wartość jest mniejsza równa >= wartość min settings.amountWidget.defaultMin i && nowa wartość. była większa równa settings. amoundWidget.defaultMax. )
    //thisWidget.dom.input.value = thisWidget.value;
    thisWidget.renderValue();
  }

  parseValue(value){
    return parseInt(value);
  }*/

  isValid(value) {
    return !isNaN(value)
    && value >= settings.amountWidget.defaultMin
    && value <= settings.amountWidget.defaultMax;
  }

  renderValue(){
    const thisWidget = this;
    thisWidget.dom.input.value = thisWidget.value;
  }

  initActions(){
    const thisWidget = this;

    thisWidget.dom.input.addEventListener('change', function() {
      thisWidget.setValue(thisWidget.input.value);
    });

    thisWidget.dom.linkDecrease.addEventListener('click', function() {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.dom.linkIncrease.addEventListener('click', function() {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
    });
  }

  /* TO PRZENOESZĘ DO PLIKU BASEwIDGET.JS
  announce () {
    const thisWidget = this;

    //const event = new Event('updated'); ten kod zamieniam na ten poniżej aby aktualizować sumę w koszyku po zmianie wielkości
    const event = new CustomEvent('updated', {
      bubbles: true //bubbles włąściwość którą możemy kontrolować jest wbudowana w java script. dzięki czemu ten event po wykonaniu na jakimś elemencie będzie przekazany jego rodzicowi, oraz rodzicowi rodzica, i tak dalej – aż do samego <body>, document i window.
    });
    thisWidget.element.dispatchEvent(event);
  }*/
}

export default AmountWidget; //exportuję dalej bo amountWidget jest używany w innym pliku.