
export const getDestinationPointsSearch = (points) => {
  const destinationPoints = [];
  for (const point of points) {
    destinationPoints.push(point.destination.city);
  }
  return destinationPoints;
};
export const getTotalPricePoints = (points) => {
  let total = 0;
  for (const point of points) {
    total += point.cost;
  }
  return total;
};
export const getTotaloffersPoints = (points) => {
  const offers = {
    prices: [],
    titles: []
  };
  for (const point of points) {
    offers.prices = offers.prices.concat(point.offers.prices);
    offers.titles = offers.titles.concat(point.offers.titles);
  }
  return offers;
};
