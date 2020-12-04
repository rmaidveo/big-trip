import {isTripPlanned, isTripExpired} from "../utils/trip.js";

const tripToFilterMap = {
  everything: (events) => events.length,
  future: (events) => events
    .filter((event) => isTripPlanned(event.start)).length,
  past: (events) => events
    .filter((event) => isTripExpired(event.start)).length,
};

export const generateFilter = (events) => {
  return Object.entries(tripToFilterMap).map(([filterName, countTrips]) => {
    return {
      name: filterName,
      count: countTrips(events)
    };
  });
};
