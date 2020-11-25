import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createSortTripTemplate} from "./view/site-sort.js";
import {createTripEventsListTemplate} from "./view/trip-list";
import {createFormNewPointOfTripTemplate} from "./view/form-new-point";
import {createTripEventsListItemTemplate} from "./view/trip-list-items";
import {generateTrip} from "./mock/trip.js";
import {generateFilter} from "./mock/filter.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const EVENTS_COUNT = 15;
const events = new Array(EVENTS_COUNT).fill().map(generateTrip);
const filters = generateFilter(events);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMenuHeaderElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMenuMainHeaderElement = siteHeaderElement.querySelector(`.trip-main`);

render(siteMenuMainHeaderElement, createTripInfoTemplate(events[0]), `afterbegin`);
render(siteMenuHeaderElement, createSiteMenuTemplate(), `afterbegin`);
render(siteMenuHeaderElement, createSiteFilterTemplate(filters), `beforeend`);

const siteMainElement = document.querySelector(`.page-main`);
const siteSortTripEvents = siteMainElement.querySelector(`.trip-events`);

render(siteSortTripEvents, createSortTripTemplate(), `afterbegin`);
render(siteSortTripEvents, createTripEventsListTemplate(), `beforeend`);

const tripEventListElement = siteSortTripEvents.querySelector(`.trip-events__list`);

render(tripEventListElement, createFormNewPointOfTripTemplate(events[1]), `afterbegin`);
for (let i = 2; i < EVENTS_COUNT; i++) {
  render(tripEventListElement, createTripEventsListItemTemplate(events[i]), `beforeend`);
}
