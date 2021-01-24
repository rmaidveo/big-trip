import SiteMenu from "./view/site-menu.js";
import {remove, render, RenderPosition} from "./utils/render.js";
import TripBoard from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import Points from "./model/points.js";
import Filter from "./model/filter.js";
import {MenuItem, UpdateType} from "./constants.js";
import Stats from "./view/stats.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic UCjRB7mK8mS`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/.`;
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
const api = new Api(END_POINT, AUTHORIZATION);
const events = [];

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
tripBoard.init();
// api.getPoints().then((points) => {
//   console.log(points);

// });
api.getPoints()
.then((points) => {
  tripsModel.setPoints(UpdateType.INIT, points);

})
.catch(() => {
  tripsModel.setPoints(UpdateType.INIT, []);
  render(siteMenuHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClick(onSiteMenuClick);
});
// document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
//   evt.preventDefault();
//   tripBoard.createPoint();
// });

