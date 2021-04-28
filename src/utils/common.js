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

// обновление точки маршрута
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortPointUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  if (weight !== null) {
    return weight;
  }

  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

export const sortPointDown = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  if (weight !== null) {
    return weight;
  }

  return dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
};
