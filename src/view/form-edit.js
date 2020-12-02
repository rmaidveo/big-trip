import dayjs from "dayjs";
import {TYPES, CITIES, OFFERS} from "../constants.js";
import {createElement} from "../utils.js";

const BLANK_TRIP = {
  start: dayjs().format(`DD/MM/YY HH:MM`),
  end: dayjs().format(`DD/MM/YY HH:MM`),
  type: TYPES[0],
  offers: {
    title: OFFERS[0],
    price: 0
  },
  city: CITIES[0],
  cost: 0,
  destination: {
    description: [],
    photos: []
  }
};

const createEventTypeItemsTemplate = () => {
  return TYPES.map((type) => `<div class="event__type-item">
            <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
            <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
          </div>`).join(``);
};
const createEventTypeItems = createEventTypeItemsTemplate();

const createEventTypeListItemsTemplate = (type) => {
  return `<label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
${createEventTypeItems}
        </fieldset>
      </div>`;
};
const renderOffersInTrip = (offers) => {
  let offer = ``;
  for (let i = 0; i < offers.title.length; i++) {
    offer += `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offers.title[i]}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offers.price[i]}</span>
          </label>
        </div>`;
  }
  return offer;
};
const renderPhotos = (photos) => {
  let photo = ``;
  for (let i = 0; i < photos.length; i++) {
    photo += ` <img class="event__photo" src="${photos[i]}" alt="Event photo">`;
  }
  return photo;
};

const createFormEditPointOfTripTemplate = (trip) => {
  const {start, end, type, offers, city, cost, destination} = trip;
  const starts = dayjs(start).format(`DD/MM/YY HH:MM`);
  const ends = dayjs(end).format(`DD/MM/YY HH:MM`);
  const destDescript = destination.description.join(` `);
  const destinationPhotos = renderPhotos(destination.photos);
  const destinationDescription = destination.description === 0 && destinationPhotos.length === 0 ? `` :
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description"> ${destDescript} </p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destinationPhotos}
        </div>
      </div>
    </section>`;

  const eventsType = createEventTypeListItemsTemplate(type);
  const offersList = renderOffersInTrip(offers);

  return `<li class="trip-events__item"><form class="event event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
  ${eventsType}
  </div>
  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
     ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
  </div>
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${starts}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ends}">
  </div>
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
  </div>
  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Delete</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</header>
<section class="event__details">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offersList}
    </div>
    </section>
    ${destinationDescription}
</section>
</form>
</li> `;
};
export default class EditTrip {
  constructor(trip = BLANK_TRIP) {
    this._element = null;
    this._trip = trip;
  }

  getTemplate() {
    return createFormEditPointOfTripTemplate(this._trip);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
