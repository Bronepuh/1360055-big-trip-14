import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const countMoney = function (points) {
  const money = [
    ['taxi', 0],
    ['bus', 0],
    ['train', 0],
    ['ship', 0],
    ['transport', 0],
    ['drive', 0],
    ['flight', 0],
    ['sightseeing', 0],
    ['restaurant', 0],
    ['check-in', 0],
  ];

  points.forEach((point) => {
    if (point.type === 'taxi') {
      money[0][1] += point.basePrice;
    }
    if (point.type === 'bus') {
      money[1][1] += point.basePrice;
    }
    if (point.type === 'train') {
      money[2][1] += point.basePrice;
    }
    if (point.type === 'ship') {
      money[3][1] += point.basePrice;
    }
    if (point.type === 'transport') {
      money[4][1] += point.basePrice;
    }
    if (point.type === 'drive') {
      money[5][1] += point.basePrice;
    }
    if (point.type === 'flight') {
      money[6][1] += point.basePrice;
    }
    if (point.type === 'sightseeing') {
      money[7][1] += point.basePrice;
    }
    if (point.type === 'restaurant') {
      money[8][1] += point.basePrice;
    }
    if (point.type === 'check-in') {
      money[9][1] += point.basePrice;
    }
  });
  return money;
};

export const countType = function (points) {

  const types = [
    ['taxi', 0],
    ['bus', 0],
    ['train', 0],
    ['ship', 0],
    ['transport', 0],
    ['drive', 0],
    ['flight', 0],
    ['sightseeing', 0],
    ['restaurant', 0],
    ['check-in', 0],
  ];

  points.forEach((point) => {
    if (point.type === 'taxi') {
      types[0][1] += 1;
    }
    if (point.type === 'bus') {
      types[1][1] += 1;
    }
    if (point.type === 'train') {
      types[2][1] += 1;
    }
    if (point.type === 'ship') {
      types[3][1] += 1;
    }
    if (point.type === 'transport') {
      types[4][1] += 1;
    }
    if (point.type === 'drive') {
      types[5][1] += 1;
    }
    if (point.type === 'flight') {
      types[6][1] += 1;
    }
    if (point.type === 'sightseeing') {
      types[7][1] += 1;
    }
    if (point.type === 'restaurant') {
      types[8][1] += 1;
    }
    if (point.type === 'check-in') {
      types[9][1] += 1;
    }
  });
  return types;
};

export const countTime = function (points) {

  const time = [
    ['taxi', 0],
    ['bus', 0],
    ['train', 0],
    ['ship', 0],
    ['transport', 0],
    ['drive', 0],
    ['flight', 0],
    ['sightseeing', 0],
    ['restaurant', 0],
    ['check-in', 0],
  ];

  points.forEach((point) => {
    const from = dayjs(point.dateFrom);
    const to = dayjs(point.dateTo);
    const diff = to.diff(from, 'ms');

    if (point.type === 'taxi') {
      time[0][1] += diff;
    }
    if (point.type === 'bus') {
      time[1][1] += diff;
    }
    if (point.type === 'train') {
      time[2][1] += diff;
    }
    if (point.type === 'ship') {
      time[3][1] += diff;
    }
    if (point.type === 'transport') {
      time[4][1] += diff;
    }
    if (point.type === 'drive') {
      time[5][1] += diff;
    }
    if (point.type === 'flight') {
      time[6][1] += diff;
    }
    if (point.type === 'sightseeing') {
      time[7][1] += diff;
    }
    if (point.type === 'restaurant') {
      time[8][1] += diff;
    }
    if (point.type === 'check-in') {
      time[9][1] += diff;
    }
  });
  return time;
};
