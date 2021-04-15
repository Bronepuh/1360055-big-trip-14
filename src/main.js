import SiteMenuView from './view/site-menu';
import RouteAndPriceView from './view/route-and-price';
import SiteFiltersView from './view/site-filters';
import EventsFiltersView from './view/events-filters';
import EventsListView from './view/events-list';
import FormEditView from './view/form-edit';
import EventsPointView from './view/event-point';
import { generatePoint } from './mock/points';
import { POINTS_TYPES } from './mock/points';
import { render, RenderPosition } from './utils';

const POINTS_COUNT = 3;
const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const siteMainElement = document.querySelector('.page-body');
const routeAndPrice = siteMainElement.querySelector('.trip-main');
const siteMenu = siteMainElement.querySelector('.trip-controls__navigation');
const siteFilters = siteMainElement.querySelector('.trip-controls__filters');
const eventMainElement = siteMainElement.querySelector('.trip-events');

render(routeAndPrice, new RouteAndPriceView().getElement(), RenderPosition.AFTERBEGIN);
render(siteMenu, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteFilters, new SiteFiltersView().getElement(), RenderPosition.BEFOREEND);
render(eventMainElement, new EventsFiltersView(points[0]).getElement(), RenderPosition.BEFOREEND);

// рисую список эвентов
render(eventMainElement, new EventsListView(POINTS_COUNT).getElement(), RenderPosition.BEFOREEND);
// нахожу этот список
const eventList = siteMainElement.querySelector('.trip-events__list');

const renderPoint = function (parentElement, point) {
  const eventPointComponent = new EventsPointView(point);
  const formEditComponent = new FormEditView(point, POINTS_TYPES);
  render(parentElement, eventPointComponent.getElement(), RenderPosition.BEFOREEND);
  render(parentElement, formEditComponent.getElement(), RenderPosition.BEFOREEND);

  const replacePointToForm = () => {
    parentElement.replaceChild(formEditComponent.getElement(), eventPointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    parentElement.replaceChild(eventPointComponent.getElement(), formEditComponent.getElement());
  };

  eventPointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
  });

  formEditComponent.getElement().querySelector('form').addEventListener('submit', () => {
    replaceFormToPoint();
  });
};

for (let i = 0; i < POINTS_COUNT; i++) {
  const parentElement = eventList;
  const point = points[i];
  renderPoint(parentElement, point);
}
