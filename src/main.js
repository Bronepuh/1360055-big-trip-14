// import { generatePoint } from './mock/points';
// import { POINTS_COUNT } from './utils/const';
import { UpdateType } from './utils/const';
import TripPresenter from './presenters/trip-presenter';
import PointsModel from './model/points';
import DestinationsModel from './model/destinstions';
import PointTypesModel from './model/point-types';
import Api from './api.js';


const AUTHORIZATION = 'Basic bronepuh';
const END_POINT = 'https://14.ecmascript.pages.academy/big-trip';

const tripMainContainer = document.querySelector('.trip-main');
const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const siteFiltersContainer = document.querySelector('.trip-controls__filters');
const eventMainContainer = document.querySelector('.trip-events');
const statContainer = document.querySelector('.page-body__page-main');

// const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const pointTypesModel = new PointTypesModel();

const api = new Api(END_POINT, AUTHORIZATION);

Promise.all([
  api.getDestinations(),
  api.getOffers(),
  api.getPoints(),
]).then(([destinations, pointsTypes, points]) => {
  destinationsModel.setDestinations(destinations);
  pointTypesModel.setPointsTypes(pointsTypes);
  pointsModel.setPoints(UpdateType.INIT, points);
}).catch(() => {
  destinationsModel.setDestinations([]);
  pointTypesModel.setPointsTypes([]);
  pointsModel.setPoints(UpdateType.INIT, []);
});

const tripPresenter = new TripPresenter(statContainer, tripMainContainer, siteMenuContainer, siteFiltersContainer, eventMainContainer, pointsModel, destinationsModel, pointTypesModel, api);
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
