import vision from '@react-native-firebase/ml-vision';

const VISION_API_KEY = 'AIzaSyA6xJ8Rewe6YgTfiQyDeXJXJBlCDdOXR5M';

export const getLabels = async (filePath: string) => {
  try {
    const labels = await vision().cloudImageLabelerProcessImage(filePath, {
      apiKeyOverride: VISION_API_KEY,
    });
    return labels;
  } catch (error) {
    console.log('Error Labelling Image: ' + error);
  }
};

export const filterLabels = (labels: any) => {
  // Remove generic labels (i.e. food, fruit, veg)
  let filteredLabels;

  filteredLabels = labels.filter((label: any) => label !== 'food');

  return filteredLabels;
};
