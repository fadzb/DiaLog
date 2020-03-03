// 1 unit per 10g Carbs
export const DEFAULT_CHO_RATIO = 1 / 10;

export const suggestInsulinDose = (cho: number, ratio: number, currentGlucose?: number) => {
  let suggestion = cho * ratio;

  // Use current glucose levels to determine if correction dose required
  if (currentGlucose) suggestion = applyCorrectionDose(suggestion, currentGlucose);

  // Round down to nearest .5
  suggestion = Math.floor(suggestion * 2) / 2;

  return suggestion;
};

// For now does nothing
const applyCorrectionDose = (suggestion: number, currentGlucose: number) => {
  console.log('should apply correction dose using Current Glucose Level: ' + currentGlucose);
  return suggestion;
};
