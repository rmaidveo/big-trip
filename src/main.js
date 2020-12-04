import SiteMenu from "./view/site-menu.js";
import SiteFilter from "./view/site-filter.js";
import TripInfo from "./view/trip-info.js";
import SiteSort from "./view/site-sort.js";
import TripList from "./view/trip-list";
import TripListItems from "./view/trip-list-items";
import EditTrip from "./view/form-edit";
import NoTrip from "./view/no-trips.js";
import {render, RenderPosition, replace} from "./utils/render.js";
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

render(siteMenuHeaderElement, new SiteMenu(), RenderPosition.BEFOREEND);
render(siteMenuHeaderElement, new SiteFilter(filters), RenderPosition.BEFOREEND);

const renderTrip = (tripListElement, trip) => {
  const tripComponent = new TripListItems(trip);
  const tripEditComponent = new EditTrip(trip);

  const replaceCardToForm = () => {
    replace(tripEditComponent, tripComponent);
  };

  const replaceFormToCard = () => {
    replace(tripComponent, tripEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripComponent.setOnClickTripPoint(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEditComponent.setOnFormSubmitSave(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  tripEditComponent.setOnClickTripEdit(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripListElement, tripComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTrips) => {
  const boardSort = new SiteSort(sorts);
  const listElement = new TripList();

  if (boardTrips.length === 0) {
    render(siteSortTripEvents, new NoTrip(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(siteMenuMainHeaderElement, new TripInfo(events[0]), RenderPosition.AFTERBEGIN);
  render(boardContainer, boardSort, RenderPosition.AFTERBEGIN);
  render(boardContainer, listElement, RenderPosition.BEFOREEND);

  for (let i = 0; i < EVENTS_COUNT; i++) {
    renderTrip(listElement.getElement(), events[i]);
  }
};

renderBoard(siteSortTripEvents, events);
