
export default class Offers {
  constructor() {
    this._offers = null;
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getOffers() {
    return this._offers;
  }

  static adaptToClient(data) {
    return {
      type: data.type,
      offers: {
        titles: data.offers.map((ar) => ar.title),
        prices: data.offers.map((ar) => ar.price)
      }
    };
  }
}
