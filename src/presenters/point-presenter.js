import FormEditView from '../view/form-edit';
import EventsPointView from '../view/events-point';
import { POINTS_TYPES, CITYS_TYPES } from '../mock/points';
import { render, RenderPosition, replace, remove } from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  constructor(eventList, changeData, changeMode) {
    this._eventList = eventList;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventPointComponent = null;
    this._formEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleTypePointClick = this._handleTypePointClick.bind(this);
    this._handleTypeCityClick = this._handleTypeCityClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevEventPointComponent = this._eventPointComponent;
    const prevFormEditComponent = this._formEditComponent;

    this._eventPointComponent = new EventsPointView(this._point);
    this._formEditComponent = new FormEditView(POINTS_TYPES, this._point, CITYS_TYPES);

    this._eventPointComponent.setPointClickHandler(this._handlePointClick);
    this._eventPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._formEditComponent.setFormClickHandler(this._handleFormClick);
    this._formEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditComponent.setTypePointChangeHandler(this._handleTypePointClick);
    this._formEditComponent.setTypeCityChangeHandler(this._handleTypeCityClick);

    if (prevEventPointComponent === null || prevFormEditComponent === null) {
      render(this._eventList, this._eventPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventPointComponent, prevEventPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._formEditComponent, prevFormEditComponent);
    }

    remove(prevEventPointComponent);
    remove(prevFormEditComponent);

  }

  destroy() {
    remove(this._eventPointComponent);
    remove(this._formEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._formEditComponent, this._eventPointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._eventPointComponent, this._formEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _handlePointClick() {
    this._replacePointToForm();
  }

  _handleFormClick() {
    this._replaceFormToPoint();
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _handleTypePointClick(type) {
    this._formEditComponent.setType(type);
  }

  _handleTypeCityClick(city) {
    this._formEditComponent.setCity(city);
  }
}
