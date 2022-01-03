export const GET_URL = "http://127.0.0.1:5000/recipes/";
export const SEARCH_URL = "http://127.0.0.1:5000/recipes/search?query=";
export const AUTH_URL = "http://127.0.0.1:5000/get_token";
export let API_KEY;
export const updateApiToken = (key) => {
  API_KEY = key;
};
