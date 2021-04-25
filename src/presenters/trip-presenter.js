import SiteMenuView from '../view/site-menu';
import RouteAndPriceView from '../view/route-and-price';
import SiteFiltersView from '../view/site-filters';
import EventsFiltersView from '../view/events-filters';
import EventsListEmptyView from '../view/event-list-empty';
import EventsListView from '../view/events-list';
import PointPresenter from './point-presenter';
import { updateItem } from '../utils/common.js';
import { render, RenderPosition } from '../utils/render';

export default class TripPresenter {
  constructor() {

    this._pointPresenter = {};

    this._tripMainContainer = document.querySelector('.trip-main');
    this._siteMenuContainer = document.querySelector('.trip-controls__navigation');
    this._siteFiltersContainer = document.querySelector('.trip-controls__filters');
    this._eventMainContainer = document.querySelector('.trip-events');

    this._routeAndPriceViewComponent = new RouteAndPriceView();
    this._siteMenuViewComponent = new SiteMenuView();
    this._siteFiltersViewComponent = new SiteFiltersView();

    this._eventsFiltersViewComponent = new EventsFiltersView();
    this._eventsListEmptyViewComponent = new EventsListEmptyView();
    this._eventsListViewComponent = new EventsListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();

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
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderEventList() {
    render(this._eventMainContainer, this._eventsFiltersViewComponent, RenderPosition.AFTERBEGIN);
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
