export const GET_URL = "https://bogoapps.site/api/recipes/";
export const SEARCH_URL = "https://bogoapps.site/api/recipes/search?query=";
export const AUTH_URL = "https://bogoapps.site/api/get_token";
export let API_KEY;
export const updateApiToken = (key) => {
  API_KEY = key;
};
