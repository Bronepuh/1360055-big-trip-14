import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getUniqueRandomFromRandom = (arr, minCount, maxCount) => {
  const randomCount = getRandomInteger(minCount, maxCount);
  const newArr = [];

  const getRandomElements = function () {
    for (let i = 0; i < randomCount; i++) {
      let randomElement = arr[getRandomInteger(0, arr.length - 1)];
      while (newArr.includes(randomElement)) {
        randomElement = arr[getRandomInteger(0, arr.length - 1)];
        if (newArr.length == arr.length) {
          throw Error('Warning!!! бесконечный цикл detected!!!');
        }
      }
      newArr.push(randomElement);
    }
  };
  getRandomElements();
  return newArr;
};

// вычмсление продолжительности эвента
let startTime = 0;
let duration = 0;

export const generateDate = () => {
  const MAX_TIME_GAP = 2880;
  const newTimeGap = startTime + MAX_TIME_GAP;
  const minutesGap = getRandomInteger(startTime, newTimeGap);
  duration = newTimeGap - minutesGap;
  startTime += duration;
  return dayjs().add(startTime, 'minute').toDate();
};
