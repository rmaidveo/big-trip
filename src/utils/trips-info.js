
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
    price: [],
    title: []
  };
  for (const point of points) {
    offers.price = offers.price.concat(point.offers.price);
    offers.title = offers.title.concat(point.offers.title);
  }
  return offers;
};
