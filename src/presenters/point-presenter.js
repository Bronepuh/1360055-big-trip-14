import FormEditView from '../view/form-edit';
import LoadingView from '../view/loading';
import EventsPointView from '../view/events-point';
import { render, RenderPosition, replace, remove } from '../utils/render';
import { UserAction, UpdateType } from '../utils/const';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
};

export default class PointPresenter {
  constructor(eventList, changeData, changeMode, handleOpenEditForm, destinationsModel, pointTypesModel) {
    this._eventList = eventList;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._handleOpenEditForm = handleOpenEditForm;
    this._destinationsModel = destinationsModel;
    this._pointTypesModel = pointTypesModel;

    this._eventPointComponent = null;
    this._formEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handlePointClick = this._handlePointClick.bind(this);
    this._handleFormClick = this._handleFormClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlePriceChange = this._handlePriceChange.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleTypePointClick = this._handleTypePointClick.bind(this);
    this._handleTypeCityClick = this._handleTypeCityClick.bind(this);
    this._handlePointDelete = this._handlePointDelete.bind(this);
    this._handleOffersChange = this._handleOffersChange.bind(this);
  }

  init(point) {
    this._point = point;

    const prevEventPointComponent = this._eventPointComponent;
    const prevFormEditComponent = this._formEditComponent;

    this._loadingComponent = new LoadingView();
    this._eventPointComponent = new EventsPointView(this._point);
    this._formEditComponent = new FormEditView(this._point, this._destinationsModel.getDestinations(), this._pointTypesModel.getPointsTypes(), this._changeData, true);

    this._eventPointComponent.setPointClickHandler(this._handlePointClick);
    this._eventPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._formEditComponent.setFormClickHandler(this._handleFormClick);
    this._formEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._formEditComponent.setFormPriceHandler(this._handlePriceChange);
    this._formEditComponent.setTypePointChangeHandler(this._handleTypePointClick);
    this._formEditComponent.setTypeCityChangeHandler(this._handleTypeCityClick);
    this._formEditComponent.setPointDeleteHandler(this._handlePointDelete);
    this._formEditComponent.setOffersChangeHandler(this._handleOffersChange);

    if (prevEventPointComponent === null || prevFormEditComponent === null) {
      render(this._eventList, this._eventPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventPointComponent, prevEventPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._formEditComponent, prevFormEditComponent);
      this._mode = Mode.DEFAULT;
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


  setViewState(state) {
    switch (state) {
      case State.SAVING:
        this._formEditComponent.updateState({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._formEditComponent.updateState({
          isDisabled: true,
          isDeleting: true,
        });
        break;
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
    this._handleOpenEditForm();
  }

  _handleFormClick() {
    this._replaceFormToPoint();
  }

  _handleFormSubmit(point) {

    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign({}, point),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
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

  _handlePriceChange(price) {
    this._formEditComponent.setPrice(price);
  }

  _handleOffersChange(offer) {
    this._formEditComponent.toggleOffers(offer);
  }

  _handlePointDelete() {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      this._point,
    );
  }
}
