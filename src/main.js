import SiteMenu from "./view/site-menu.js";
import {remove, render, RenderPosition} from "./utils/render.js";
import TripBoard from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import Points from "./model/points.js";
import Filter from "./model/filter.js";
import Offers from "./model/offers.js";
import Destinations from "./model/destination.js";
import {MenuItem, UpdateType} from "./constants.js";
import Stats from "./view/stats.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic pQdgkWsrfRqm`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/.`;
const tripsModel = new Points();
const filterModel = new Filter();
const offersModel = new Offers();
const destinationsModel = new Destinations();

const siteHeaderElement = document.querySelector(`.page-header`);
const sitePageMainElement = document.querySelector(`.page-main .page-body__container`);
const siteMenuHeaderElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMenuMainHeaderElement = siteHeaderElement.querySelector(`.trip-main`);
const siteSortTripEvents = document.querySelector(`.trip-events`);
const api = new Api(END_POINT, AUTHORIZATION);
const tripBoard = new TripBoard(siteMenuMainHeaderElement, siteSortTripEvents, tripsModel, filterModel, offersModel, destinationsModel, api);
const filterPresenter = new FilterPresenter(siteMenuHeaderElement, filterModel, tripsModel);
const siteMenuComponent = new SiteMenu();
let stats = null;
let statisticsComponent = null;

const onSiteMenuClick = (menuItem) => {
  menuItem = menuItem.textContent;
  switch (menuItem) {
    case MenuItem.TABLE:
      statisticsComponent.hide();
      tripBoard.show();
      break;
    case MenuItem.STATS:
      statisticsComponent = new Stats(stats);
      render(sitePageMainElement, statisticsComponent, RenderPosition.AFTERBEGIN);
      tripBoard.hide();
      statisticsComponent.show();
      break;
  }
};

filterPresenter.init();
tripBoard.init();

Promise.all([api.getPoints(), api.getOffers(), api.getDestinations()])
.then(([apiPoints, apiOffers, apiDestination]) => {
  stats = apiPoints;
  offersModel.setOffers(apiOffers);
  destinationsModel.setDestinations(apiDestination);
  tripsModel.setPoints(UpdateType.INIT, apiPoints);
  render(siteMenuHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClick(onSiteMenuClick);
  document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tripBoard.createPoint();
  });
})
.catch(() => {
  tripsModel.setPoints(UpdateType.INIT, []);
  render(siteMenuHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClick(onSiteMenuClick);
});


