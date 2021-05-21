import FormEditView from '../view/form-edit';
import { POINTS_TYPES, DESTINATION } from '../mock/points';
import { render, RenderPosition, remove } from '../utils/render';
import { UserAction, UpdateType } from '../utils/const';

import { nanoid } from 'nanoid';
import dayjs from 'dayjs';


const DEFAULT_POINT = {
  'basePrice': 0,
  'dateFrom': dayjs(),
  'dateTo': dayjs().add(2, 'hour'),
  'id': nanoid(),
  'isFavorite': false,
  'offers': [
    {
      'title': 'Add luggage',
      'price': 30,
    }, {
      'title': 'Switch to comfort class',
      'price': 100,
    },
  ],
  'type': 'taxi',
  'destination':
  {
    'city': 'Amsterdam',
    'pictures': [
      'http://picsum.photos/248/152?r=4.jpg',
    ],
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export default class NewPointPresenter {
  constructor(eventList, changeData, pointsModel) {

    this._pointsModel = pointsModel;
    this._eventList = eventList;
    this._changeData = changeData;

    this._formEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlePriceChange = this._handlePriceChange.bind(this);
    this._handleTypePointClick = this._handleTypePointClick.bind(this);
    this._handleTypeCityClick = this._handleTypeCityClick.bind(this);
    this._handleNewPointDelete = this._handleNewPointDelete.bind(this);
    this._handleOffersChange = this._handleOffersChange.bind(this);
  }

  init() {

    this._formEditComponent = new FormEditView(POINTS_TYPES, DEFAULT_POINT, DESTINATION, this._changeData, false);
    this._formEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditComponent.setFormPriceHandler(this._handlePriceChange);
    this._formEditComponent.setTypePointChangeHandler(this._handleTypePointClick);
    this._formEditComponent.setTypeCityChangeHandler(this._handleTypeCityClick);
    this._formEditComponent.setNewPointDeleteHandler(this._handleNewPointDelete);
    this._formEditComponent.setOffersChangeHandler(this._handleOffersChange);
    document.addEventListener('keydown', this._escKeyDownHandler);

    render(this._eventList, this._formEditComponent, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    document.removeEventListener('keydown', this._escKeyDownHandler);
    remove(this._formEditComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleTypePointClick(type) {
    this._formEditComponent.setType(type);
  }

  _handleTypeCityClick(city) {
    this._formEditComponent.setCity(city);
  }

  _handlePriceChange(price) {
    this._formEditComponent.setPrice(price);
  }

  _handleOffersChange(offer) {
    this._formEditComponent.toggleOffers(offer);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      Object.assign({}, point),
    );
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleNewPointDelete() {
    this.destroy();
  }
}
