import SiteMenuView from './view/site-menu';
import RouteAndPriceView from './view/route-and-price';
import SiteFiltersView from './view/site-filters';
import EventsFiltersView from './view/events-filters';
import EventsListEmptyView from './view/event-list-empty';
import EventsListView from './view/events-list';
import FormEditView from './view/form-edit';
import EventsPointView from './view/event-point';
import { generatePoint } from './mock/points';
import { POINTS_TYPES } from './mock/points';
import { render, RenderPosition } from './utils';

const POINTS_COUNT = 10;
const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const siteMainElement = document.querySelector('.page-body');
const routeAndPrice = siteMainElement.querySelector('.trip-main');
const siteMenu = siteMainElement.querySelector('.trip-controls__navigation');
const siteFilters = siteMainElement.querySelector('.trip-controls__filters');
const eventMainElement = siteMainElement.querySelector('.trip-events');

render(routeAndPrice, new RouteAndPriceView().getElement(), RenderPosition.AFTERBEGIN);
render(siteMenu, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteFilters, new SiteFiltersView().getElement(), RenderPosition.BEFOREEND);

if (points.length === 0) {
  render(eventMainElement, new EventsListEmptyView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(eventMainElement, new EventsFiltersView().getElement(), RenderPosition.BEFOREEND);
}

// рисую список эвентов
render(eventMainElement, new EventsListView().getElement(), RenderPosition.BEFOREEND);
// нахожу этот список
const eventList = siteMainElement.querySelector('.trip-events__list');

const renderPoint = function (parentElement, point) {
  const eventPointComponent = new EventsPointView(point);
  const formEditComponent = new FormEditView(point, POINTS_TYPES);

  render(parentElement, eventPointComponent.getElement(), RenderPosition.BEFOREEND);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const replacePointToForm = () => {
    parentElement.replaceChild(formEditComponent.getElement(), eventPointComponent.getElement());
    document.addEventListener('keydown', onEscKeyDown);
  };

  const replaceFormToPoint = () => {
    parentElement.replaceChild(eventPointComponent.getElement(), formEditComponent.getElement());
    document.removeEventListener('keydown', onEscKeyDown);
  };

  const pointRollupButton = eventPointComponent.getElement().querySelector('.event__rollup-btn');
  pointRollupButton.addEventListener('click', () => {
    replacePointToForm();
  });

  const formRollupButton = formEditComponent.getElement().querySelector('.event__rollup-btn');
  formRollupButton.addEventListener('click', () => {
    replaceFormToPoint();
  });

  const form = formEditComponent.getElement().querySelector('form');
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });
};

for (let i = 0; i < points.length; i++) {
  const parentElement = eventList;
  const point = points[i];
  renderPoint(parentElement, point);
}
