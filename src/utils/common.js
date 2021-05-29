import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// тасование Фишера — Йетса
const shuffle = function (array) {
  const newArray = array.slice(0);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const gap = function (array, maxCount) {
  return array.slice(0, maxCount);
};

export const getUniqueRandomFromRandom = function (array, maxCount) {
  const shaffledArray = shuffle(array);
  return gap(shaffledArray, maxCount);
};

// вычисление продолжительности эвента
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

export const sortPointDay = (pointA, pointB) => {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

export const filterPointEverything = () => {
  return true;
};

export const filterPointFuture = (point) => {
  return point.dateFrom > dayjs();
};

export const filterPointPast = (point) => {
  return point.dateFrom < dayjs();
};

export const sortPointTime = (pointA, pointB) => {

  const fromA = dayjs(pointA.dateFrom);
  const toA = dayjs(pointA.dateTo);
  const diffA = toA.diff(fromA, 'minutes');

  const fromB = dayjs(pointB.dateFrom);
  const toB = dayjs(pointB.dateTo);
  const diffB = toB.diff(fromB, 'minutes');

  return dayjs(diffA).diff(dayjs(diffB));
};

export const sortPointPrice = (pointA, pointB) => {
  return dayjs(pointA.basePrice).diff(dayjs(pointB.basePrice));
};
