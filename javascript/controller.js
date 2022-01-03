import recipeView from "./views/recipeView.js";
import recipeSearchView from "./views/searchView.js";
import eventHandlers from "./views/eventHandlers.js";
import { errorHandler, loginErrorHandler } from "./views/errorHandler.js";
import bookmarksView from "./views/bookmarksView.js";
import loginView from "./views/loginView.js";
import { model } from "./model.js";
import { updateApiToken } from "./config.js";
import AuthError from "./errors.js";
import { isFirstLogin } from "./helpers.js";

/*
This is the controller module that connects the model and the view
*/

// This function takes care of generating an API KEY and
// updating it in the config.js file, where it get's accessed
// from the other modules.
const getApiToken = async function (username, password) {
  try {
    // Check if there is a "cookie" - not a real cookie, but let's call it that way.
    const checkFirstLogin = isFirstLogin();

    // Generate Token
    const data = await model.generateToken(username, password);

    // Update the token in the config.js file
    updateApiToken(data.token);

    if (!checkFirstLogin) {
      // Check the last recipe the user tried to get, before the Token expired
      // and continue from there, if not load a random recipe.
      let hash = parseInt(window.location.hash.slice(1));
      hash ? getRecipe(hash) : getRecipe(87);
    } else {
      //If it is a first time login load a random recipe, so that the screen is not empty
      getRecipe(87);
    }

    // Hide the login screen
    loginView.hideLogin();
  } catch (err) {
    // Custom Handler for dealing with AuthErrors
    loginErrorHandler.showError(err.message);
  }
};

// Getting recipes based on search query
const searchRecipes = async function (query) {
  try {
    // Displaying a spinner while fetching data

    recipeSearchView.loadingSpinner();

    // Fetch the data
    const data = await model.searchData(query);

    // Throw error if no data is found
    if (!data.data) throw Error(data.msg);

    // If there is more than 1 page of results, display pagination buttons
    if (model.numOfPages > 1) {
      recipeSearchView.renderResults(model.paginateData());
      recipeSearchView.renderPagination(model.currPage, model.numOfPages);
    } else {
      recipeSearchView.renderResults(data.data);
    }
  } catch (err) {
    // Clear results to display the error message
    recipeSearchView.clearResultsList();

    // If token has Expired (expired Key === no Authentication) display
    // the login screen again to renew the token.
    if (err instanceof AuthError) {
      loginView.showLogin();
      loginErrorHandler.showError(err.message);
    } else {
      errorHandler.renderError(err.message);
    }
  }
};

// Getting a particular recipe based on ID
const getRecipe = async function (id) {
  try {
    recipeView.loadingSpinner();
    const data = await model.getData(id);
    if (!data.data) throw Error(data.msg);
    recipeView.renderResult(data.data);
  } catch (err) {
    recipeSearchView.clearResultsList();
    if (err instanceof AuthError) {
      loginView.showLogin();
      loginErrorHandler.showError(err.message);
    } else {
      errorHandler.renderError(err.message);
    }
  }
};

// CALLBACK FUNCTIONS used in EventListeners

const controllLogin = async (username, password) => {
  await getApiToken(username, password);
};

const controllSearch = () => {
  let query = eventHandlers.searchField.value;
  if (!query) return;
  searchRecipes(query);
};

// Listening for # changes in the url - for loading the respective recipe
const controllHash = () => {
  let id = parseInt(window.location.hash.slice(1));
  recipeView.resetServings();
  getRecipe(id);
};

const controllPagination = (nav) => {
  recipeSearchView.renderResults(model.paginateData(nav));
  const currPage = model.currPage;
  const numPages = model.numOfPages;
  recipeSearchView.renderPagination(currPage, numPages);
};

const controllServings = (number, curNum) => {
  recipeView.renderServings();
  const updatedData = model.updateServings(number, curNum);
  recipeView.renderResult(updatedData);
};

const controllBookmarks = (isActive) => {
  isActive ? model.addBookmark() : model.deleteBookmark();
  bookmarksView.renderResults(model.bookmarks);
};

// Following the MVC Pattern and grouping all DOM related stuff -
// e.g addEventListeners in the 'Views' module. While in the controller
// the events are actually being handled.

eventHandlers.loginHandler(controllLogin);

eventHandlers.searchHandler(controllSearch);

eventHandlers.hashHandler(controllHash);

eventHandlers.paginationHandler(controllPagination);

eventHandlers.servingsHandler(controllServings);

eventHandlers.bookmarksHandler(controllBookmarks);

eventHandlers.overlayHandler();

// Initialization function that loads the data stored in localStorage
// at the initial load of the app.

function init() {
  const storage = localStorage.getItem("bookmarks");
  if (storage) model.bookmarks = JSON.parse(storage);

  const apiToken = localStorage.getItem("api_token");
  apiToken ? updateApiToken(JSON.parse(apiToken).token) : loginView.showLogin();

  bookmarksView.renderResults(model.bookmarks);
}

init();
