import { GET_URL, SEARCH_URL, AUTH_URL } from "./config.js";
import { getJSON, getKEY } from "./helpers.js";

/* 
This is the Model part of the MVC Architecture, that 
takes care of delivering and transforming the data.

It implements the newer JS feature, that allows for 
Real Private Methods and Properties - "#". It is being used
to Encapsulate the internal workings of the object and 
exposes a Public interface through Getters, Setters and Public Methods
that allow to access and modify the private parts.

All the data being fetched trough the API is being stored in a private
property of the class "#results" - an object. It acts as a cache, so that
the data is being fetched only once from the API. This makes data access faster
and prevents API overloading.
*/

class Model {
  // private properties
  #results = {
    searchData: {},
    getData: {},
    bookmarks: [],
  };
  #resPerPage = 6;
  #currPage = 0;
  #numOfPages;

  //  Getters and Setters

  // get the number of Pages it takes to display all results
  get numOfPages() {
    this.#numOfPages = Math.ceil(
      this.#results.searchData.data.length / this.#resPerPage
    );
    return this.#numOfPages;
  }

  // which page is currently being fetched
  get currPage() {
    return this.#currPage;
  }

  get bookmarks() {
    return this.#results.bookmarks.map((el) => el.recipe);
  }

  // used to load all the bookmarked data saved in Window.localStorage
  set bookmarks(value) {
    this.#results.bookmarks = value;
  }

  // Getting an Access Token from the API and saving it to localStorage.
  async generateToken(username, password) {
    const url = AUTH_URL;

    const data = await getKEY(url, username, password);

    this.#persistToken(data.info);

    return data.info;
  }

  // Getting data through searching (multiple Results)
  async searchData(query) {
    const url = `${SEARCH_URL}${query}`;

    const data = await getJSON(url);

    this.#results.searchData = data;
    this.#currPage = 0;

    return this.#results.searchData;
  }

  // Getting data for a particular Recipe (single Result)
  async getData(id) {
    const url = `${GET_URL}${id}`;

    const data = await getJSON(url);

    this.#results.getData = data;

    if (this.#results.bookmarks.some((el) => el.recipe.id === id))
      this.#results.getData.data.bookmarked = true;
    else this.#results.getData.data.bookmarked = false;

    return this.#results.getData;
  }

  // Calculating the quantity of the ingredients based on the number of people
  // it takes the difference in percent between the curent and next value(number of people),
  // applies that percent and updates the data.
  updateServings(number, curNum) {
    const data = this.#results.getData.data;
    data.ingredients.forEach((ing) => {
      ing.qty = Math.ceil(parseInt(ing.qty) * (number / curNum));
    });
    return data;
  }

  // Takes care of pagination and displaying results for the respective page
  // if "navigation" is "next" it moves to the next page, if "prev" to the previous
  paginateData(navigation = "next") {
    this.#setCurrPage(navigation);

    const resPerPage = this.#resPerPage;
    const currPage = this.#currPage;

    let start = (currPage - 1) * resPerPage;
    let stop = currPage * resPerPage;

    return this.#results.searchData.data.slice(start, stop);
  }

  // Modifying currently loaded recipe
  addBookmark() {
    this.#results.getData.bookmarked = true;
    this.#results.bookmarks.push(this.#results.getData.data);
    this.#persistBookmarks();
  }

  deleteBookmark() {
    this.#results.getData.bookmarked = false;
    const id = this.#results.getData.data.recipe.id;
    const index = this.#results.bookmarks.findIndex(
      (el) => el.recipe.id === id
    );
    this.#results.bookmarks.splice(index, 1);
    this.#persistBookmarks();
  }

  #persistToken(token) {
    localStorage.setItem("api_token", JSON.stringify(token));
  }

  // Using 'window.localStorage' for storing and persisting data through sessions
  // giving the app a "state"
  #persistBookmarks() {
    localStorage.setItem("bookmarks", JSON.stringify(this.#results.bookmarks));
  }

  // Private Method that updates the current results page being fetched
  #setCurrPage(nav) {
    const numOfPages = this.numOfPages;
    if (this.#currPage >= 0 && this.#currPage <= numOfPages) {
      nav === "next" ? this.#currPage++ : this.#currPage--;
    }
  }
}

const model = new Model();

export { model };
