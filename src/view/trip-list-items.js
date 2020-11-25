import dayjs from "dayjs";
import {TIME_IN_MIN} from "../constants.js";

const appendZero = (value) => String(value).padStart(2, `0`);

const getAllCost = (cost, offers) => {
  let allcost = cost;
  for (let i = 0; i < offers.price.length; i++) {
    allcost += offers.price[i];
  }
  return allcost;
};

const createDuration = (duration) => {
  let durationString = ``;
  let minutes = duration;
  let hours = minutes / TIME_IN_MIN.HOUR;
  let days = hours / TIME_IN_MIN.DAY;
  days = appendZero(Math.floor(hours / TIME_IN_MIN.DAY));
  hours = appendZero(Math.round(hours % TIME_IN_MIN.DAY));
  minutes = appendZero(Math.round(minutes % TIME_IN_MIN.HOUR));
  if (duration >= TIME_IN_MIN.MAXMIN) {
    durationString = `${days}D ${hours}H ${minutes}M`;
  }
  if (duration < TIME_IN_MIN.MAXMIN) {
    durationString = `${hours}H ${minutes}M`;
  }
  if (duration < TIME_IN_MIN.HOUR) {
    durationString = `${minutes}M`;
  }
  return durationString;
};

const createOffers = (offers) => {
  let listOfOffers = ``;
  if (offers.title.length > 0) {
    for (let i = 0; i < offers.title.length; i++) {
      if (!listOfOffers.includes(offers.title[i])) {
        listOfOffers += `<li class="event__offer">
  <span class="event__offer-title">${offers.title[i]}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offers.price[i]}</span>
  </li> `;
      }
    }
  }
  return listOfOffers;
};

export const createTripEventsListItemTemplate = (trip) => {
  const {
    start,
    type,
    city,
    duration,
    cost,
    end,
    offers,
    isFavorite
  } = trip;
  const date = dayjs(start).format(`MMM DD`);
  const timeStart = dayjs(start).format(`HH:mm`);
  const timeEnd = dayjs(end).format(`HH:mm`);
  const favorite = isFavorite ? `event__favorite-btn--active` : ``;
  const durationStrings = createDuration(duration);
  const offer = createOffers(offers);
  const allCost = getAllCost(cost, offers);

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${start}">${date}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title"> ${type} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T12:25">${timeStart}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T13:35">${timeEnd}</time>
      </p>
      <p class="event__duration"> ${durationStrings}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${allCost}</span>
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
