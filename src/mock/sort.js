import {sortByField} from "../utils.js";

const tripToSortMap = {
  day: (events) => Array.from(events.sort(sortByField(`start`))).length,
  event: (events) => events.length,
  time: (events) => Array.from(events.sort(sortByField(`duration`))).length,
  price: (events) => Array.from(events.sort(sortByField(`cost`))).length,
  offers: (events) => events.length
};

export const generateSort = (events) => {
  return Object.entries(tripToSortMap).map(([sortName, countTrips]) => {
    return {
      name: sortName,
      count: countTrips(events)
    };
  });
};
