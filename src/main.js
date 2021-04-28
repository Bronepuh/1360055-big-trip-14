import { generatePoint } from './mock/points';
import { POINTS_COUNT } from './utils/const';
import TripPresenter from './presenters/trip-presenter';

const tripMainContainer = document.querySelector('.trip-main');
const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const siteFiltersContainer = document.querySelector('.trip-controls__filters');
const eventMainContainer = document.querySelector('.trip-events');

const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const tripPresenter = new TripPresenter(tripMainContainer, siteMenuContainer, siteFiltersContainer, eventMainContainer);
tripPresenter.init(points);
