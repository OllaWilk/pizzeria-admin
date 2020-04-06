//importy pisze się na początku pliku
import{settings, select, classNames} from  './settings.js'; //importuj obiekty settings z katalogu settings.js ścieżka do pliku zaczyna się ./
import Product from './components/Product.js'; // JEDYNIE PRZY export default (domyślnego exportu) nie muszę używać nawiasów klamrowych. używanie nawiasów klamrowych służy do importu więcej niż 1 rzeczy i nie jest to rzecz domyślna
import Cart from './components/Cart.js'; //słowo export powoduje to, że stałe będą dostępne w innych plikach, ale nie automatycznie
import Booking from './components/Booking.js';

const app = {  // konst startuje aplikację. jest szefem całej aplikacji. BARDZO WAŻNE INICJE Definiujemy app na początku a na samym końcu go inicjujemy.

  initBooking: function() {
    const thisApp = this;

    const bookingWidget = document.querySelector(select.containerOf.booking);

    thisApp.booking = new Booking(bookingWidget); //elementy NEW są wywoływane w klasie app. New oznacza, że jest to obiekt zrobiony na podstawie tego co zostało zrobione w klasie.
  },

  initCarousel(){

    const review = [];
    review[0] = {
      title: 'Friends',
      text: 'Lorem ipsum dolora sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Kasia'
    };
    review[1] ={
      title: 'Food',
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      author: 'Ala'
    };
    review[2] ={
      title: 'The best',
      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      author: 'Jadzia'
    };
    let revInf = 0;
    const indicators = document.querySelectorAll('.carousel-indicators i');

    function changeReview() {
      const title = document.querySelector('.review-title');
      const text = document.querySelector('.review-text');
      const author = document.querySelector('.review-author');
      title.innerHTML = review[revInf].title;
      text.innerHTML = review[revInf].text;
      author.innerHTML = review[revInf].author;

      for(let indicator of indicators) {
        if (indicator.id == revInf + 1 ) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      }
      if(revInf < review.length - 1 && revInf < carouselImages.length) {
        revInf++;
      } else {
        revInf=0;
      }
    }
    let imgNr = 0;
    const carouselImages = [];

    carouselImages[0] = '../../images/mainPage/pizza-3.jpg';
    carouselImages[1] = '../../images/mainPage/pizza-4.jpg';
    carouselImages[2] = '../../images/mainPage/pizza-5.jpg';

    function changeImages() {
      const img = document.querySelector('.carousel-img img');
      img.src = carouselImages[imgNr];

      if(imgNr < carouselImages.length - 1) {
        imgNr++;
      } else {
        imgNr=0;
      }
    }

    window.onload = function() {
      setInterval(() => {
        changeImages();
        changeReview();
      }, 3000);
    };
  },

  initPages: function () { //initPages uruchamiana jest w momencie uruchamiania strony. są tu linki i kontenery podstron
    const thisApp = this;

    thisApp.pages = Array.from(document.querySelector(select.containerOf.pages).children); //to jest właściwość pages, która będzie przechowywać wszystkie właściwości podstron, które musimy wyszukać w drzewie DOM.. children pozwala na to, że we właściwości pages, znajdą się wszystkie dzieci kontenera stron czyli sekcja order i booking.

    thisApp.navLinks = Array.from(document.querySelectorAll(select.nav.links)); //Array.form()metoda dzielenia. np.

    const idFromHash = window.location.hash.replace('#/', '');//tutaj z hasza url strony uzyskuję id podstrony, która ma zostać otwarta jako domyślna

    let pageMatchingHash = thisApp.pages[0].id; //jeśli nazwa strony nie będzie pasować, to otworzy się strona 1. ta zmienna jest przed pętlą, bo chcę ją wykorzystać po pętli
    //pętla do sprawdzania id podstron. Sprawszam czy uzyskane id z podstrony pasuje do id pobranego z adresu strony.

    for(let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break; // break przerywa iterację po pętli.
      }
    }

    //  TO JEST ZAKOMENTOWANE. PONIEWAŻ DO AKTYWACJI STRONY NIE POTRZEBUJĘ JUŻ TEGO
    //thisApp.activatePage(thisApp.pages[0].id); //aktywacja pierwszej z podstron. to jest uciążliwe kiedy przy przeładowaniu strony, musimy za każdym razem przełączyć się na stronę booking
    thisApp.activatePage(pageMatchingHash);
    //dodanie linków odsyłających do podstron. przy pomocy kliknięcia
    for(let link of thisApp.navLinks) { //przechodzenie między podstronami
      link.addEventListener('click', function(event) {
        const clickedElement = this;
        event.preventDefault();

        /*get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', ''); //w stałej id chcę zapisać atrybut href klikniętego elementu, w którym zamienię znak # na pusty ciąg znaków.

        /*run thisApp.actibatePage with that id */
        thisApp.activatePage(id);

        /*change URL hash */
        window.location.hash = '#/' + id; // zmienia się hash strony zbooking na order. Dodanie / po znaku # powoduje, to , że strona nie przewinie się po przełączaniu strony na stronę
      });
    }
  },

  activatePage: function(pageId){ //funkcja ma nadać odpowiedniemu wraperowi strony czyli section id booking/ order klasę active
    const thisApp = this;

    /*add class "active to matching pages, remowe from non-matching" */
    for(let page of thisApp.pages) {

      // if(page.id == pageId){
      //   page.classList.add(className.pages.active);
      // } else {
      //   page.classList.remove(classNames.pages.active)
      // } TEN ZAPIS MOŻNA ZAPISAĆ W 1 LINIJCE. PATRZ NIŻEJ

      page.classList.toggle(classNames.pages.active, page.id == pageId);//toogle nadaje klasę podaną jako pierwszy argument, drugi argument kontroluje czy zostanie nadana klasa czy nie.

    }

    for( let link of thisApp.navLinks ){ // dla każdego linka zapisanego w thisApp.navLinks chcę

      link.classList.toggle ( //toggle czyli dodać lub usunąć
        classNames.nav.active, //klasę zapisaną w className.nav.active
        link.getAttribute('href') == '#' + pageId //w zależności od tego czy atrybut href tego linka jest równy # oraz id strony podanej jako argument metody activePAge
      );
    }
  },

  initMenu: function() {    //initMenu to jest metoda obiektu app, która tworzy instancje klasy Product.
    const thisApp = this;   //'thisApp.data' sprawdzenie czy dane o produktach są gotowe o użycia

    for(let productData in thisApp.data.products) {   //pętla dla thisApp.data.products będzie tworzyć nową instancję dla każdego produktu. Nie ma potrzeba zapisywania do stałej/zmiennej
      // new Product(productData, thisApp.data.products[productData]); TO ZOSTALO ZAKOMENTOWANE PONIEWAZ ZAMIAST KLUCZA W KOMUNIKACJI Z SERWEREM WYKOZYSTUJE TEREZ ID
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
    /*  [FRAGMENT ZASĄPIONY PĘTLĄ FOR IN]const testProduct = new Product();
    // 'test Product' ten consoloe log został wyświetlony w metodzie. Product nie ma żadnych właśniwości
    console.log('testProduct:', testProduct);*/
  },

  initCart: function() {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },

  initData: function() {    //metoda init Data w przyszłości pozwoli mi zmienić sposób pobierania danych. Z pliku na serwer
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function(rawResponse) {  //. kropka to jest odwołanie do then.. mogę odwołać się do initData przez dodanie kropki.
        return rawResponse.json();
      })
      .then(function(parsedResponse) { //then jeśl przyniesiesz to wykonaj to.
        //console.log('parsedResponse', parsedResponse);
        /*save parsedResponse as thisApp.data.products */
        thisApp.data.products =parsedResponse;
        /*excute initMenu method */
        thisApp.initMenu();
      });

    //console.log('this.data', JSON.stringify(thisApp.data));
  },

  init: function(){
    const thisApp = this;
    //console.log('*** App starting ***');
    //console.log('thisApp:', thisApp);
    //console.log('classNames:', classNames);
    //console.log('settings:', settings);
    //console.log('templates:', templates);
    thisApp.initPages();

    thisApp.initData();
    //thisApp.initMenu(); NIE POTRZEBUJĘ TEGO PRZY KOMUNIKACJI Z AJAX ponieważ dane tzw. menu rozpisane jest w pliku, który 'usunęłam' object data source
    thisApp.initCart();
    thisApp.initBooking();
    thisApp.initCarousel();
  },
};

app.init();