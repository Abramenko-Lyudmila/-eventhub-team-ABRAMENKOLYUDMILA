import type { Event, VenueSummary } from "@eventhub/contracts";

const filarmoniya: VenueSummary = {
  id: "018f2c1e-0000-7c3d-9e1f-2a5b6c7d8e00",
  name: "Філармонія",
  city: "Вінниця",
};
const pidval: VenueSummary = {
  id: "018f2c1e-0000-7c3d-9e1f-2a5b6c7d8e01",
  name: "Клуб «Підвал»",
  city: "Вінниця",
};
const sklad: VenueSummary = {
  id: "018f2c1e-0000-7c3d-9e1f-2a5b6c7d8e02",
  name: "Клуб «Склад»",
  city: "Львів",
};
const organHall: VenueSummary = {
  id: "018f2c1e-0000-7c3d-9e1f-2a5b6c7d8e03",
  name: "Органний зал",
  city: "Львів",
};
const nationalTheatre: VenueSummary = {
  id: "018f2c1e-0000-7c3d-9e1f-2a5b6c7d8e04",
  name: "Національний театр",
  city: "Київ",
};
const jamClub: VenueSummary = {
  id: "018f2c1e-0000-7c3d-9e1f-2a5b6c7d8e05",
  name: "Джем-клуб «Контракт»",
  city: "Київ",
};
const seaBoulevard: VenueSummary = {
  id: "018f2c1e-0000-7c3d-9e1f-2a5b6c7d8e06",
  name: "Приморський бульвар",
  city: "Одеса",
};
const opera: VenueSummary = {
  id: "018f2c1e-0000-7c3d-9e1f-2a5b6c7d8e07",
  name: "Оперний театр",
  city: "Одеса",
};

export const EVENTS: Event[] = [
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8e9f",
    title: "Симфонічний вечір",
    description: "Програма з творів Лисенка та Дворжака",
    startsAt: "2026-10-12T19:00:00Z",
    venue: filarmoniya,
    minPrice: { amount: 25000, currency: "UAH" },
    availableSeats: 143,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8ea0",
    title: "Джазовий квартет",
    startsAt: "2026-10-19T20:00:00Z",
    venue: pidval,
    minPrice: { amount: 18000, currency: "UAH" },
    availableSeats: 12,
  },
  {
    // навмисно той самий startsAt, що й у джазового квартету
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8ea1",
    title: "Стендап-вечір",
    startsAt: "2026-10-19T20:00:00Z",
    venue: sklad,
    minPrice: { amount: 20000, currency: "UAH" },
    availableSeats: 65,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8ea2",
    title: "Концерт органної музики",
    startsAt: "2026-10-26T18:30:00Z",
    venue: organHall,
    minPrice: { amount: 35000, currency: "UAH" },
    availableSeats: 60,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8ea3",
    title: "Лісова пісня",
    startsAt: "2026-11-02T17:00:00Z",
    venue: nationalTheatre,
    minPrice: { amount: 40000, currency: "UAH" },
    availableSeats: 220,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8ea4",
    title: "Фестиваль вуличної їжі",
    startsAt: "2026-11-07T11:00:00Z",
    venue: seaBoulevard,
    minPrice: { amount: 5000, currency: "UAH" },
    availableSeats: 1000,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8ea5",
    title: "Нічний джем",
    startsAt: "2026-11-14T21:00:00Z",
    venue: jamClub,
    minPrice: { amount: 15000, currency: "UAH" },
    availableSeats: 80,
  },
  {
    id: "018f2c1e-4a7b-7c3d-9e1f-2a5b6c7d8ea6",
    title: "Лускунчик",
    startsAt: "2026-12-20T18:00:00Z",
    venue: opera,
    minPrice: { amount: 60000, currency: "UAH" },
    availableSeats: 300,
  },
];
