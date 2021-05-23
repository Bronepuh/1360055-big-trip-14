import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const countMoney = function (points) {

  const MONEY = {
    taxi: Number(0),
    bus: Number(0),
    train: Number(0),
    ship: Number(0),
    transport: Number(0),
    drive: Number(0),
    flight: Number(0),
    sightseeing: Number(0),
    restaurant: Number(0),
    'check-in': Number(0),
  };

  points.forEach((element) => {
    const type = element.type;
    MONEY[type] = Number(MONEY[type] + element.basePrice);
  });
  return MONEY;
};

export const countType = function (points) {

  const TYPE = {
    taxi: Number(0),
    bus: Number(0),
    train: Number(0),
    ship: Number(0),
    transport: Number(0),
    drive: Number(0),
    flight: Number(0),
    sightseeing: Number(0),
    restaurant: Number(0),
    'check-in': Number(0),
  };

  points.forEach((element) => {
    const type = element.type;
    TYPE[type] = TYPE[type] + 1;
  });
  return TYPE;
};

export const countTime = function (points) {

  const TIME = {
    taxi: Number(0),
    bus: Number(0),
    train: Number(0),
    ship: Number(0),
    transport: Number(0),
    drive: Number(0),
    flight: Number(0),
    sightseeing: Number(0),
    restaurant: Number(0),
    'check-in': Number(0),
  };

  points.forEach((element) => {
    const from = dayjs(element.dateFrom);
    const to = dayjs(element.dateTo);
    const diff = to.diff(from, 'ms');
    const type = element.type;
    TIME[type] = TIME[type] + diff;
  });
  return TIME;
};
