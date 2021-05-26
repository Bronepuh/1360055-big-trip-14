import dayjs from 'dayjs';
import he from 'he';
import SmartView from './smart';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
// import { DESTINATION } from '../mock/points';

// генерация дополнительных опций
const getCurrentType = function (pointsTypes, type) {
  for (let i = 0; i < pointsTypes.length; i++) {
    if (pointsTypes[i].type === type) {
      const currentType = {
        type: type,
        offers: pointsTypes[i].offers,
      };
      return currentType;
    }
  }
};

const getCurrentDestination = function (destinations, city) {
  for (let i = 0; i < destinations.length; i++) {
    if (destinations[i].city === city) {
      const currentDestination = {
        city: destinations[i].city,
        description: destinations[i].description,
        pictures: destinations[i].pictures,
      };
      return currentDestination;
    }
  }
};

const generateOffersList = function (pointsTypes, type, offers) {
  const currentType = getCurrentType(pointsTypes, type);
  const newOffers = currentType.offers;
  const checkedOffers = offers;
  let newOffersList = '';

  for (let i = 0; i < newOffers.length; i++) {
    const offer = newOffers[i];
    const isChecked = checkedOffers.some((elem) => elem.title === offer.title);
    newOffersList += `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" ${isChecked ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-luggage-${i}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`;
  }
  return newOffersList;
};

const generateTypeList = function (pointsTypes, state) {
  let newTypesList = '';
  for (let i = 0; i < pointsTypes.length; i++) {
    const type = pointsTypes[i];
    const isChecked = type.type === state.currentType.type;
    newTypesList += `<div class="event__type-item">
        <input id="event-type-${type.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.type}" ${isChecked ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${type.type}" for="event-type-${type.type}-1">${type.type}</label>
      </div>`;
  }
  return newTypesList;
};

// генерация городов
const generateCitysList = function (destinations) {
  let newCitysList = '';
  for (let i = 0; i < destinations.length; i++) {
    newCitysList += `<option value="${he.encode(destinations[i].city)}"></option>`;
  }

  return newCitysList;
};

// генерация картинок
const generatePicturesList = function (destination) {
  let newPicturesList = '';
  for (let i = 0; i < destination.pictures.length; i++) {
    newPicturesList += `<img class="event__photo" src="${destination.pictures[i].src}" alt="Event photo">`;
  }
  return newPicturesList;
};

const createFormEditTemplate = (pointsTypes, state, hasArrowButton, destinations) => {

  const { basePrice, dateFrom, dateTo, offers, type, destination } = state;
  const timeStart = dayjs(dateFrom).format('YY[/]MM[/]DD HH[:]mm');
  const timeEnd = dayjs(dateTo).format('YY[/]MM[/]DD HH[:]mm');
  const offersItems = generateOffersList(pointsTypes, type, offers);
  const itemTypes = generateTypeList(pointsTypes, state);
  const eventPhotos = generatePicturesList(destination);
  const canDelete = Boolean(state.id);
  const canFold = hasArrowButton;

  const citysList = generateCitysList(destinations);

  return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${itemTypes}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              Flight
            </label>

            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
            <datalist id="destination-list-1">

              ${citysList}

            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeStart}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${canDelete ? 'Delete' : 'Cancel'}</button>
          ${canFold ? `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
          </button>` : ''}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersItems}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${eventPhotos}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`;
};

export default class FormEdit extends SmartView {

  static parsePointToState(point, destinations, pointsTypes) {
    return Object.assign(
      {},
      point,
      {
        currentType: getCurrentType(pointsTypes, point.type),
        currentDestination: getCurrentDestination(destinations, point.destination.city),
      },
    );
  }

  static parseStateToPoint(point) {
    point = Object.assign({}, point);
    delete point.currentType;
    delete point.currentDestination;
    return point;
  }

  constructor(point, destinations, pointsTypes, changeData, hasArrowButton) {
    super();

    this._point = point;
    this._destinations = destinations;
    this._pointsTypes = pointsTypes;


    this._changeData = changeData;
    this._hasArrowButton = hasArrowButton;

    this._state = FormEdit.parsePointToState(this._point, this._destinations, this._pointsTypes);

    this._dateFromPicker = null;
    this._dateToPicker = null;

    this._formClickHandler = this._formClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formPriceHandler = this._formPriceHandler.bind(this);
    this._typePointChangeHandler = this._typePointChangeHandler.bind(this);
    this._typeCityChangeHandler = this._typeCityChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._pointDeleteHandler = this._pointDeleteHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDateFromChangePicker();
    this._setDateToChangePicker();
  }

  getTemplate() {

    return createFormEditTemplate(this._pointsTypes, this._state, this._hasArrowButton, this._destinations);
  }

  // установка внутренних обработчиков и их восстановление
  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._typePointChangeHandler);

    if(this._hasArrowButton) {
      this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formClickHandler);
    }

    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
    this.getElement().querySelector('#event-destination-1').addEventListener('change', this._typeCityChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._formPriceHandler);
    this.getElement().querySelector('.event__available-offers').addEventListener('change', this._offersChangeHandler);
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._pointDeleteHandler);
    // this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._newPointDeleteHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDateFromChangePicker();
    this._setDateToChangePicker();
  }

  // изменение даты начала евента
  _setDateFromChangePicker() {
    if (this._dateFromPicker) {
      this._dateFromPicker.destroy();
      this._dateFromPicker = null;
    }

    this._dateFromPicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        time_24hr: true,
        enableTime: true,
        minDate: 'today',
        defaultDate: new Date(this._state.dateFrom),
        onChange: this._dateFromChangeHandler,
      },
    );
  }

  _dateFromChangeHandler([dateFrom]) {
    this.updateState({
      dateFrom: dateFrom,
    }, false);
    if (this._state.dateFrom > this._state.dateTo) {
      this.updateState({
        dateTo: dateFrom,
      }, false);

      this._dateToPicker.setDate(new Date(this._state.dateFrom));
    }
    this._dateToPicker.set('minDate', new Date(this._state.dateFrom));
  }

  // изменение даты конца евента
  _setDateToChangePicker() {
    if (this._dateToPicker) {
      this._dateToPicker.destroy();
      this._dateToPicker = null;
    }

    this._dateToPicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        time_24hr: true,
        enableTime: true,

        defaultDate: new Date(this._state.dateTo),
        minDate: new Date(this._state.dateFrom),

        onChange: this._dateToChangeHandler,
      },
    );
  }

  _dateToChangeHandler([dateTo]) {
    this.updateState({
      dateTo: dateTo,
    }, false);
    this._dateFromPicker.set('maxDate', new Date(this._state.dateTo));
  }

  // изменение типа эвента
  setType(type) {
    const update = {
      type: type,
      currentType: getCurrentType(this._pointsTypes, type),
    };

    this.updateState(update);
  }

  _typePointChangeHandler(evt) {
    evt.preventDefault();
    this._callback.typePointChange(evt.target.value);
  }

  setTypePointChangeHandler(callback) {
    this._callback.typePointChange = callback;
  }

  // изменение города эвента
  setCity(city) {
    const update = {
      city: city,
      destination: getCurrentDestination(this._destinations, city),
    };

    this.updateState(update);
  }

  _typeCityChangeHandler(evt) {
    evt.preventDefault();
    const userInputValue = evt.target.value;
    const validateUserInput = getCurrentDestination(this._destinations, userInputValue);

    if (validateUserInput === undefined) {
      throw new Error('Такого города нет!');
    }

    const city = evt.target.value || this._state.destination.city;
    this._callback.typeCityChange(city);
    const update = {
      city: city,
      destination: getCurrentDestination(this._destinations, city),
    };

    this.updateState(update);
  }

  setTypeCityChangeHandler(callback) {
    this._callback.typeCityChange = callback;
  }

  // замена точки маршрута на форму редактирования
  _formClickHandler(evt) {
    evt.preventDefault();
    this._callback.formClick();
  }

  setFormClickHandler(callback) {
    this._callback.formClick = callback;
  }

  // изменение базовой цены
  setPrice(price) {
    const update = {
      basePrice: price,
    };

    this.updateState(update, false);
  }

  _formPriceHandler(evt) {
    evt.preventDefault();
    const price = Number(evt.target.value);
    this._callback.formPriceChange(price);
  }

  setFormPriceHandler(callback) {
    this._callback.formPriceChange = callback;
  }

  // изменение дополнительных офферов

  toggleOffers(offerTitle) {

    const existingIndex = this._state.offers.findIndex((offer) => {
      return offer.title === offerTitle;
    });

    if (existingIndex !== -1) {
      this._state.offers.splice(existingIndex, 1);
    } else {
      const newOffer = this._state.currentType.offers.find((offer) => {
        return offer.title === offerTitle;
      });
      this._state.offers.push(newOffer);
    }
  }

  _offersChangeHandler(evt) {
    evt.preventDefault();
    this._callback.offersChange(evt.target.parentNode.querySelector('span').textContent);
  }

  setOffersChangeHandler(callback) {
    this._callback.offersChange = callback;
  }

  // удаление точки маршрута
  _pointDeleteHandler() {
    this._callback.pointDelete();
  }

  setPointDeleteHandler(callback) {
    this._callback.pointDelete = callback;
  }

  // удаление несохраненной новой точки маршрута
  // _newPointDeleteHandler() {
  //   this._callback.newPointDelete();
  // }

  // setNewPointDeleteHandler(callback) {
  //   this._callback.newPointDelete = callback;
  // }

  // сохранение измененного стейта через сабмит
  _formSubmitHandler(evt) {
    evt.preventDefault();
    const point = FormEdit.parseStateToPoint(this._state);
    this._callback.formSubmit(point);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
  }
}
