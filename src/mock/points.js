import { nanoid } from 'nanoid';
import { getRandomInteger, getUniqueRandomFromRandom, generateDate } from '../utils';

const MIN_DESCRIPTIONS_COUNT = 1;
const MAX_DESCRIPTIONS_COUNT = 5;

const MIN_OFFERS_COUNT = 0;
const MAX_OFFERS_COUNT = 5;

const MIN_PICTURES_COUNT = 1;
const MAX_PICTURES_COUNT = 5;

const PICTURES_ARR = [1, 2, 3, 4, 5];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const getOffersArray = function () {
  return [
    {
      'title': 'Add luggage',
      'price': 30,
      'isChecked': Boolean(getRandomInteger(0, 1)),
    }, {
      'title': 'Switch to comfort class',
      'price': 100,
      'isChecked': Boolean(getRandomInteger(0, 1)),
    }, {
      'title': 'Add meal',
      'price': 15,
      'isChecked': Boolean(getRandomInteger(0, 1)),
    }, {
      'title': 'Choose seats',
      'isChecked': Boolean(getRandomInteger(0, 1)),
      'price': 5,
    }, {
      'title': 'Travel by train',
      'price': 40,
      'isChecked': Boolean(getRandomInteger(0, 1)),
    },
  ];
};

const POINTS_TYPES = [
  {
    'type': 'taxi',
    'offers': getUniqueRandomFromRandom(getOffersArray(), getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
  },
  {
    'type': 'bus',
    'offers': getUniqueRandomFromRandom(getOffersArray(), getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
  },
  {
    'type': 'train',
    'offers': getUniqueRandomFromRandom(getOffersArray(), getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
  },
  {
    'type': 'ship',
    'offers': getUniqueRandomFromRandom(getOffersArray(), getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
  },
  {
    'type': 'transport',
    'offers': getUniqueRandomFromRandom(getOffersArray(), getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
  },
  {
    'type': 'drive',
    'offers': getUniqueRandomFromRandom(getOffersArray(), getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
  },
  {
    'type': 'flight',
    'offers': getUniqueRandomFromRandom(getOffersArray(), getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
  },
  {
    'type': 'check-in',
    'offers': getUniqueRandomFromRandom(getOffersArray(), getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
  },
  {
    'type': 'sightseeing',
    'offers': getUniqueRandomFromRandom(getOffersArray(), getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
  },
  {
    'type': 'restaurant',
    'offers': getUniqueRandomFromRandom(getOffersArray(), getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT)),
  },
];

export const generatePoint = function () {
  return {
    'basePrice': getRandomInteger(550, 1200),
    'dateFrom': generateDate(),
    'dateTo': generateDate(),
    'destination': getUniqueRandomFromRandom(DESCRIPTIONS, getRandomInteger(MIN_DESCRIPTIONS_COUNT, MAX_DESCRIPTIONS_COUNT)).join(' '),
    'id': nanoid(),
    'isFavorite': Boolean(getRandomInteger(0, 1)),
    'type': POINTS_TYPES[getRandomInteger(0, POINTS_TYPES.length - 1)],
    'pictures': getUniqueRandomFromRandom(PICTURES_ARR, getRandomInteger(MIN_PICTURES_COUNT, MAX_PICTURES_COUNT)),
  };
};
