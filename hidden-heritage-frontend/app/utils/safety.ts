export const calculateSafetyScore = (riskScore: number) =>
  Math.round((1 - riskScore) * 100);
