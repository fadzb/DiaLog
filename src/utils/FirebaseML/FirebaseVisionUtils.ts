import vision from '@react-native-firebase/ml-vision';
import { fakeLabels } from './FakeLabels';
import { badLabels } from './BadLabels';

const VISION_API_KEY = 'AIzaSyA6xJ8Rewe6YgTfiQyDeXJXJBlCDdOXR5M';

export const getFakeLabels = () => {
  return fakeLabels;
};

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

export const filterLabels = (labels: any, numLabels: number) => {
  let filteredLabels;

  // Filter out generic labels
  filteredLabels = labels.filter((label: any) => !badLabels.includes(label));

  // Return top n lables
  return filteredLabels.slice(0, numLabels);
};
