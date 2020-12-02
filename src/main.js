import SiteMenu from "./view/site-menu.js";
import SiteFilter from "./view/site-filter.js";
import TripInfo from "./view/trip-info.js";
import SiteSort from "./view/site-sort.js";
import TripList from "./view/trip-list";
import TripListItems from "./view/trip-list-items";
import EditTrip from "./view/form-edit";
import NoTrip from "./view/no-trips.js";
import {render, RenderPosition} from "./utils.js";
import {generateTrip} from "./mock/trip.js";
import {generateFilter} from "./mock/filter.js";
import {generateSort} from "./mock/sort.js";

const EVENTS_COUNT = 15;
const events = new Array(EVENTS_COUNT).fill().map(generateTrip);
const filters = generateFilter(events);
const sorts = generateSort(events);
const siteHeaderElement = document.querySelector(`.page-header`);
const siteMenuHeaderElement = siteHeaderElement.querySelector(`.trip-main__trip-controls`);
const siteMenuMainHeaderElement = siteHeaderElement.querySelector(`.trip-main`);
const siteSortTripEvents = document.querySelector(`.trip-events`);

render(siteMenuHeaderElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
render(siteMenuHeaderElement, new SiteFilter(filters).getElement(), RenderPosition.BEFOREEND);

const renderTrip = (tripListElement, trip) => {
  const tripComponent = new TripListItems(trip);
  const tripEditComponent = new EditTrip(trip);

  const replaceCardToForm = () => {
    tripListElement.replaceChild(tripEditComponent.getElement(), tripComponent.getElement());
  };

  const replaceFormToCard = () => {
    tripListElement.replaceChild(tripComponent.getElement(), tripEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  tripEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripListElement, tripComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTrips) => {
  const boardSort = new SiteSort(sorts);
  const listElement = new TripList();

  if (boardTrips.length === 0) {
    render(siteSortTripEvents, new NoTrip().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(siteMenuMainHeaderElement, new TripInfo(events[0]).getElement(), RenderPosition.AFTERBEGIN);
  render(boardContainer, boardSort.getElement(), RenderPosition.AFTERBEGIN);
  render(boardContainer, listElement.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < EVENTS_COUNT; i++) {
    renderTrip(listElement.getElement(), events[i]);
  }
};

renderBoard(siteSortTripEvents, events);
