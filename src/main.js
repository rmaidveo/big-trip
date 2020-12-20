import SiteMenu from "./view/site-menu.js";
import SiteFilter from "./view/site-filter.js";
import {render, RenderPosition} from "./utils/render.js";
import {generateTrip} from "./mock/trip.js";
import {generateFilter} from "./mock/filter.js";
import TripBoard from "./presenter/trip.js";

const EVENTS_COUNT = 15;
const events = new Array(EVENTS_COUNT).fill().map(generateTrip);
const filters = generateFilter(events);
const siteHeaderElement = document.querySelector(`.page-header`);
const siteMenuHeaderElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMenuMainHeaderElement = siteHeaderElement.querySelector(`.trip-main`);
const siteSortTripEvents = document.querySelector(`.trip-events`);
const tripBoard = new TripBoard(siteMenuMainHeaderElement, siteSortTripEvents);

render(siteMenuHeaderElement, new SiteMenu(), RenderPosition.BEFOREEND);
render(siteMenuHeaderElement, new SiteFilter(filters), RenderPosition.BEFOREEND);
tripBoard.init(events);
