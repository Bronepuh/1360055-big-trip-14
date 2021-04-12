import { nanoid } from 'nanoid';
import { getRandomInteger, getUniqueRandomFromRandom, generateDate } from '../utils';

const MIN_DESCRIPTIONS_COUNT = 1;
const MAX_DESCRIPTIONS_COUNT = 5;
const descriptionsCountRandom = getRandomInteger(MIN_DESCRIPTIONS_COUNT, MAX_DESCRIPTIONS_COUNT);

const MIN_OFFERS_COUNT = 0;
const MAX_OFFERS_COUNT = 5;
const offersCountRandom = getRandomInteger(MIN_OFFERS_COUNT, MAX_OFFERS_COUNT);

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

const POINTS_TYPES = [
  { 'type': 'taxi' },
  { 'type': 'bus' },
  { 'type': 'train' },
  { 'type': 'ship' },
  { 'type': 'transport' },
  { 'type': 'drive' },
  { 'type': 'flight' },
  { 'type': 'check-in' },
  { 'type': 'sightseeing' },
  { 'type': 'restaurant' },
];

const OFFERS = [
  {
    'title': 'Add luggage',
    'price': 30,
  }, {
    'title': 'Switch to comfort class',
    'price': 100,
  }, {
    'title': 'Add meal',
    'price': 15,
  }, {
    'title': 'Choose seats',
    'price': 5,
  }, {
    'title': 'Travel by train',
    'price': 40,
  },
];

export const generatePoint = function () {
  return {
    'basePrice': getRandomInteger(550, 1200),
    'dateFrom': generateDate(),
    'dateTo': generateDate(),
    'destination': getUniqueRandomFromRandom(DESCRIPTIONS, descriptionsCountRandom).join(' '),
    'id': nanoid(),
    'isFavorite': Boolean(getRandomInteger(0, 1)),
    'offers': getUniqueRandomFromRandom(OFFERS, offersCountRandom),
    'type': POINTS_TYPES[getRandomInteger(0, POINTS_TYPES.length - 1)],
  };
};
