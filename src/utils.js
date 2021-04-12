import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// тасование Фишера — Йетса
const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const gap = function (array, maxCount) {
  return array.slice(0, maxCount);
};

export const getUniqueRandomFromRandom = function (array, maxCount) {
  shuffle(array);
  return gap(array, maxCount);
};

// вычмсление продолжительности эвента
let startTime = 0;

export const generateDate = () => {
  let duration = 0;
  const MAX_TIME_GAP = 2880;
  const newTimeGap = startTime + MAX_TIME_GAP;
  const minutesGap = getRandomInteger(startTime, newTimeGap);
  duration = newTimeGap - minutesGap;
  startTime += duration;
  return dayjs().add(startTime, 'minute').toDate();
};
