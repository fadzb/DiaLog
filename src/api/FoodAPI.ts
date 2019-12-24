import { FoodItem } from '../typings/FoodItem';
import { fakeJson } from './FakeJson';
import { fakeDetailedJson } from './FakeDetailedJson';

let responseJSON: any;
let detailedResponseJSON: any;

const headers = {
  'Content-Type': 'application/json',
  'x-app-id': '5dfcc936',
  'x-app-key': '257c5ab2f46b28a730eba0601e35f6a2',
  'x-remote-user-id': '0',
};

function makeGetRequest() {
  const requestOptions: any = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };
  return requestOptions;
}

function makePostRequest(query: string) {
  const payload = JSON.stringify({
    query: query,
  });

  const requestOptions: any = {
    method: 'POST',
    headers: headers,
    body: payload,
    redirect: 'follow',
  };
  return requestOptions;
}

//GET
export function requestFoods(query: string) {
  return fetch(
    'https://trackapi.nutritionix.com/v2/search/instant?query=' + query,
    makeGetRequest(),
  )
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

//POST
function requestFoodDetails(query: string) {
  fetch('https://trackapi.nutritionix.com/v2/search/instant', makePostRequest(query))
    .then(response => (detailedResponseJSON = response.json()))
    .catch(error => console.log('error', error));
}

export function parseFoodItems(responseJSON: any) {
  //parse response and return array of food items
  const foodItems: FoodItem[] = [];
  //parse response json
  // const parsedJson = JSON.parse(responseJSON);
  const parsedJson = responseJSON;

  // const _fakeJson = JSON.stringify(fakeJson);
  // const parsedJson = JSON.parse(_fakeJson);

  console.log(parsedJson);

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

export function getFoodItemCHO(item: FoodItem) {
  let cho = '0';

  const query = item.name;
  // requestFoodDetails(query);

  //parse response json
  // const parsedJson = JSON.parse(detailedResponseJSON);

  // const _fakeDetailedJson = JSON.stringify(fakeDetailedJson);
  // const parsedJson = JSON.parse(_fakeDetailedJson);

  // cho = parsedJson.foods[0].nf_total_carbohydrate;

  return cho;
}
