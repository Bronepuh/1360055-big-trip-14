import dayjs from 'dayjs';
import SmartView from './smart';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

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

const getCurrentDestination = function (destination, city) {
  for (let i = 0; i < destination.length; i++) {
    if (destination[i].city === city) {
      const currentDestination = {
        city: city,
        description: destination[i].description,
        pictures: destination[i].pictures,
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
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage"} ${isChecked ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-luggage-1">
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
const generateCitysList = function (destination) {
  return `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1"><datalist id="destination-list-1">`;
};


// генерация картинок
const generatePicturesList = function (destination) {
  let newPicturesList = '';
  for (let i = 0; i < destination.pictures.length; i++) {
    newPicturesList += `<img class="event__photo" src="${destination.pictures[i]}" alt="Event photo">`;
  }
  return newPicturesList;
};


const createFormEditTemplate = (pointsTypes, state) => {

  const { basePrice, dateFrom, dateTo, offers, type, destination } = state;
  const timeStart = dayjs(dateFrom).format('YY[/]MM[/]DD HH[:]mm');
  const timeEnd = dayjs(dateTo).format('YY[/]MM[/]DD HH[:]mm');
  const offersItems = generateOffersList(pointsTypes, type, offers);
  const itemTypes = generateTypeList(pointsTypes, state);
  const eventPhotos = generatePicturesList(destination);
  const canDelete = Boolean(state.id);
  const canFold = Boolean(state.id);

  const city = generateCitysList(destination);

  return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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

              ${city}

              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
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

  static parsePointToState(pointsTypes, point, destination) {
    return Object.assign(
      {},
      point,
      {
        currentType: getCurrentType(pointsTypes, point.type),
        currentDestination: getCurrentDestination(destination, point.city),
      },
    );
  }

  static parseStateToPoint(state) {
    state = Object.assign(
      {
        type: state.currentType.type,
        city: state.destination.city,
        destination: state.destination.description,
        pictures: state.destination.pictures,
      },
      state,
    );
    delete state.currentType;
    delete state.destination;
    return state;
  }

  constructor(pointsTypes, point, destination) {
    super();
    this._point = point;
    this._pointsTypes = pointsTypes;
    this._destination = destination;

    this._state = FormEdit.parsePointToState(pointsTypes, point, destination);
    this._dateFromPicker = null;
    this._dateToPicker = null;

    this._formClickHandler = this._formClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typePointChangeHandler = this._typePointChangeHandler.bind(this);
    this._typeCityChangeHandler = this._typeCityChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

    this._setDateFromChangePicker();
    this._setDateToChangePicker();
  }

  getTemplate() {
    return createFormEditTemplate(this._pointsTypes, this._state, this._destination);
  }

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
    if(this._state.dateFrom > this._state.dateTo) {
      this.updateState({
        dateTo: dateFrom,
      }, false);

      this._dateToPicker.setDate(new Date(this._state.dateFrom));
    }
    this._dateToPicker.set('minDate', new Date(this._state.dateFrom));
  }

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
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._typePointChangeHandler);
  }

  setCity(city) {
    const update = {
      city: city,
      destination: getCurrentDestination(this._destination, city),
    };

    this.updateState(update);
  }

  _typeCityChangeHandler(evt) {
    evt.preventDefault();
    this._callback.typeCityChange(evt.target.value);

    const update = {
      city: evt.target.value,
      destination: getCurrentDestination(this._destination, evt.target.value),
    };

    this.updateState(update);
  }

  setTypeCityChangeHandler(callback) {
    this._callback.typeCityChange = callback;
    this.getElement().querySelector('#event-destination-1').addEventListener('change', this._typeCityChangeHandler);
  }

  _formClickHandler(evt) {
    evt.preventDefault();
    this._callback.formClick();
  }

  setFormClickHandler(callback) {
    this._callback.formClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formClickHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._typePointChangeHandler);
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formClickHandler);
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
    this.getElement().querySelector('#event-destination-1').addEventListener('change', this._typeCityChangeHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDateFromChangePicker();
    this._setDateToChangePicker();
  }
}
