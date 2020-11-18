import {
  createSiteMenuTemplate
} from "./view/site-menu.js";
import {
  createSiteFilterTemplate
} from "./view/site-filter.js";
import {
  createTripInfoTemplate
} from "./view/trip-info.js";
import {
  createSortTripTemplate
} from "./view/site-sort.js";
import {
  createTripEventsListTemplate
} from "./view/trip-list";
import {
  createFormEditPointOfTripTemplate
} from "./view/form-edit";
import {
  createTripEventsListItemTemplate
} from "./view/trip-list-items";


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const EVENTS_COUNT = 3;

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMenuHeaderElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMenuMainHeaderElement = siteHeaderElement.querySelector(`.trip-main`);

render(siteMenuMainHeaderElement, createTripInfoTemplate(), `afterbegin`);
render(siteMenuHeaderElement, createSiteMenuTemplate(), `afterbegin`);
render(siteMenuHeaderElement, createSiteFilterTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.page-main`);
const siteSortTripEvents = siteMainElement.querySelector(`.trip-events`);

render(siteSortTripEvents, createSortTripTemplate(), `afterbegin`);
render(siteSortTripEvents, createTripEventsListTemplate(), `beforeend`);

const tripEventListElement = siteSortTripEvents.querySelector(`.trip-events__list`);

render(tripEventListElement, createFormEditPointOfTripTemplate(), `afterbegin`);
for (let i = 0; i < EVENTS_COUNT; i++) {
  render(tripEventListElement, createTripEventsListItemTemplate(), `beforeend`);
}
