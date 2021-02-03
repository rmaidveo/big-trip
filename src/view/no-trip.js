import Abstract from "./abstract.js";

const createNoTripTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};
export default class NoTrip extends Abstract {
  getTemplate() {
    return createNoTripTemplate();
  }
}
