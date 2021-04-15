import { nanoid } from 'nanoid';
import { getRandomInteger, getUniqueRandomFromRandom, generateDate } from '../utils';

const MIN_DESCRIPTIONS_COUNT = 1;
const MAX_DESCRIPTIONS_COUNT = 5;

const MIN_OFFERS_COUNT = 0;

const MIN_PICTURES_COUNT = 1;
const MAX_PICTURES_COUNT = 5;
const MAX_PICTURES_URL_NUMBER = 50;

const PICTURE_URL = 'http://picsum.photos/248/152?r=.jpg';

const getPictureArray = function (count) {
  const pictures = [];
  for (let i = 0; i < count; i++) {
    pictures.push(PICTURE_URL.replace(`?r=`, `?r=${i}`));
  }
  return pictures
};

const getRandomPictureCount = function () {
  const pictureArray = getPictureArray(MAX_PICTURES_URL_NUMBER);
  const randomPictureArray = getUniqueRandomFromRandom(pictureArray, getRandomInteger(MIN_PICTURES_COUNT, MAX_PICTURES_COUNT));
  return randomPictureArray;
};

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

export const POINTS_TYPES = [
  {
    'type': 'taxi',
    'offers': [
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
      },
    ],
  },
  {
    'type': 'bus',
    'offers': [
      {
        'title': 'Add luggage',
        'price': 30,
      }, {
        'title': 'Switch to comfort class',
        'price': 100,
      }, {
        'title': 'Add meal',
        'price': 15,
      },
    ],
  },
  {
    'type': 'train',
    'offers': [
      {
        'title': 'Add luggage',
        'price': 30,
      },
    ],
  },
  {
    'type': 'ship',
    'offers': [
      {
        'title': 'Add luggage',
        'price': 30,
      }, {
        'title': 'Switch to comfort class',
        'price': 100,
      },
    ],
  },
  {
    'type': 'transport',
    'offers': [
      {
        'title': 'Add luggage',
        'price': 30,
      }, {
        'title': 'Switch to comfort class',
        'price': 100,
      }, {
        'title': 'Add meal',
        'price': 15,
      },
    ],
  },
  {
    'type': 'drive',
    'offers': [
      {
        'title': 'Add luggage',
        'price': 30,
      }, {
        'title': 'Switch to comfort class',
        'price': 100,
      },
    ],
  },
  {
    'type': 'flight',
    'offers': [
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
    ],
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'title': 'Add luggage',
        'price': 30,
      },
    ],
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'title': 'Add luggage',
        'price': 30,
      }, {
        'title': 'Switch to comfort class',
        'price': 100,
      },
      {
        'title': 'Travel by train',
        'price': 40,
      },
    ],
  },
  {
    'type': 'restaurant',
    'offers': [
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
      },
    ],
  },
];

export const generatePoint = function () {
  const newType = POINTS_TYPES[getRandomInteger(0, POINTS_TYPES.length - 1)];
  const checkedOffers = getUniqueRandomFromRandom(newType.offers, getRandomInteger(MIN_OFFERS_COUNT, newType.offers.length));

  return {
    'basePrice': getRandomInteger(550, 1200),
    'dateFrom': generateDate(),
    'dateTo': generateDate(),
    'destination': getUniqueRandomFromRandom(DESCRIPTIONS, getRandomInteger(MIN_DESCRIPTIONS_COUNT, MAX_DESCRIPTIONS_COUNT)).join(' '),
    'id': nanoid(),
    'isFavorite': Boolean(getRandomInteger(0, 1)),
    'offers': checkedOffers,
    'type': newType.type,
    'pictures': getRandomPictureCount(),
  };
};
