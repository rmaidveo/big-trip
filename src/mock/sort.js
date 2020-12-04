import {sortByField} from "../utils/trip.js";

const tripToSortMap = {
  day: (events) => events,
  event: (events) => events,
  time: (events) => Array.from(events.sort(sortByField(`duration`))),
  price: (events) => Array.from(events.sort(sortByField(`cost`))),
  offers: (events) => events
};

export const generateSort = (events) => {
  return Object.entries(tripToSortMap).map(([sortName, countTrips]) => {
    return {
      name: sortName,
      count: countTrips(events).length
    };
  });
};
