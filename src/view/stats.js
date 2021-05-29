import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import { countMoney, countType, countTime } from '../utils/stats';

const BAR_HEIGHT = 55;

const renderMoneyChart = (moneyCtx, points) => {
  // Функция для отрисовки графика по цветам
  const money = countMoney(points);

  moneyCtx.height = BAR_HEIGHT * 9;
  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE', 'FLIGHT', 'SIGHTSEEING', 'RESTAURANT', 'CHECK-IN'],
      datasets: [{
        data: [money.taxi, money.bus, money.train, money.ship, money.transport, money.drive, money.flight, money.sightseeing, money.restaurant, money['check-in']],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          // barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          // minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return moneyChart;
};

const renderTypeChart = (typeCtx, points) => {
  const types = countType(points);

  typeCtx.height = BAR_HEIGHT * 9;

  const typeChart = new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE', 'FLIGHT', 'SIGHTSEEING', 'RESTAURANT', 'CHECK-IN'],
      datasets: [{
        data: [types.taxi, types.bus, types.train, types.ship, types.transport, types.drive, types.flight, types.sightseeing, types.restaurant, types['check-in']],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          // barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          // minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return typeChart;
};


const renderTimeChart = (timeCtx, points) => {
  // Функция для отрисовки графика по цветам
  const time = countTime(points);

  timeCtx.height = BAR_HEIGHT * 9;
  const timeChart = new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE', 'FLIGHT', 'SIGHTSEEING', 'RESTAURANT', 'CHECK-IN'],
      datasets: [{
        data: [time.taxi, time.bus, time.train, time.ship, time.transport, time.drive, time.flight, time.sightseeing, time.restaurant, time['check-in']],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        minBarLength: 50,
        barThickness: 44,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: function (val) {
            const duration = dayjs.duration(val);
            const years = duration.years();
            const days = duration.days();
            const hours = duration.hours();
            const minutes = duration.minutes();
            const getFormat = function (years, days, hours, minutes) {
              let durationFormated = '';
              if (years > 0) {
                durationFormated += years + 'Y';
              }
              if (days > 0) {
                durationFormated += ' ' + days + 'D';
              }
              if (hours > 0) {
                durationFormated += ' ' + hours + 'H';
              }
              if (minutes > 0) {
                durationFormated += ' ' + minutes + 'm';
              }
              if (minutes === 0) {
                durationFormated += '0';
              }
              return durationFormated;
            };
            const format = getFormat(years, days, hours, minutes);
            return `${format}`;
          },
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          // barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          // minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return timeChart;
};

const createStatisticsTemplate = () => {

  return `<div class="page-body__container">

  <section class="trip-events  trip-events--hidden">
    <h2 class="visually-hidden">Trip events</h2>
  </section>

  <section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart statistics__chart--money canvas-money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart statistics__chart--transport canvas-types" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart statistics__chart--time canvas-time" width="900"></canvas>
    </div>
  </section>
</div>`;
};

export default class Stats extends SmartView {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;


    this._moneyCart = null;
    this._timeChart = null;
    this._typeCart = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  updateChart() {
    const points = this._pointsModel.getPoints();

    if (this._moneyCart !== null) {
      this._moneyCart = null;
      this._timeChart = null;
      this._typeCart = null;
    }
    const moneyCtx = this.getElement().querySelector('.canvas-money');
    const typeCtx = this.getElement().querySelector('.canvas-types');
    const timeCtx = this.getElement().querySelector('.canvas-time');

    this._moneyCart = renderMoneyChart(moneyCtx, points);
    this._typeCart = renderTypeChart(typeCtx, points);
    this._timeChart = renderTimeChart(timeCtx, points);
  }
}

