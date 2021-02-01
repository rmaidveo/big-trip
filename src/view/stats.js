import Abstract from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {BAR_HEIGHT} from "../constants.js";
import {getAllCost} from "../utils/trip.js";
import dayjs from "dayjs";
const MIN_IN_DAY = 24 * 60;

const getMoneyStats = (points, types) => {
  const result = new Map();

  types.forEach((type) => {
    const money = Object.values(points).reduce((accumulator, currentPoint) => {
      let accumulatorResult = accumulator;
      if (currentPoint.type === type.toLowerCase()) {
        accumulatorResult += getAllCost(currentPoint.cost, currentPoint.offers);
      }
      return accumulatorResult;
    }, 0);

    if (money > 0) {
      result.set(type.toUpperCase(), money);
    }
  });

  return result;
};
const getTypeStats = (points, types) => {
  const result = new Map();

  types.forEach((type) => {
    const times = Object.values(points).reduce((accumulator, currentPoint) => {
      let accumulatorResult = accumulator;
      if (currentPoint.type === type.toLowerCase()) {
        accumulatorResult++;
      }
      return accumulatorResult;
    }, 0);

    if (times > 0) {
      result.set(type.toUpperCase(), times);
    }
  });

  return result;
};
const getSpendTimeStats = (points, types) => {
  const result = new Map();

  types.forEach((type) => {
    const minutes = Object.values(points).reduce((accumulator, currentPoint) => {
      let accumulatorResult = accumulator;
      if (currentPoint.type === type.toLowerCase()) {
        accumulatorResult += dayjs(currentPoint.end).diff(dayjs(currentPoint.start), `minute`);
      }
      return accumulatorResult;
    }, 0);

    const days = (minutes / MIN_IN_DAY).toFixed();
    if (days > 0) {
      result.set(type.toUpperCase(), days);
    }
  });

  return result;
};

const renderMoneyChart = (ctx, points, types) => {
  const typeMoney = getMoneyStats(points, types);
  const data = Array.from(typeMoney.keys());
  const values = Array.from(typeMoney.values());
  ctx.height = BAR_HEIGHT * data.length;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data,
      datasets: [{
        data: values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          dataset: {
            barThickness: 44
          }
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
          dataset: {
            minBarLength: 50
          }
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
};

const renderTimeChart = (ctx, points, types) => {
  const typeTime = getSpendTimeStats(points, types);
  const data = Array.from(typeTime.keys());
  const values = Array.from(typeTime.values());
  ctx.height = BAR_HEIGHT * data.length;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data,
      datasets: [{
        data: values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}D`,
        },
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          dataset: {
            barThickness: 44
          }
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
          dataset: {
            minBarLength: 50
          }
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
};
const renderTypeChart = (ctx, points, types) => {
  const typeType = getTypeStats(points, types);
  const data = Array.from(typeType.keys());
  const values = Array.from(typeType.values());
  ctx.height = BAR_HEIGHT * data.length;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: data,
      datasets: [{
        data: values,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          dataset: {
            barThickness: 44
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          dataset: {
            minBarLength: 50
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatsTemplate = () => {
  return `<section class="statistics">
<h2 class="visually-hidden">Trip statistics</h2>
<div class="statistics__item statistics__item--money">
  <canvas class="statistics__chart  statistics__chart--money" width="900"> </canvas>
</div>
<div class="statistics__item statistics__item--transport">
  <canvas class="statistics__chart  statistics__chart--transport" width="900"> </canvas>
</div>
<div class="statistics__item statistics__item--time-spend">
  <canvas class="statistics__chart  statistics__chart--time" width="900"> </canvas>
</div>
</section>`;
};

export default class Stats extends Abstract {
  constructor(points, offersModel) {
    super();
    this._offersList = offersModel.getOffers();
    this._points = points.slice();
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
    this.hide();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  getTypes() {
    return this._offersList.map((i) =>{
      return Object.values(i)[0];
    });
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    this._moneyChart = renderMoneyChart(moneyCtx, this._points, this.getTypes());
    this._typeChart = renderTypeChart(typeCtx, this._points, this.getTypes());
    this._timeChart = renderTimeChart(timeCtx, this._points, this.getTypes());
  }
}
