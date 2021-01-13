import SiteMenu from "./view/site-menu.js";
import {remove, render, RenderPosition} from "./utils/render.js";
import {generateTrip} from "./mock/trip.js";
import TripBoard from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import Points from "./model/points.js";
import Filter from "./model/filter.js";
import {MenuItem} from "./constants.js";
import Stats from "./view/stats.js";

const EVENTS_COUNT = 5;
const events = new Array(EVENTS_COUNT).fill().map(generateTrip);

const tripsModel = new Points();
const filterModel = new Filter();
const siteHeaderElement = document.querySelector(`.page-header`);
const sitePageMainElement = document.querySelector(`.page-main .page-body__container`);
const siteMenuHeaderElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMenuMainHeaderElement = siteHeaderElement.querySelector(`.trip-main`);
const siteSortTripEvents = document.querySelector(`.trip-events`);
const tripBoard = new TripBoard(siteMenuMainHeaderElement, siteSortTripEvents, tripsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMenuHeaderElement, filterModel, tripsModel);
const siteMenuComponent = new SiteMenu();
let stats = null;

const onSiteMenuClick = (menuItem) => {
  menuItem = menuItem.textContent;
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(stats);
      tripBoard.show();
      break;
    case MenuItem.STATS:
      tripBoard.hide();
      stats = new Stats(events);
      render(sitePageMainElement, stats, RenderPosition.AFTERBEGIN);
      break;
  }
};

render(siteMenuHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
siteMenuComponent.setMenuClick(onSiteMenuClick);

filterPresenter.init();
tripsModel.setPoints(events);
tripBoard.init();
document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripBoard.createPoint();
});
