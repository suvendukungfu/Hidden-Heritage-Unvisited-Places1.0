export type HeritageSite = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  location: {
    lat: number;
    lng: number;
  };
};

export const chambalHeritageSites: HeritageSite[] = [
  {
    id: "bateshwar",
    name: "Bateshwar Temples",
    category: "Temple Complex",
    description:
      "A complex of over 200 ancient Shiva temples dating back to the 8th–10th century, located along the Chambal river.",
    image: "/chambal.jpg",
    location: {
      lat: 26.23,
      lng: 78.17,
    },
  },
  {
    id: "ravines",
    name: "Chambal Ravines",
    category: "Natural Wonder",
    description:
      "Dramatic ravines carved by erosion over centuries, known for wildlife and hidden river routes.",
    image: "/hero.jpg",
    location: {
      lat: 26.30,
      lng: 77.50,
    },
  },
  {
    id: "bhimbetka",
    name: "Bhimbetka Rock Shelters",
    category: "UNESCO World Heritage Site",
    description:
      "Prehistoric rock shelters featuring cave paintings from the Paleolithic era.",
    image: "/file.svg",
    location: {
      lat: 22.94,
      lng: 77.60,
    },
  },
  {
    id: "padavali",
    name: "Padavali Temple Complex",
    category: "Temple Ruins",
    description:
      "Ruins from the Gurjara-Pratihara era showcasing intricate stone carvings and forgotten architecture.",
    image: "/window.svg",
    location: {
      lat: 26.15,
      lng: 77.92,
    },
  },
];
