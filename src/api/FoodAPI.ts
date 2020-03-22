import { FoodItem } from '../typings/FoodItem';
import { fakeJson } from './FakeJson';
import { fakeDetailedJson } from './FakeDetailedJson';
import { fakeBarcodeJson } from './FakeBarcodeJson';
const API_ENABLED = false;

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

//GET (list of foods from natural language search)
export function requestFoods(query: string) {
  if (API_ENABLED) {
    return fetch(
      'https://trackapi.nutritionix.com/v2/search/instant?query=' + query,
      makeGetRequest(),
    )
      .then(response => response.json())
      .catch(error => console.log('error', error));
  }
  return Promise.resolve();
}

//POST (food nutrient information (eg. CHO content))
export function requestFoodDetails(query: string) {
  if (API_ENABLED) {
    return fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', makePostRequest(query))
      .then(response => response.json())
      .catch(error => console.log('error', error));
  }
  return Promise.resolve();
}

//GET (food nutrient information from barcode)
export function requestFoodDetailsFromBarcode(upc: string) {
  if (API_ENABLED) {
    return fetch('https://trackapi.nutritionix.com/v2/search/item?upc=' + upc, makeGetRequest())
      .then(response => response.json())
      .catch(error => console.log('error', error));
  }
  return Promise.resolve();
}

export function parseFoodItems(responseJSON: any) {
  const foodItems: FoodItem[] = [];
  let parsedJson: any;

  if (API_ENABLED) {
    //We are using response.json() upon the request, no need to parse
    parsedJson = responseJSON;
  } else {
    //Mimic the actual request by converting to JSON then parsing
    const stringyFakeJson = JSON.stringify(fakeJson);
    parsedJson = JSON.parse(stringyFakeJson);
  }

  for (let i = 0; i < parsedJson.common.length; i++) {
    const foodItem: FoodItem = {
      name: captilize(parsedJson.common[i].food_name),
      photo_url: parsedJson.common[i].photo.thumb,
      cho: '0',
      servingUnit: '',
      servingWeight: '',
    };
    foodItems.push(foodItem);
  }

  return foodItems;
}

export function parseMoreDetails(responseJSON: any) {
  let parsedJson: any;

  if (API_ENABLED) {
    //JSON already parsed using response.json()
    parsedJson = responseJSON;
  } else {
    const _fakeDetailedJson = JSON.stringify(fakeDetailedJson);
    parsedJson = JSON.parse(_fakeDetailedJson);
  }

  const detailedItem: FoodItem = {
    name: captilize(parsedJson.foods[0].food_name),
    photo_url: parsedJson.foods[0].photo.thumb,
    cho: parsedJson.foods[0].nf_total_carbohydrate,
    servingUnit: parsedJson.foods[0].serving_qty + ' ' + parsedJson.foods[0].serving_unit,
    servingWeight: parsedJson.foods[0].serving_weight_grams,
  };

  return detailedItem;
}

export function parseFoodItemFromBarcode(responseJSON: any) {
  let parsedJson: any;

  if (API_ENABLED) {
    //JSON already parsed using response.json()
    parsedJson = responseJSON;
  } else {
    const stringyFakeBarcodeJson = JSON.stringify(fakeBarcodeJson);
    parsedJson = JSON.parse(stringyFakeBarcodeJson);
  }

  const foodItem: FoodItem = {
    name: captilize(parsedJson.foods[0].food_name),
    photo_url: parsedJson.foods[0].photo.thumb,
    cho: parsedJson.foods[0].nf_total_carbohydrate,
    servingUnit: parsedJson.foods[0].serving_unit,
    servingWeight: parsedJson.foods[0].serving_weight_grams,
  };

  return foodItem;
}

// https://stackoverflow.com/a/7592235/10610784
function captilize(string: string) {
  return string.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
}
