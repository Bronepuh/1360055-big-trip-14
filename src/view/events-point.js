import dayjs from 'dayjs';
import AbstractView from './abstract';

const getFormat = function (from, to) {
  const hours = to.diff(from, 'hours');
  const days = to.diff(from, 'days');
  if (days > 0) {
    return 'DD[D] HH[H] mm[M]';
  } else if (hours > 0) {
    return 'HH:mm';
  } else {
    return 'mm';
  }
};

const getFavoriteTemplate = function (isFavorite) {
  if (isFavorite) {
    return `<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
  </svg>`;
  } else {
    return `<span>Add to favorite
    </span>`;
  }
};

const getOffersItems = function (offers) {
  let newOffersList = '';
  for (let i = 0; i < offers.length; i++) {

    newOffersList+= `<li class="event__offer">
      <span class="event__offer-title">${offers[i].title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offers[i].price}</span>
    </li>`;
  }

  return newOffersList;
};

const createEventsPointTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, isFavorite, type, destination, offers } = point;
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);
  const format = getFormat(from, to);
  const minutes = to.diff(from, 'minutes');
  const startDate = dayjs(dateFrom).format('MMM DD');
  const timeStart = dayjs(dateFrom).format(format);
  const timeEnd = dayjs(dateTo).format(format);
  const favorite = getFavoriteTemplate(isFavorite);
  const offersItems = getOffersItems(offers);

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${startDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
      </p>
      <p class="event__duration">${minutes}&nbsp;M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersItems}
    </ul>
    <button class="event__favorite-btn event__favorite-btn--active" type="button">
      ${favorite}
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class EventsPoint extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._pointClickHandler = this._pointClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventsPointTemplate(this._point);
  }

  _pointClickHandler(evt) {
    evt.preventDefault();
    this._callback.pointClick();
  }

  setPointClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
