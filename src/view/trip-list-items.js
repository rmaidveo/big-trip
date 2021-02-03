import dayjs from "dayjs";
import Abstract from "./abstract.js";
import {getAllCost, generateDuration} from "../utils/trip.js";
import {TimeFormat, BLANK_TRIP} from "../constants.js";

const appendZero = (value) => String(value).padStart(2, `0`);

const createDuration = (duration) => {
  let durationString = ``;
  let minutes = duration;
  let hours = minutes / TimeFormat.HOUR;
  let days = hours / TimeFormat.DAY;
  days = appendZero(Math.floor(hours / TimeFormat.DAY));
  hours = appendZero(Math.round(hours % TimeFormat.DAY));
  minutes = appendZero(Math.round(minutes % TimeFormat.HOUR));
  if (duration >= TimeFormat.MAXMIN) {
    durationString = `${days}D ${hours}H ${minutes}M`;
  }
  if (duration < TimeFormat.MAXMIN) {
    durationString = `${hours}H ${minutes}M`;
  }
  if (duration < TimeFormat.HOUR) {
    durationString = `${minutes}M`;
  }
  return durationString;
};

const createOffers = (offers) => {
  let listOfOffers = ``;
  if (offers.titles.length > 0) {
    for (let i = 0; i < offers.titles.length; i++) {
      if (!listOfOffers.includes(offers.titles[i])) {
        listOfOffers += `<li class="event__offer">
  <span class="event__offer-title">${offers.titles[i]}</span>
    &plus;&euro;&nbsp;<span class="event__offer-price">${offers.prices[i]}</span>
  </li> `;
      }
    }
  }
  return listOfOffers;
};

const createTripEventsListItemTemplate = (trip) => {
  const {start, type, end, cost, offers, destination, isFavorite} = trip;
  const date = dayjs(start).format(`MMM DD`);
  const timeStart = dayjs(start).format(`HH:mm`);
  const timeEnd = dayjs(end).format(`HH:mm`);
  const favorite = isFavorite ? `event__favorite-btn--active` : ``;
  const duration = generateDuration(start, end);
  const durationStrings = createDuration(duration);
  const offer = createOffers(offers);
  const total = getAllCost(cost, offers);
  const city = destination.city;

  return `<li class="trip-events__item">

  <div class="event">
    <time class="event__date" datetime="${start}">${date}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title"> ${type} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${start}">${timeStart}</time>
        &mdash;
        <time class="event__end-time" datetime="${end}">${timeEnd}</time>
      </p>
      <p class="event__duration"> ${durationStrings}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${total}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
   ${offer}
    </ul>
  <button class="event__favorite-btn ${favorite}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};
export default class TripListItems extends Abstract {
  constructor(trip = BLANK_TRIP) {
    super();
    this._trip = trip;
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onClickTripPoint = this._onClickTripPoint.bind(this);
  }

  getTemplate() {
    return createTripEventsListItemTemplate(this._trip);
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }


  _onClickTripPoint(evt) {
    evt.preventDefault();
    this._callback.pointClick();
  }

  setOnFavoriteClick(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._onFavoriteClick);
  }

  setOnClickTripPoint(callback) {
    this._callback.pointClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onClickTripPoint);
  }

}
