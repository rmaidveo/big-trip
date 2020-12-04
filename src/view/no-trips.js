import AbstractView from "./abstract.js";

const createNoTripTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};
export default class NoTrip extends AbstractView {
  getTemplate() {
    return createNoTripTemplate();
  }
}
