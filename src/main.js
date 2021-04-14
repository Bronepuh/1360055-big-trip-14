import { createSiteMenuTemplate } from './view/site-menu';
import { createRouteAndPriceTemplate } from './view/route-and-price';
import { createSiteFilters } from './view/site-filters';
import { createEventsFiltersTemplate } from './view/events-filters';
import { createFormEditTemplate } from './view/form-edit';
import { createEventsPointTemplate } from './view/event-point';
import { createEventsListTemplate } from './view/events-list';
import { generatePoint } from './mock/points';
import { POINTS_TYPES } from './mock/points';

const POINTS_COUNT = 15;
const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.page-body');
const routeAndPrice = siteMainElement.querySelector('.trip-main');
const siteMenu = siteMainElement.querySelector('.trip-controls__navigation');
const siteFilters = siteMainElement.querySelector('.trip-controls__filters');
const eventMainElement = siteMainElement.querySelector('.trip-events');

render(routeAndPrice, createRouteAndPriceTemplate(), 'afterbegin');
render(siteMenu, createSiteMenuTemplate(), 'beforeend');
render(siteFilters, createSiteFilters(), 'beforeend');

render(eventMainElement, createEventsFiltersTemplate(points[0]), 'beforeend');

// рисую список эвентов
render(eventMainElement, createEventsListTemplate(POINTS_COUNT), 'beforeend');
// нахожу этот список
const eventList = siteMainElement.querySelector('.trip-events__list');
render(eventList, createFormEditTemplate(points[0], POINTS_TYPES), 'beforeend');
render(eventList, createFormEditTemplate(points[1], POINTS_TYPES), 'beforeend');

for (let i = 1; i < POINTS_COUNT; i++) {
  render(eventList, createEventsPointTemplate(points[i]), 'beforeend');
}
