import SiteMenuView from '../view/site-menu';
import RouteAndPriceView from '../view/route-and-price';
import SiteFiltersView from '../view/site-filters';
import EventsFiltersView from '../view/events-filters';
import EventsListEmptyView from '../view/event-list-empty';
import EventsListView from '../view/events-list';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/common.js';
import { render, RenderPosition } from '../utils/render';
import { SortType } from '../utils/const';
import { sortPointDay, sortPointTime, sortPointPrice } from '../utils/common';


export default class TripPresenter {
  constructor(tripMainContainer, siteMenuContainer, siteFiltersContainer, eventMainContainer) {

    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._tripMainContainer = tripMainContainer;
    this._siteMenuContainer = siteMenuContainer;
    this._siteFiltersContainer = siteFiltersContainer;
    this._eventMainContainer = eventMainContainer;

    this._routeAndPriceViewComponent = new RouteAndPriceView();
    this._siteMenuViewComponent = new SiteMenuView();
    this._siteFiltersViewComponent = new SiteFiltersView();

    this._eventsFiltersViewComponent = new EventsFiltersView();
    this._eventsListEmptyViewComponent = new EventsListEmptyView();
    this._eventsListViewComponent = new EventsListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._sourcedBoardPoints = points.slice();

    render(this._tripMainContainer, this._routeAndPriceViewComponent, RenderPosition.AFTERBEGIN);
    render(this._siteMenuContainer, this._siteMenuViewComponent, RenderPosition.BEFOREEND);
    render(this._siteFiltersContainer, this._siteFiltersViewComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedBoardPoints = updateItem(this._sourcedBoardPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleSortTypeChange(sortType) {
    // - Сортируем задачи
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    // - Очищаем список
    // - Рендерим список заново
    this._clearPointsList();
    this._renderPoints();
  }

  _sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DAY:
        this._points.sort(sortPointDay);
        break;
      case SortType.TIME:
        this._points.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this._points.sort(sortPointPrice);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this._points = this._sourcedBoardPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _renderEventList() {
    render(this._eventMainContainer, this._eventsFiltersViewComponent, RenderPosition.AFTERBEGIN);

    this._eventsFiltersViewComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._eventMainContainer, this._eventsListViewComponent, RenderPosition.BEFOREEND);
  }

  _renderEmptyEventList() {
    render(this._eventMainContainer, this._eventsListEmptyViewComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventsListViewComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(from, to) {
    this._points
      .slice(from, to)
      .forEach((point) => this._renderPoint(point));
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderTrip() {
    this._renderEventList();

    this._renderPoints();
  }
}
