import Abstract from "./abstract.js";

const createNewTripButtonTemplate = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};
export default class NewTripButton extends Abstract {
  getTemplate() {
    return createNewTripButtonTemplate();
  }
}
