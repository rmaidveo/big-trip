import AbstractView from "./abstract.js";
import {MenuItem} from "../constants.js";
const ACTIVE_MENU = `trip-tabs__btn--active`;

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
  <a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
</nav>`;
};
export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._onMenuClick = this._onMenuClick.bind(this);
  }
  getTemplate() {
    return createSiteMenuTemplate();

  }
  _onMenuClick(evt) {
    evt.preventDefault();
    const element = evt.target;

    if (element.tagName === `A` && !element.classList.contains(ACTIVE_MENU)) {
      this.getElement().querySelector(`.${ACTIVE_MENU}`).classList.remove(ACTIVE_MENU);
      element.classList.add(ACTIVE_MENU);

      this._callback.menuClick(element);
    }
  }
  resetMenuItems() {
    const menuItems = this.getElement().querySelectorAll(`a.trip-tabs__btn`);
    menuItems.forEach((item)=>item.classList.remove(ACTIVE_MENU));
    menuItems[0].classList.add(ACTIVE_MENU);
  }

  setMenuClick(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._onMenuClick);

  }
}
