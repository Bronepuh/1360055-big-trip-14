import {createSiteMenuTemplate} from './view/site-menu';
import {createRouteAndPriceTemplate} from './view/route-and-price';
import {createSiteFilters} from './view/site-filters';
import {createEventsFiltersTemplate} from './view/events-filters';
import {createFormEditTemplate} from './view/form-edit';
import {createEventsPointTemplate} from './view/event-point';
import {createEventsListTemplate} from './view/events-list';

const MAX_LIST_LENGTH = 4;

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
render(eventMainElement, createEventsFiltersTemplate(), 'beforeend');
render(eventMainElement, createEventsListTemplate(), 'beforeend');

const eventList = siteMainElement.querySelector('.trip-events__list');
const renderEventList = function () {
  render(eventList, createFormEditTemplate(), 'beforeend');
  for (let i = 1; i < MAX_LIST_LENGTH; i++) {
    render(eventList, createEventsPointTemplate(), 'beforeend');
  }
};

renderEventList();
