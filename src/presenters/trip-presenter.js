import SiteMenuView from '../view/site-menu';
import StatsView from '../view/stats';
import RouteAndPriceView from '../view/route-and-price';
import SiteFiltersView from '../view/site-filters';
import EventsFiltersView from '../view/events-filters';
import EventsListEmptyView from '../view/event-list-empty';
import EventsListView from '../view/events-list';
import LoadingView from '../view/loading';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import { remove, render, RenderPosition } from '../utils/render';
import { SortType, FilterType, UserAction, UpdateType } from '../utils/const';
import { sortPointDay, filterPointFuture, filterPointPast, sortPointTime, sortPointPrice, filterPointEverything } from '../utils/common';


export default class TripPresenter {
  constructor(statContainer, tripMainContainer, siteMenuContainer, siteFiltersContainer, eventMainContainer, pointsModel, destinationsModel, pointTypesModel, api) {

    this._pointsModel = pointsModel;
    this._destinationsModel = destinationsModel;
    this._pointTypesModel = pointTypesModel;

    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._currentFilterType = FilterType.EVERYTHING;
    this._siteFiltersViewComponent = null;
    this._eventsFiltersViewComponent = null;
    this._isLoading = true;
    this._api = api;

    this._statContainer = statContainer;
    this._tripMainContainer = tripMainContainer;
    this._siteMenuContainer = siteMenuContainer;
    this._siteFiltersContainer = siteFiltersContainer;
    this._eventMainContainer = eventMainContainer;

    this._routeAndPriceViewComponent = new RouteAndPriceView();
    this._siteMenuViewComponent = new SiteMenuView();
    this._statsViewComponent = new StatsView(this._pointsModel);

    this._eventsListEmptyViewComponent = new EventsListEmptyView();
    this._eventsListViewComponent = new EventsListView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);
    this._handleOpenEditForm = this._handleOpenEditForm.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);

    this._newPointPresenter = new NewPointPresenter();
  }

  init() {
    render(this._tripMainContainer, this._routeAndPriceViewComponent, RenderPosition.AFTERBEGIN);
    render(this._siteMenuContainer, this._siteMenuViewComponent, RenderPosition.BEFOREEND);
    this._siteMenuViewComponent.setMenuClickHandler(this._handleSiteMenuClick);

    this._siteFiltersViewComponent = new SiteFiltersView(this._currentFilterType);
    render(this._siteFiltersContainer, this._siteFiltersViewComponent, RenderPosition.BEFOREEND);
    this._siteFiltersViewComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    this._renderTrip();
  }

  _getPoints() {

    let filterCb = null;
    let sortCB = null;

    switch (this._currentFilterType) {
      case FilterType.EVERYTHING:
        filterCb = filterPointEverything;
        break;
      case FilterType.FUTURE:
        filterCb = filterPointFuture;
        break;
      case FilterType.PAST:
        filterCb = filterPointPast;
        break;
    }

    switch (this._currentSortType) {
      case SortType.DAY:
        sortCB = sortPointDay;
        break;
      case SortType.TIME:
        sortCB = sortPointTime;
        break;
      case SortType.PRICE:
        sortCB = sortPointPrice;
        break;
    }

    return this._pointsModel.getPoints().filter(filterCb).sort(sortCB);
  }

  _handleOpenEditForm() {
    this._newPointPresenter.destroy();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.ADD_POINT:
        this._api.addPoint(update).then((response) => {
          this._pointsModel.addPoint(updateType, response);
        });
        break;
      case UserAction.DELETE_POINT:
        this._api.deletePoint(update).then(() => {
          this._pointsModel.deletePoint(updateType, update);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearPoints();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearPoints();
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilterType === filterType) {
      return;
    }

    this._currentFilterType = filterType;
    this._currentSortType = SortType.DAY;

    this._clearPoints();

    this._renderSiteFilters(this._currentFilterType);
    this._renderEventsFilters(this._currentSortType);
    this._renderEventList();
    this._renderPoints(this._getPoints(this._currentFilterType));
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearPoints();

    this._renderSiteFilters(this._currentFilterType);
    this._renderEventsFilters(this._currentSortType);
    this._renderEventList();
    this._renderPoints(this._getPoints(this._currentSortType));
  }

  _handleSiteMenuClick(menuItem) {
    this._siteMenuViewComponent.setMenuItem(menuItem);

    switch (menuItem.textContent) {
      case 'Stats':
        remove(this._statsViewComponent);
        render(this._statContainer, this._statsViewComponent, RenderPosition.BEFOREEND);
        this._statsViewComponent.updateChart();
        remove(this._siteFiltersViewComponent);
        remove(this._eventsFiltersViewComponent);
        remove(this._eventsListViewComponent);
        break;
      case 'Table':
        remove(this._statsViewComponent);
        this._clearPoints();
        this._renderTrip();
        break;
    }
  }

  _renderSiteFilters() {
    if (this._siteFiltersViewComponent) {
      remove(this._siteFiltersViewComponent);
    }

    this._siteFiltersViewComponent = new SiteFiltersView(this._currentFilterType);
    render(this._siteFiltersContainer, this._siteFiltersViewComponent, RenderPosition.BEFOREEND);
    this._siteFiltersViewComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
  }

  _renderEventsFilters() {
    if (this._eventsFiltersViewComponent) {
      remove(this._eventsFiltersViewComponent);
    }
    this._eventsFiltersViewComponent = new EventsFiltersView(this._currentSortType);
    this._eventsFiltersViewComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._eventMainContainer, this._eventsFiltersViewComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventList() {
    render(this._eventMainContainer, this._eventsListViewComponent, RenderPosition.BEFOREEND);
  }

  _renderEmptyEventList() {
    render(this._eventMainContainer, this._eventsListEmptyViewComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventsListViewComponent, this._handleViewAction, this._handleModeChange, this._handleOpenEditForm, this._destinationsModel, this._pointTypesModel);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderLoading() {
    render(this._eventsListViewComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _clearPoints() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._siteFiltersViewComponent);
    remove(this._eventsFiltersViewComponent);
    remove(this._eventsListViewComponent);

  }


  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._pointsModel.getPoints().length === 0) {
      this._renderEmptyEventList();
    }

    this._renderSiteFilters();
    this._renderEventsFilters();
    this._renderEventList();
    this._renderPoints(this._pointsModel.getPoints());
  }

  createPoint() {
    remove(this._eventsListEmptyViewComponent);
    this._newPointPresenter.init(this._eventsListViewComponent, this._handleViewAction, this._pointsModel, this._destinationsModel, this._pointTypesModel);

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());

    this._currentSortType = SortType.DAY;
    this._currentFilterType = FilterType.EVERYTHING;
    this._renderSiteFilters();
    this._renderEventsFilters();
  }

}
