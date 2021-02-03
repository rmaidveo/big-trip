import Abstract from "./abstract.js";

const createNewPointButtonTemplate = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};
export default class NewPointButton extends Abstract {
  getTemplate() {
    return createNewPointButtonTemplate();
  }
}
