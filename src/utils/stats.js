import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const countMoney = function (points) {
  const money = {
    'taxi': 0,
    'bus': 0,
    'train': 0,
    'ship': 0,
    'transport': 0,
    'drive': 0,
    'flight': 0,
    'sightseeing': 0,
    'restaurant': 0,
    'check-in': 0,
  };

  points.forEach((point) => {
    money[point.type] += point.basePrice;
  });
  const sortedMoney = Object.entries(money);
  sortedMoney.sort((a, b) => b[1] - a[1]);
  return sortedMoney;
};

export const countType = function (points) {

  const types = {
    'taxi': 0,
    'bus': 0,
    'train': 0,
    'ship': 0,
    'transport': 0,
    'drive': 0,
    'flight': 0,
    'sightseeing': 0,
    'restaurant': 0,
    'check-in': 0,
  };

  points.forEach((point) => {
    types[point.type] += 1;
  });
  const sortedTypes = Object.entries(types);
  sortedTypes.sort((a, b) => b[1] - a[1]);
  return sortedTypes;
};

export const countTime = function (points) {

  const time = {
    'taxi': 0,
    'bus': 0,
    'train': 0,
    'ship': 0,
    'transport': 0,
    'drive': 0,
    'flight': 0,
    'sightseeing': 0,
    'restaurant': 0,
    'check-in': 0,
  };

  points.forEach((point) => {
    const from = dayjs(point.dateFrom);
    const to = dayjs(point.dateTo);
    const diff = to.diff(from, 'ms');
    time[point.type] += diff;
  });
  const sortedTime = Object.entries(time);
  sortedTime.sort((a, b) => b[1] - a[1]);
  return sortedTime;
};
