import { generatePoint } from './mock/points';
import { POINTS_COUNT } from './utils/const';
import TripPresenter from './presenters/trip-presenter';
import PointsModel from './model/points';

const tripMainContainer = document.querySelector('.trip-main');
const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const siteFiltersContainer = document.querySelector('.trip-controls__filters');
const eventMainContainer = document.querySelector('.trip-events');

const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const tripPresenter = new TripPresenter(tripMainContainer, siteMenuContainer, siteFiltersContainer, eventMainContainer, pointsModel);
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
