import dayjs from "dayjs";
import {nanoid} from 'nanoid';
import {TYPES, CITIES, COST, OFFERS, DESCRIPTIONS} from "../constants.js";
import {getRandomInteger} from "../utils/common.js";

const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const generateCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);
  return CITIES[randomIndex];
};

const generateOffers = () => {
  const randomLength = getRandomInteger(0, OFFERS.length - 1);
  let title = [];
  let price = [];
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, OFFERS.length - 1);
    title.push(OFFERS[randomIndex]);
    title.filter((item, index) => title.indexOf(item) === index);
  }
  for (let i = 0; i < title.length; i++) {
    price.push(getRandomInteger(30, 200));
  }
  return {
    title,
    price
  };
};

const generateDescriptions = () => {
  const randomLength = getRandomInteger(1, 5);
  let description = [];
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);
    description.push(DESCRIPTIONS[randomIndex]);
  }
  return description;
};

const generateDate = () => {
  const maxDaysGap = 100;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, `day`).toDate();

};
const generateDuration = (starts, ends) => {
  const start = dayjs(starts);
  const end = dayjs(ends);
  return end.diff(start, `minute`);
};

const generateEndTime = (date) => {
  const maxGap = {
    hours: 64,
    minute: 60
  };
  maxGap.hours = getRandomInteger(0, maxGap.hours);
  maxGap.minute = getRandomInteger(0, maxGap.minute);
  return dayjs(date).add(maxGap.hours, `hours`).add(maxGap.minute, `minute`).toDate();
};

export const generateTrip = () => {
  const start = generateDate();
  const end = generateEndTime(start);
  const duration = generateDuration(start, end);
  const cost = getRandomInteger(COST.MIN, COST.MAX);
  const offers = generateOffers();

  return {
    id: nanoid(),
    start,
    type: generateType(),
    city: generateCity(),
    duration,
    end,
    cost,
    offers,
    destination: {
      description: generateDescriptions(),
      photos: [
        `http://picsum.photos/248/152?r=${Math.random()}`,
        `http://picsum.photos/248/152?r=${Math.random()}`,
        `http://picsum.photos/248/152?r=${Math.random()}`,
        `http://picsum.photos/248/152?r=${Math.random()}`,
        `http://picsum.photos/248/152?r=${Math.random()}`,
      ]
    },
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
