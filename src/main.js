import {isOnline} from "./utils/common.js";
import {toast} from "./utils/toast/toast.js";
import {render, RenderPosition} from "./utils/render.js";
import {MenuItem, UpdateType} from "./constants.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import TripInfoPresenter from "./presenter/trip-info.js";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";
import StatsView from "./view/stats.js";
import SiteMenuView from "./view/site-menu.js";
import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";


const AUTHORIZATION = `Basic pQdgkWsrfRqm`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/.`;
const STORE_PREFIX = `rmaidveo-bigtrip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const tripsModel = new PointsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const siteMenuComponent = new SiteMenuView();

const siteHeaderElement = document.querySelector(`.page-header`);
const sitePageMainElement = document.querySelector(`.page-main .page-body__container`);
const siteMenuHeaderElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMenuMainHeaderElement = siteHeaderElement.querySelector(`.trip-main`);
const siteSortTripEvents = document.querySelector(`.trip-events`);
let stats = null;
let statisticsComponent = null;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const tripPresenter = new TripPresenter(siteMenuMainHeaderElement, siteSortTripEvents, tripsModel, filterModel, offersModel, destinationsModel, apiWithProvider);
const filterPresenter = new FilterPresenter(siteMenuHeaderElement, filterModel, tripsModel);
const tripInfoPresenter = new TripInfoPresenter(siteMenuMainHeaderElement, tripsModel);


const onSiteMenuClick = (menuItem) => {
  menuItem = menuItem.textContent;
  switch (menuItem) {
    case MenuItem.TABLE:
      statisticsComponent.hide();
      tripPresenter.show();
      if (sitePageMainElement.classList.contains(`no-after`)) {
        sitePageMainElement.classList.remove(`no-after`);
      }
      break;
    case MenuItem.STATS:
      statisticsComponent = new StatsView(stats, offersModel);
      render(sitePageMainElement, statisticsComponent, RenderPosition.AFTERBEGIN);
      tripPresenter.hide();
      statisticsComponent.show();
      if (sitePageMainElement.classList.contains(`no-after`)) {
        sitePageMainElement.classList.add(`no-after`);
      }
      break;
  }
};

tripInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

Promise.all([apiWithProvider.getPoints(), apiWithProvider.getOffers(), apiWithProvider.getDestinations()])
.then(([apiPoints, apiOffers, apiDestination]) => {
  stats = apiPoints;
  offersModel.setOffers(apiOffers);
  destinationsModel.setDestinations(apiDestination);
  tripsModel.setPoints(UpdateType.INIT, apiPoints);
  render(siteMenuHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClick(onSiteMenuClick);
  document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (!isOnline()) {
      toast(`You can't create new point offline`);
    } else {
      tripPresenter.createPoint();
    }
  });
})
.catch(() => {
  tripsModel.setPoints(UpdateType.INIT, []);
  render(siteMenuHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClick(onSiteMenuClick);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});
window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
