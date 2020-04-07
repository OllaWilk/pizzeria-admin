/* eslint-disable no-restricted-globals */
/* eslint-disable no-prototype-builtins */
import {select, classNames, templates} from '../settings.js';
import {utils} from '../utils.js';
import AmountWidget from './amountWidget.js';

class Product {   //klasa Produkt opisuje mi wszystko to co/ gdzie będę wykorzystywać swoje produkty(ciasta, pizze itp)
  //[ CONSTRUKTOR - OPISUJE MI PRODUKT, KONKRETYZUJE PRODUKT]
  constructor(id, data) {   //constructor jest funkcją. KOLEJNOŚĆ JEST WAŻNA. Wywoływania funkcji trzeba pisać tak jak są zapisane poniżej
    const thisProduct = this;   //obiekt this reprezentuje właściwości instancji this to jakby mój produkt nie konkretny. poniżej będę go opisywać(konkretyzować)
    thisProduct.id = id;    // id przypisuje co to jest produkt (ciasto v pizza v kawa). Info pobrane z data.js dataSource.products = {cake: {obiekty identyfikujące}}
    thisProduct.data = data;    // {obiekty identyfikujące} <-> {cena, wielkość, nazwa, opis, zdjęcie}
    thisProduct.renderInMenu();   //wywołuję renderowanie, które zapisane jest w metodzie renderInMenu
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();


    //console.log('new Product:', thisProduct);   //ten console log wyświetlony został przez konstruktor klasy. Product nie ma żadnych właśniwości
  }
  //[renderInMenu - MA TWORZYĆ PRODUKTY NA STRONIE]
  renderInMenu() {
    const thisProduct = this;
    const generatedHTML = templates.menuProduct(thisProduct.data);    //generuje kod HTML pojedynczego produktu. templates.menuProduct zdefiniowany jest w templates przy pomocy biblioteki Handlebars. Natomiast miejsce w kodzie HTML jest zdefiniowane w tamplateOf jako właściwość menuProduct.
    thisProduct.element = utils.createDOMFromHTML(generatedHTML);   //tworzy element DOM na podstawie kodu produktu.urzywam funkcje ultis Chodzi o to by zapisać we właściwości instancji ten wygenerowany element. [!!!] Element DOM to obiekt wygenerowany przez przeglądarkę na podstawie dodu HTMl.
    const menuContainer = document.querySelector(select.containerOf.menu);    //znajduje na stronie kontener menu. selektor kontenera zapisany jest w select.containerOf.menu
    menuContainer.appendChild(thisProduct.element);   //Do wskazanego kontenera w htmlu (menuContainer) dodaj dziecko (appendChild), którym jest zapisany i utworzony element (DOM).    wstawia stworzony element DOM do znalezionego kontenera menu.. appendChild dodaje stworzony element do menu
  }
  //wyszukiwanie elementów DOM zrobionych przez nas w html

  getElements(){
    const thisProduct = this;
    thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable); // ścieżka setings.js wybież select z select znajdz menu produkt a potem clicable gdzie .product__header jest w css zdefiniowany w pliku _product.scss klasa .product pod klasie _header
    thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
    thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
  }
  //[inicjacja akordeonu?? pokazuje opcje pojedynczego produktu]
  initAccordion() {
    const thisProduct = this;
    /* find the clickable trigger (the element that should react to clicking) */
    //const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    /* START: click event listener to trigger */
    thisProduct.accordionTrigger.addEventListener('click', function(){
      /* prevent default action for event */
      event.preventDefault();
      /* toggle active class on element of thisProduct */
      thisProduct.element.classList.toggle('active');
      /* find all active products */
      const allActiveProducts = document.querySelectorAll('.product.active');
      /* START LOOP: for each active product */
      for(let activeProduct of allActiveProducts) {
        /* START: if the active product isn't the element of thisProduct */
        if (thisProduct.element !==activeProduct){
        /* remove class active for the active product */
          activeProduct.classList.remove('active');
          /* END: if the active product isn't the element of thisProduct */
        }
        /* END LOOP: for each active product */
      }
    /* END: click event listener to trigger */
    });
  }
  //initOrderForm
  initOrderForm() {
    const thisProduct = this;
    //console.log('init order form', thisProduct);

    thisProduct.form.addEventListener('submit', function(event){  //dla każdego eventu submit blokujemy domyślną akcję.
      event.preventDefault();   //event.preventDeafault(); powstrzymuje momyślną akcję.
      thisProduct.processOrder();
    });

    for(let input of thisProduct.formInputs){
      input.addEventListener('change', function(){
        thisProduct.processOrder();
      });
    }

    thisProduct.cartButton.addEventListener('click', function(event){ //dla każdego eventu click w guziku blokujemy domyślną akcję. Guzik jest linkiem nie guzikiem
      event.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });

  }

  // processOrder oblicza cenę każdego produktu. uruchamiana jest raz dla każdego produktu. Odpowiada za dobranie listenerów do zdarzeń formularza, jego kontrolek oraz guzika dodania do koszyka. Wywoływany jest w każdym handleerze evenu bez argumentów.
  processOrder() {
    const thisProduct = this;
    /* read all data from the form (using utils.serializeFormToObject) and save it to const formData */
    const formData = utils.serializeFormToObject(thisProduct.form);   //utils.serializeFormToObject zawiera TYLKO zaznaczone opcjie. Wieć NIE MOŻEMY iterować po tym obiekcie. potrzebujemy zrobić to na obiekcie, który będzie miał wszystkie opcje(zaznaczone i nie). funkcja będzie zwracać obiekt, w którym kluczami będą wartości atrybutów name kontrolek formularza oraz wartościami będą tablice zawierające wartości atrybutów value wybranych opcji.
    //console.log('formData', formData);
    /* set variable price to equal thisProduct.data.price */
    thisProduct.params = {};
    let price = thisProduct.data.price;   //domyślna cena produktu
    /* START LOOP: for each paramId in thisProduct.data.params */
    for(let paramId in thisProduct.data.params) {   //aby sprawdzić wszsystki opcje, zaznaczenia i nie musimy iterować po WSZYSTKICJ możliwych wynikach parametrów(patrz params data.js) i ich opcjach. (pętla w pętli). Do tego jest mi potrzebna ta pętla.
      /* save the element in thisProduct.data.params with key paramId as const param */
      const param = thisProduct.data.params[paramId];//opcje produktu patrz data.js
      /* START LOOP: for each optionId in param.options */
      for(let optionId in param.options ) {
        /* save the element in param.options with key optionId as const option */
        const option = param.options[optionId]; //opcje opcji produktu patrz data.js
        const optionSelected = formData.hasOwnProperty(paramId) && formData[paramId].indexOf(optionId) > -1; //definiowanie opcji zaznaczonych w stałej. w stałej formData[paramId] sprawdzam czy istnieje tablica z parametrami produktu. Jeśłi tak to czy zawiera też klucz optionId(opcje opcji) UWAGA! jeśli w wyrażeniu występuje && to drugie wyrażenie wykona się jeśli pierwsze będzie fałszywe.
        /* START IF: if option is selected and option is not default */
        if(optionSelected && !option.default) {    //w tej pętli umieszczam obrazki ponieważ w niej mamy klucz parametru i opcji oraz wiemy czy opcja jest zaznaczona.
          /* add price of option to variable price */
          price += option.price;
          /* START ELSE IF: if option is not selected and option is default */
        } else if (!optionSelected && option.default) {
          /* deduct price of option from price */
          price -= option.price;
        }
        /* zapisanie stałej w której zapisane będą wszystkie elementy. */
        const imageWrapperItems = thisProduct.imageWrapper.querySelector('.' + paramId + '-' + optionId);
        /*START IF/ELSE warunek tej pętli sprawdza czy opcja została zaznaczona. pętla ma iterować po znalezionych elementach. elementom znalezionym mamy dodać usunąć klasę.  */
        if(optionSelected && imageWrapperItems) {
          imageWrapperItems.classList.add(classNames.menuProduct.imageVisible);

          if (!thisProduct.params[paramId]) {
            thisProduct.params[paramId] = {
              label: param.label,
              options: {},
            };
          }
          thisProduct.params[paramId].options[optionId] = option.label;

        } else if (imageWrapperItems) {
          imageWrapperItems.classList.remove(classNames.menuProduct.imageVisible);
        }
      }
    }
    /*  ZAKOMENTOWANE PONIEWAŻ DODAJEMY CENĘ CAŁKOWITĄ ZA SZTUKĘ
    multiply price by amount */
    /*price *= thisProduct.amountWidget.value; //ZAPAMIĘTAĆ tutaj powinno być this.product  price musi być zdefiniowana
    thisProduct.priceElem.innerHTML = price; //cena już po dodaniu/odjęciu opcji wynik z pętli. Jest to cena koszyka*/
    /* DWIE NOWE WŁAŚCIWOŚCI PRODUKTU. CENA CAŁKOWITA PRICE I CENA JEDNEJ SZTUKI PRICESINGLE multiply price by amount */
    thisProduct.priceSingle = price;
    thisProduct.price = thisProduct.priceSingle * thisProduct.amountWidget.value;

    /* set the contents of thisProduct.priceElem to be the value of variable price */
    thisProduct.priceElem.innerHTML = thisProduct.price;
  }

  initAmountWidget(){
    const thisProduct = this;

    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
    thisProduct.amountWidgetElem.addEventListener('updated', function() {
      thisProduct.processOrder();
    });
  }

  addToCart() {
    const thisProduct = this;

    thisProduct.name = thisProduct.data.name;
    thisProduct.amount = thisProduct.amountWidget.value;

    //app.cart.add(thisProduct);

    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct,
      },
    });
    thisProduct.element.dispatchEvent(event);
  }
}

export default Product;
//default exportowanie domyślnej rzeczy.