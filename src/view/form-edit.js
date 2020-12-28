import SmartView from "./smart.js";
import dayjs from "dayjs";
import {TYPES, CITIES, OFFERS} from "../constants.js";
import {getAllCost} from "../utils/trip.js";
import {CITY} from "../mock/trip.js";
import flatpickr from "flatpickr";
import he from "he";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import {nanoid} from "nanoid";


const BLANK_TRIP = {
  id: nanoid(),
  start: dayjs(),
  end: dayjs(),
  type: TYPES[0],
  offers: {
    title: [OFFERS[0]],
    price: [100]
  },
  city: CITIES[0],
  cost: 0,
  total: 100,
  destination: {
    description: [],
    photos: []
  },
  duration: 0,
  destinationList: [`Tokyo`, `Konoha`, `Osaka`],
  isFaivorite: false
};

const pickersDelete = (...pickers) => {
  pickers.forEach((picker) => {
    if (picker) {
      picker.destroy();
      picker = null;
    }
  });
};

const createEventTypeItemsTemplate = (currentType, id) => {
  const types = TYPES.map((type) => `<div class="event__type-item">
            <input id="event-type-${type.toLowerCase()}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}"
             ${currentType === type ? `checked` : ``}>
            <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${id}">${type}</label>
          </div>`).join(``);

  return `
  <div class="event__type-wrapper">
  <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        <img class = "event__type-icon"
        width = "17"
        height = "17"
        src = "img/icons/${currentType}.png"
        alt = "Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
    <div class="event__type-list">
    <fieldset class="event__type-group">
     <legend class="visually-hidden">Event type</legend>
${types}
         </fieldset>
                    </div>
                  </div>`;
};

const renderOffersInTrip = (offers) => {
  let offer = ` `;
  const {title, price} = offers;

  for (let i = 0; i < title.length; i++) {
    offer += `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${i}" type="checkbox" name="event-offer-luggage" checked>
          <label class="event__offer-label" for="event-offer-luggage-${i}">
            <span class="event__offer-title">${title[i]}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price[i]}</span>
          </label>
        </div>`;
  }
  if (title.length > 0) {
    return ` <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offer}
    </div>
    </section>`;
  }
  return offer;
};

const renderPhotos = (photos) => {
  let photoTemplate = photos.map((photo) =>
    `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
  if (photos.length > 0) {
    return `<div class="event__photos-container">
        <div class="event__photos-tape">
        ${photoTemplate}
          </div>
      </div>`;
  }
  return ` `;

};

const renderDescript = (destination) => {
  const {
    description,
    photos
  } = destination;
  const destinationPhotos = renderPhotos(photos);
  if (description.length > 0) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description"> ${description.join(` `)} </p>
          ${destinationPhotos}
    </section>`;
  }
  return ` `;
};
const createDestinationListTemplate = (options) => {
  if (options === null) {
    return ``;
  }

  return options.map((option) => {
    return `<option value="${option}"></option>`;
  }).join(``);
};

const createFormEditPointOfTripTemplate = (trip) => {
  const {
    id,
    start,
    end,
    type,
    offers,
    city,
    cost,
    destination,
    destinationList
  } = trip;
  const starts = dayjs(start).format(`DD/MM/YY HH:MM`);
  const ends = dayjs(end).format(`DD/MM/YY HH:MM`);
  const destinationDescription = renderDescript(destination);
  const eventsType = createEventTypeItemsTemplate(type, id);
  const offersList = renderOffersInTrip(offers);
  const options = createDestinationListTemplate(destinationList);

  return `<li class="trip-events__item"><form class="event event--edit" action="#" method="post">
<header class="event__header">
  ${eventsType}
     <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                     ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${he.encode(city)}" list="destination-list-${id}" autocomplete="off">
                    <datalist id="destination-list-${id}">
                       ${options}
                    </datalist>
                  </div>
  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-${id}">From</label>
    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${starts}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-${id}">To</label>
    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${ends}">
  </div>
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-${id}">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${cost}" autocomplete="off">
  </div>
  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Delete</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</header>
<section class="event__details">
    ${offersList}
    ${destinationDescription}
</form>
</li> `;
};
export default class EditTrip extends SmartView {
  constructor(trip = BLANK_TRIP) {
    super();
    this._data = EditTrip.parseTripToData(trip);
    this._datepickerstart = null;
    this._datepickerend = null;
    this._onClickTripEdit = this._onClickTripEdit.bind(this);
    this._onFormSubmitSave = this._onFormSubmitSave.bind(this);
    this._onTypeOfTripClick = this._onTypeOfTripClick.bind(this);
    this._onDestinationInputChange = this._onDestinationInputChange.bind(this);
    this._onStartDateChange = this._onStartDateChange.bind(this);
    this._onEndDateChange = this._onEndDateChange.bind(this);
    this._onCostChange = this._onCostChange.bind(this);
    this._formOnDeleteClick = this._formOnDeleteClick.bind(this);
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setOnDeleteClick(this._callback.deleteClick);
  }

  removeElement() {
    super.removeElement();
    pickersDelete(this._datepickerstart, this._datepickerend);
  }

  reset(trip) {
    this.updateData(
        EditTrip.parseTripToData(trip)
    );
  }

  getTemplate() {
    return createFormEditPointOfTripTemplate(this._data);
  }

  _onClickTripEdit(evt) {
    evt.preventDefault();
    this._callback.editClick(EditTrip.parseDataToTrip(this._data));
  }

  setOnClickTripEdit(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onClickTripEdit);
  }

  _onFormSubmitSave(evt) {
    evt.preventDefault();
    this._callback.submitClick(EditTrip.parseDataToTrip(this._data));
  }

  setOnFormSubmitSave(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._onFormSubmitSave);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setOnFormSubmitSave(this._callback.submitClick);
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setOnClickTripEdit(this._callback.editClick);
  }

  _onTypeOfTripClick(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value
    });
  }

  _onDestinationInputChange(evt) {
    const newCity = evt.target.value;
    Object.assign({},
        this._data.destination,
        this._data.city,
        this._data.city = newCity,
        this._data.destination.description = CITY[newCity][0],
        this._data.destination.photos = CITY[newCity][1]);
    this.updateData(
        this._data.city,
        this._data.destination
    );
  }

  _onStartDateChange(userDate) {
    if (dayjs(userDate).toDate() > dayjs(this._datepickerend.selectedDates).toDate()) {
      this.updateData({
        start: dayjs(userDate).toDate(),
        end: dayjs(userDate).toDate()
      });
    } else {
      this.updateData({
        start: dayjs(userDate).toDate()
      });
    }
  }

  _setStartDatepicker() {
    if (this._datepickerstart) {
      this._datepickerstart.destroy();
      this._datepickerstart = null;
    }

    this._datepickerstart = flatpickr(
        this.getElement().querySelector(`#event-start-time-${this._data.id}`), {
          'enableTime': true,
          'time_24hr': true,
          'dateFormat': `d/m/Y H:i`,
          'defaultDate': this._data.start,
          'onClose': this._onStartDateChange
        }
    );
  }
  _onEndDateChange(userDate) {
    this.updateData({
      end: dayjs(userDate).toDate(),
      duration: dayjs(userDate).diff(dayjs(this._data.start), `minute`),
    });
  }

  _onCostChange(evt) {
    evt.preventDefault();
    const userDate = Number(evt.target.value);
    this.updateData({
      cost: userDate,
      total: getAllCost(userDate, this._data.offers)
    });

  }

  _setEndDatepicker() {
    if (this._datepickerend) {
      this._datepickerend.destroy();
      this._datepickerend = null;
    }

    this._datepickerend = flatpickr(
        this.getElement().querySelector(`#event-end-time-${this._data.id}`), {
          'enableTime': true,
          'time_24hr': true,
          'minDate': dayjs(this._data.start).valueOf(),
          'dateFormat': `d/m/Y H:i`,
          'defaultDate': this._data.end,
          'onClose': this._onEndDateChange
        }
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._onTypeOfTripClick);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._onDestinationInputChange);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._onCostChange);
  }

  _formOnDeleteClick(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditTrip.parseDataToTrip(this._data));
  }

  setOnDeleteClick(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formOnDeleteClick);
  }

  static parseTripToData(trip) {
    return JSON.parse(JSON.stringify(trip));
  }

  static parseDataToTrip(data) {
    return JSON.parse(JSON.stringify(data));
  }
}
