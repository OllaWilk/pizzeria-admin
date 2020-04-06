import {settings, select, classNames, templates} from '../settings.js';
import {utils} from '../utils.js';
import CartProduct from './CartProduct.js';

class Cart{
  constructor(element) {
    const thisCart = this;  //stała
    thisCart.products = [];  // stworzona tablica do przechowywania produktów w tablicach
    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
    thisCart.getElements(element);
    thisCart.initActions();
    //console.log('new Cart', thisCart);
  }

  getElements(element) {
    const thisCart = this;

    thisCart.dom = {};  //wartość w której będą przechowywane elementy dom wyszukane w komponencie koszyka
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList); // to trzeba dodać aby zdefiniować miejsce wstawiania produktu.
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
    thisCart.dom.address = thisCart.dom.wrapper.querySelector(select.cart.address);
    thisCart.renderTotalsKeys = ['totalNumber', 'totalPrice', 'subtotalPrice', 'deliveryFee'];

    for(let key of thisCart.renderTotalsKeys){
      thisCart.dom[key] = thisCart.dom.wrapper.querySelectorAll(select.cart[key]);
    }
  }

  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function() {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function() {
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function() {
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function() {
      event.preventDefault(); //aby wyświetlanie formularza nie przeładowywało strony.
      thisCart.sendOrder();
    });
  }

  sendOrder() { //tutaj definiuje stałe do wysyłania zapytania do API
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.order; //stała url z adresem endpointu. tutaj z endpointem zamówienia order.

    const payload = { //ładunek czyli dane wysyłąne do serwera.
      address: thisCart.dom.address.value,
      phone: thisCart.dom.phone.value,
      totalPrice: thisCart.totalPrice, //cena całego zamówienia
      totalNumber: thisCart.totalNumber,
      subtotalPrice: thisCart.subtotalPrice,
      deliveryFee: thisCart.deliveryFee,
      products: [],
    };

    for(let product of thisCart.products) {
      payload.products.push(product.getData());
    }

    const options = { //zawiera opcje które skonfigurują zapytanie.
      method: 'POST', //zmiana metody z GET na POST czyli wysyłanie do API
      headers: {
        'Content-Type': 'application/json', //nagłówek aby serwer wiedział że wysyłamy dane w postaci jsona
      },
      body: JSON.stringify(payload), // treść którą wysyłamy
    };

    fetch(url, options)
      .then(function(response) {
        return response.json();
      })
      .then(function(parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      });
  }

  add(menuProduct) {
    const thisCart = this;

    const generatedHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisCart.dom.productList.appendChild(generatedDOM);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));// stworzyliśmy nowa instancję klasy newCartProduct
    thisCart.update();
  }

  update() {
    const thisCart = this;
    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;

    for(let product of thisCart.products) {
      thisCart.subtotalPrice += product.price;
      thisCart.totalNumber += product.amount;
    }
    thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFee;
    console.log('totalNumber', thisCart.totalNumber);
    console.log('subtotalPrice', thisCart.subtotalPrice);
    console.log('thisCart.totalPrice', thisCart.totalPrice);

    for(let key of thisCart.renderTotalsKeys) {
      for(let elem of thisCart.dom[key]) {
        elem.innerHTML = thisCart[key];
      }
    }
  }

  remove(cartProduct) {
    //zdeklarowanie stałą thisCart
    const thisCart = this;
    //deklaracja stałej index = index cartProduct w tablicy thisCart.products
    const index = thisCart.products.indexOf(cartProduct);
    console.log('index', index);
    //splice do usunięcia elementu o tym indexie z tablicy thisCart.products
    const delElem = thisCart.products.splice(cartProduct, 1);//
    console.log('del', delElem);
    //usunąć z DOM element cartProduct.dom.wrapper
    cartProduct.dom.wrapper.remove();
    //wywołanie metody update w celu przeliczenia sum po usunięciu produktu
    thisCart.update();
  }
}

export default Cart;