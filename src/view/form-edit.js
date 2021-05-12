import dayjs from 'dayjs';
import SmartView from './smart';

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

const getCurrentCity = function (citisTypes, city) {
  for (let i = 0; i < citisTypes.length; i++) {
    if (citisTypes[i].city === city) {
      const currentCity = {
        city: city,
        destination: citisTypes[i].destination,
        pictures: citisTypes[i].pictures,
      };
      return currentCity;
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
const generateCitysList = function (currentCity) {
  return `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentCity.city}" list="destination-list-1"><datalist id="destination-list-1">`;
};


// генерация картинок
const generatePicturesList = function (currentCity) {
  let newPicturesList = '';
  for (let i = 0; i < currentCity.pictures.length; i++) {
    newPicturesList += `<img class="event__photo" src="${currentCity.pictures[i]}" alt="Event photo">`;
  }
  return newPicturesList;
};


const createFormEditTemplate = (pointsTypes, state) => {

  const { basePrice, dateFrom, dateTo, offers, type, currentCity } = state;
  const timeStart = dayjs(dateFrom).format('YY[/]MM[/]DD HH[:]mm');
  const timeEnd = dayjs(dateTo).format('YY[/]MM[/]DD HH[:]mm');
  const offersItems = generateOffersList(pointsTypes, type, offers);
  const itemTypes = generateTypeList(pointsTypes, state);
  const eventPhotos = generatePicturesList(currentCity);
  const canDelete = Boolean(state.id);
  const canFold = Boolean(state.id);

  const city = generateCitysList(currentCity);

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
            <p class="event__destination-description">${currentCity.destination}</p>

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

  static parsePointToState(pointsTypes, point, citysTypes) {
    return Object.assign(
      {},
      point,
      {
        currentType: getCurrentType(pointsTypes, point.type),
        currentCity: getCurrentCity(citysTypes, point.city),
      },
    );
  }

  static parseStateToPoint(state) {
    state = Object.assign(
      {
        type: state.currentType.type,
        city: state.currentCity.city,
        destination: state.currentCity.destination,
        pictures: state.currentCity.pictures,
      },
      state,
    );
    delete state.currentType;
    delete state.currentCity;
    return state;
  }

  constructor(pointsTypes, point, citysTypes) {
    super();
    this._point = point;
    this._pointsTypes = pointsTypes;
    this._citysTypes = citysTypes;

    this._state = FormEdit.parsePointToState(pointsTypes, point, citysTypes);

    this._formClickHandler = this._formClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typePointChangeHandler = this._typePointChangeHandler.bind(this);
    this._typeCityChangeHandler = this._typeCityChangeHandler.bind(this);
  }

  getTemplate() {
    return createFormEditTemplate(this._pointsTypes, this._state, this._citysTypes);
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
      currentCity: getCurrentCity(this._citysTypes, city),
    };

    this.updateState(update);
  }

  _typeCityChangeHandler(evt) {
    evt.preventDefault();
    this._callback.typeCityChange(evt.target.value);

    const update = {
      city: evt.target.value,
      currentCity: getCurrentCity(this._citysTypes, evt.target.value),
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
  }
}
