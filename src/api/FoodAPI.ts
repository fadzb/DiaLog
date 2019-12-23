import { FoodItem } from '../typings/FoodItem';
import { fakeJson } from './FakeJson';

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

  const _fakeJson = JSON.stringify(fakeJson);
  const parsedJson = JSON.parse(_fakeJson);

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
