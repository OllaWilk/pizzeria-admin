/* eslint-disable eqeqeq */

import {select, templates, settings, classNames} from '../settings.js';
import {utils} from '../utils.js';
import  AmountWidget from './amountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor(bookingReservation) {
    const thisBooking = this;

    thisBooking.render(bookingReservation);
    thisBooking.initWidgets();
    thisBooking.getData();
    thisBooking.initActions();
  }


  /*renderowanie obiektów na stronie*/
  render(paramElem) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = paramElem;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables);
    thisBooking.dom.form = thisBooking.dom.wrapper.querySelector(select.booking.form);

    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(select.booking.phone);
    thisBooking.dom.adress = thisBooking.dom.wrapper.querySelector(select.booking.address);
    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelectorAll(select.booking.starters);
    thisBooking.dom.hours = thisBooking.dom.wrapper.querySelector(select.booking.hours);
    thisBooking.dom.people = thisBooking.dom.wrapper.querySelector(select.booking.people);

    thisBooking.dom.slider = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.slider);
  }


  /*inicjowanie widgetów ilości ludzi, godziny, daty i godziny*/
  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    thisBooking.dom.wrapper.addEventListener('updated', function() {
      thisBooking.updateDOM();
    });
  }


  /*pobieranie danych z app.json*/
  getData() {
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = {
      booking: [
        startDateParam,
        endDateParam,
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,
      ],
    };


    const urls = {
      booking:        settings.db.url + '/' + settings.db.booking + '?' + params.booking.join('&'),
      eventsCurrent:  settings.db.url + '/' + settings.db.event   + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:   settings.db.url + '/' + settings.db.event   + '?' + params.eventsRepeat.join('&'),
    };

    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function(allResponses) {
        const bookingsResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      }).then(function([bookings, eventsCurrent, eventsRepeat]) {
        console.log(bookings);
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });

  }


  /*informacje o zajętych stołach wydarzeniach */
  parseData(bookings, eventsCurrent, eventsRepeat){
    const thisBooking = this;
    thisBooking.booked = {};

    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for(let item of bookings){
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }
    for(let item of eventsCurrent){
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for(let item of eventsRepeat){
      if(item.repeat == 'daily'){
        for (let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)){
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }
    console.log('thisBooking.booked', thisBooking.booked);

    thisBooking.updateDOM();
  }

  /*informacje o zajętości stolow,daty, godziny długości h  */
  makeBooked(date, hour, duration, table) {
    const thisBooking = this;

    if (typeof thisBooking.booked[date] == 'undefined'){
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    if (typeof thisBooking.booked[date][startHour] == 'undefined'){
      thisBooking.booked[date][startHour] = [];
    }

    if(table.length) {
      for (let tab of table) {
        thisBooking.booked[date][startHour].push(tab);
      }
    } else {
      thisBooking.booked[date][startHour].push(table);
    }

    for(let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {
      if (typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }

      if(table.length) {
        for (let tab of table) {
          thisBooking.booked[date][hourBlock].push(tab);
        }
      } else {
        thisBooking.booked[date][hourBlock].push(table);
      }
    }
  }

  updateDOM() {
    const thisBooking = this;

    thisBooking.date = thisBooking.datePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);

    let allAvailable = false;

    if (
      typeof thisBooking.booked[thisBooking.date] == 'undefined'
      ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined'
    ) {
      allAvailable = true;
    }

    for(let table of thisBooking.dom.tables) {
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if (!isNaN(tableId)) {
        tableId = parseInt(tableId);
      }

      if (
        !allAvailable
      &&
      thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ) {
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }

    const hours = [];

    for (let i = 0; i < 24; i++) {
      hours[i] = 12 + 0.5 * i;
    }

    let interval = 100 / 24;
    let gradient = ``;

    for (let hour in thisBooking.booked[thisBooking.date]) {
      if (thisBooking.booked[thisBooking.date][hour].length === 1) {
        for (let i = 0; i < 24; i++) {
          if (hours[i] === parseInt(hour)) {
            gradient += `,rgb(0,255,0) ${i * interval}%, rgb(0,255,0) ${i * interval}%, rgb(0,255,0) ${2 * i * interval}%, rgb(0,255,0) ${2 * i * interval}%`;
          }
        }
      }
      else if (thisBooking.booked[thisBooking.date][hour].length === 2) {
        for (let i = 0; i < 24; i++) {
          if (hours[i] === parseInt(hour)) {
            //console.log(hour);
            gradient += `,rgb(232,149,23) ${i * interval}%, rgb(232,149,23) ${i * interval}%, rgb(232,149,23) ${2 * i * interval}%, rgb(232,149,23) ${2 * i * interval}%`;
          }

        }
      }
      else if (thisBooking.booked[thisBooking.date][hour].length === 3) {
        for (let i = 0; i < 24; i++) {
          if (hours[i] === parseInt(hour)) {
            //console.log(hour);
            gradient += `,rgb(255, 0, 0) ${i * interval}%, rgb(255, 0, 0) ${i * interval}%, rgb(255, 0, 0) ${2 * i * interval}%, rgb(255, 0, 0) ${2 * i * interval}%`;
          }
        }
      }

      thisBooking.dom.slider.style.background = `linear-gradient(to right, rgb(0, 255, 0) 0%,  rgb(0, 255, 0) 0% ` + gradient + `,rgb(0, 255, 0) 100%, rgb(0, 255, 0) 100%)`;
    }
  }


  initActions() {
    const thisBooking = this;

    for (let table of thisBooking.dom.tables) {

      table.addEventListener('click', function() {
        if(table.classList.contains(classNames.booking.tableBooked)) {
          alert('This table is booked, please choose another :)');
        } else {
          table.classList.toggle('chosen');
          thisBooking.tableId = table.getAttribute(settings.booking.tableIdAttribute);
        }
      });
    }

    thisBooking.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisBooking.sendBooked();
    });
  }


  sendBooked() {
    const thisBooking = this;
    const url = settings.db.url + '/' + settings.db.booking;

    const booked = {
      date: thisBooking.datePicker.value,
      hour: thisBooking.hourPicker.value,
      repeat: false,
      address: thisBooking.dom.adress.value,
      phone: thisBooking.dom.phone.value,
      ppl: thisBooking.peopleAmount.value,
      duration: thisBooking.hoursAmount.value,
      starters: [],
      table:[],
    };

    for(let starter of thisBooking.dom.starters) {
      if (starter.checked == true) {
        booked.starters.push(starter.value);
      }
    }

    for (let table of thisBooking.dom.tables) {
      if (table.classList.contains('chosen')) {
        thisBooking.tableId = table.getAttribute(settings.booking.tableIdAttribute);
        table.classList.add(classNames.booking.tableBooked);

        if (!isNaN(thisBooking.tableId)) {
          thisBooking.tableId = parseInt(thisBooking.tableId);
        }
        booked.table.push(thisBooking.tableId);
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booked),
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      }).then(function(parsedResponse) {
        console.log('parsedResponse', parsedResponse);
        thisBooking.makeBooked(booked.datePicked, booked.hourPicked, booked.duration, booked.table);
      });
  }
}
export default Booking;