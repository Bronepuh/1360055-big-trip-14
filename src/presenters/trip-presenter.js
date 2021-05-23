import SiteMenuView from '../view/site-menu';
import StatsView from '../view/stats';
import RouteAndPriceView from '../view/route-and-price';
import SiteFiltersView from '../view/site-filters';
import EventsFiltersView from '../view/events-filters';
import EventsListEmptyView from '../view/event-list-empty';
import EventsListView from '../view/events-list';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-predenter';
import { remove, render, RenderPosition } from '../utils/render';
import { SortType, UserAction, UpdateType } from '../utils/const';
import { sortPointDay, sortPointTime, sortPointPrice } from '../utils/common';


export default class TripPresenter {
  constructor(statContainer, tripMainContainer, siteMenuContainer, siteFiltersContainer, eventMainContainer, pointsModel) {

    this._pointsModel = pointsModel;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;
    this._eventsFiltersViewComponent = null;

    this._statContainer = statContainer;
    this._tripMainContainer = tripMainContainer;
    this._siteMenuContainer = siteMenuContainer;
    this._siteFiltersContainer = siteFiltersContainer;
    this._eventMainContainer = eventMainContainer;

    this._routeAndPriceViewComponent = new RouteAndPriceView();
    this._siteMenuViewComponent = new SiteMenuView();
    this._statsViewComponent = new StatsView(this._pointsModel);
    this._siteFiltersViewComponent = new SiteFiltersView();
    this._eventsListEmptyViewComponent = new EventsListEmptyView();
    this._eventsListViewComponent = new EventsListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);


    this._newPointPresenter = new NewPointPresenter(this._eventsListViewComponent, this._handleViewAction, this._pointsModel);
  }

  init() {
    render(this._tripMainContainer, this._routeAndPriceViewComponent, RenderPosition.AFTERBEGIN);
    render(this._siteMenuContainer, this._siteMenuViewComponent, RenderPosition.BEFOREEND);
    this._siteMenuViewComponent.setMenuClickHandler(this._handleSiteMenuClick);

    render(this._siteFiltersContainer, this._siteFiltersViewComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _getPoints() {

    switch (this._currentSortType) {
      case SortType.DAY:
        return this._pointsModel.getPoints().slice().sort(sortPointDay);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortPointTime);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPointPrice);
    }

    return this._pointsModel.getPoints();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
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
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearPoints();

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
        this._statsViewComponent._setCharts();

        remove(this._eventsFiltersViewComponent);
        remove(this._eventsListViewComponent);
        // Скрыть статистику
        // Показать доску
        // Показать форму добавления новой задачи
        // Убрать выделение с ADD NEW TASK после сохранения
        break;
      case 'Table':
        remove(this._statsViewComponent);
        this._clearPoints();
        this._renderTrip();
        // Показать доску
        // Скрыть статистику
        break;
    }
  }

  _renderEventsFilters() {
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
    const pointPresenter = new PointPresenter(this._eventsListViewComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _clearPoints() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._eventsFiltersViewComponent);
    remove(this._eventsListViewComponent);

  }

  _renderTrip() {
    if (this._pointsModel.getPoints().length === 0) {
      this._renderEmptyEventList();
    }

    this._renderEventsFilters();
    this._renderEventList();
    this._renderPoints(this._pointsModel.getPoints());
  }

  createPoint() {
    remove(this._eventsListEmptyViewComponent);
    this._newPointPresenter.init(this._eventsListViewComponent, this._handleViewAction, this._pointsModel);
  }
}
