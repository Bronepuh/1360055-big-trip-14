import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const countMoney = function (points) {

  const money = {
    taxi: 0,
    bus: 0,
    train: 0,
    ship: 0,
    transport: 0,
    drive: 0,
    flight: 0,
    sightseeing: 0,
    restaurant: 0,
    'check-in': 0,
  };

  points.forEach((element) => {
    const type = element.type;
    money[type] = money[type] + Number(element.basePrice);
  });
  return money;
};

export const countType = function (points) {

  const types = {
    taxi: 0,
    bus: 0,
    train: 0,
    ship: 0,
    transport: 0,
    drive: 0,
    flight: 0,
    sightseeing: 0,
    restaurant: 0,
    'check-in': 0,
  };

  points.forEach((element) => {
    const type = element.type;
    types[type] = types[type] + 1;
  });
  return types;
};

export const countTime = function (points) {

  const time = {
    taxi: 0,
    bus: 0,
    train: 0,
    ship: 0,
    transport: 0,
    drive: 0,
    flight: 0,
    sightseeing: 0,
    restaurant: 0,
    'check-in': 0,
  };

  points.forEach((element) => {
    const from = dayjs(element.dateFrom);
    const to = dayjs(element.dateTo);
    const diff = to.diff(from, 'ms');
    const type = element.type;
    time[type] = time[type] + diff;
  });
  return time;
};
