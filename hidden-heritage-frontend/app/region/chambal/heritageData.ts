// ==============================
// Safety Factors
// ==============================
export type SafetyFactors = {
  lighting: number;        // 0–1
  roadAccess: number;      // 0–1
  emergencyAccess: number; // 0–1
  mobileNetwork: number;   // 0–1
  visitorFeedback: number; // 0–1
};

// ==============================
// Heritage Site Type
// ==============================
export type HeritageSite = {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;

  // AI / Analytics Scores
  riskScore: number;        // 0 (safe) → 1 (high risk)
  densityScore: number;     // crowd / structure density
  popularityScore: number; // tourism popularity

  // Ground-level Safety Inputs
  safetyFactors: SafetyFactors;
};

// ==============================
// Heritage Sites Data
// ==============================
export const heritageSites: HeritageSite[] = [
  {
    id: "bateshwar",
    name: "Bateshwar Temples",
    description:
      "A complex of over 200 ancient temples along the Yamuna river.",
    lat: 26.2506,
    lng: 78.2058,

    riskScore: 0.3,
    densityScore: 0.9,
    popularityScore: 0.8,

    safetyFactors: {
      lighting: 0.6,
      roadAccess: 0.7,
      emergencyAccess: 0.5,
      mobileNetwork: 0.8,
      visitorFeedback: 0.75,
    },
  },
  {
    id: "ravines",
    name: "Chambal Ravines",
    description:
      "Dramatic ravines shaped by centuries of erosion and history.",
    lat: 26.7,
    lng: 78.8,

    riskScore: 0.7,
    densityScore: 0.6,
    popularityScore: 0.5,

    safetyFactors: {
      lighting: 0.2,
      roadAccess: 0.4,
      emergencyAccess: 0.3,
      mobileNetwork: 0.5,
      visitorFeedback: 0.6,
    },
  },
];

// ==============================
// Utility: Safety Index Calculator
// ==============================
export const computeSafetyIndex = (site: HeritageSite): number => {
  const {
    lighting,
    roadAccess,
    emergencyAccess,
    mobileNetwork,
    visitorFeedback,
  } = site.safetyFactors;

  return Number(
    (
      lighting * 0.2 +
      roadAccess * 0.2 +
      emergencyAccess * 0.25 +
      mobileNetwork * 0.15 +
      visitorFeedback * 0.2
    ).toFixed(2)
  );
};
