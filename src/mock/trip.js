import dayjs from "dayjs";
import {nanoid} from 'nanoid';
import {TYPES, COST, OFFERS, DESCRIPTIONS, CITIES} from "../constants.js";
import {getRandomInteger, getRandomElement} from "../utils/common.js";
import {getAllCost} from "../utils/trip.js";

const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
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

export const generateDescriptions = () => {
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

const getRandomPhotos = () => {
  const photos = [];
  const count = getRandomInteger(1, 9);
  for (let i = 0; i <= count; i++) {
    photos[i] = `http://picsum.photos/248/152?r=${Math.random()}`;
  }
  return photos;
};
export const CITY = {
  Tokyo: [generateDescriptions(), getRandomPhotos()],
  Oslo: [generateDescriptions(), getRandomPhotos()],
  Boston: [generateDescriptions(), getRandomPhotos()],
  Berlin: [generateDescriptions(), getRandomPhotos()],
  Osaka: [generateDescriptions(), getRandomPhotos()],
  Karaganda: [generateDescriptions(), getRandomPhotos()],
  Barcelona: [generateDescriptions(), getRandomPhotos()],
  Lisbon: [generateDescriptions(), getRandomPhotos()],
  Riga: [generateDescriptions(), getRandomPhotos()],
  Kaliningrad: [generateDescriptions(), getRandomPhotos()],
  Morio: [generateDescriptions(), getRandomPhotos()],
  Konoha: [generateDescriptions(), getRandomPhotos()]
};

const generateDestinationOptionList = (array) => {
  const count = 3;
  return new Array(count)
    .fill()
    .map(() => getRandomElement(array));
};

export const generateTrip = () => {
  const start = generateDate();
  const end = generateEndTime(start);
  const duration = generateDuration(start, end);
  const cost = getRandomInteger(COST.MIN, COST.MAX);
  const offers = generateOffers();
  const total = getAllCost(cost, offers);
  const city = getRandomElement(Object.keys(CITY));
  const destinationList = generateDestinationOptionList(CITIES);
  return {
    id: nanoid(),
    start,
    type: generateType(),
    city,
    duration,
    end,
    cost,
    offers,
    total,
    destination: {
      description: CITY[city][0],
      photos: CITY[city][1],
    },
    destinationList,
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
