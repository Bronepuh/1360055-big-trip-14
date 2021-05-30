import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
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

  return dayjs(diffB).diff(dayjs(diffA));
};

export const sortPointPrice = (pointA, pointB) => {
  return dayjs(pointB.basePrice).diff(dayjs(pointA.basePrice));
};
