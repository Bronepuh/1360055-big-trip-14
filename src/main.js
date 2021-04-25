import { generatePoint } from './mock/points';
import { POINTS_COUNT } from './utils/const';

import TripPresenter from './presenters/trip-presenter';

const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const tripPresenter = new TripPresenter();
tripPresenter.init(points);
