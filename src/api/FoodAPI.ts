import { FoodItem } from '../typings/FoodItem';

let responseJSON: any;

const headers = {
  'Content-Type': 'application/json',
  'x-app-id': '5dfcc936',
  'x-app-key': '257c5ab2f46b28a730eba0601e35f6a2',
  'x-remote-user-id': '0',
};

function makeRequest() {
  const requestOptions: any = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };
  return requestOptions;
}

function requestFoods(query: string) {
  fetch('https://trackapi.nutritionix.com/v2/search/instant?query=' + query, makeRequest())
    .then(response => (responseJSON = response.json()))
    .catch(error => console.log('error', error));
}

export function getFoodItems(query: string) {
  //parse response and return array of food items
  const foodItems: FoodItem[] = [];

  // requestFoods(query);

  //parse response json
  //const parsedJson = JSON.parse(responseJSON);

  const fakeJson = JSON.stringify({
    common: [
      {
        food_name: 'burger',
        serving_unit: 'sandwich',
        tag_name: 'hamburger',
        serving_qty: 1,
        common_type: null,
        tag_id: '608',
        photo: {
          thumb: 'https://d2xdmhkmkbyw75.cloudfront.net/608_thumb.jpg',
        },
        locale: 'en_US',
      },
      {
        food_name: 'burgers',
        serving_unit: 'sandwich',
        tag_name: 'hamburger',
        serving_qty: 1,
        common_type: null,
        tag_id: '608',
        photo: {
          thumb: 'https://d2xdmhkmkbyw75.cloudfront.net/608_thumb.jpg',
        },
        locale: 'en_US',
      },
    ],
  });

  const parsedJson = JSON.parse(fakeJson);

  const food_names: string[] = [];
  for (let i = 0; i < parsedJson.common.length; i++) {
    const foodItem: FoodItem = {
      name: parsedJson.common[i].food_name,
      tag: parsedJson.common[i].tag_id,
      photo_url: parsedJson.common[i].photo.thumb,
      cho: '0',
    };
    foodItems.push(foodItem);
  }

  return foodItems;
}
