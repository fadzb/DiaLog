import vision from '@react-native-firebase/ml-vision';

export const getLabels = async (filePath: string) => {
  try {
    const labels = await vision().cloudImageLabelerProcessImage(filePath, {});
    return labels;
  } catch (error) {
    console.log('Error Labelling Image: ' + error);
  }
};

export const filterLabels = (labels: any) => {
  return labels;
};
