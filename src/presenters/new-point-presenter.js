import FormAddView from '../view/form-add';
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

    this._formAddComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlePriceChange = this._handlePriceChange.bind(this);
    this._handleTypePointClick = this._handleTypePointClick.bind(this);
    this._handleTypeCityClick = this._handleTypeCityClick.bind(this);
    this._handleOffersChange = this._handleOffersChange.bind(this);
    this._handlePointDelete = this._handlePointDelete.bind(this);
  }

  init() {

    this._formAddComponent = new FormAddView(POINTS_TYPES, DEFAULT_POINT, DESTINATION, this._changeData, false);
    this._formAddComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formAddComponent.setFormPriceHandler(this._handlePriceChange);
    this._formAddComponent.setTypePointChangeHandler(this._handleTypePointClick);
    this._formAddComponent.setTypeCityChangeHandler(this._handleTypeCityClick);
    this._formAddComponent.setOffersChangeHandler(this._handleOffersChange);
    this._formAddComponent.setPointDeleteHandler(this._handlePointDelete);
    document.addEventListener('keydown', this._escKeyDownHandler);

    render(this._eventList, this._formAddComponent, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    document.removeEventListener('keydown', this._escKeyDownHandler);
    remove(this._formAddComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handleTypePointClick(type) {
    this._formAddComponent.setType(type);
  }

  _handleTypeCityClick(city) {
    this._formAddComponent.setCity(city);
  }

  _handlePriceChange(price) {
    this._formAddComponent.setPrice(price);
  }

  _handleOffersChange(offer) {
    this._formAddComponent.toggleOffers(offer);
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      Object.assign({}, point),
    );
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handlePointDelete() {
    this.destroy();
  }
}
