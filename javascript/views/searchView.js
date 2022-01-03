/* 
This object is responsible for displaying all search results,
after receiving the data from the model.

The inner workings of the object are encapsulated using private properties and methods - "#",
which get accessed through the public interface (methods).
*/

class RecipeSearchView {
  #itemsList = document.querySelector(".recipe__list");
  #paginationDiv = document.querySelector(".pagination");
  #recipes;

  //   Example NOT using a PURE function (directly modifying the original data - forEach())
  renderResults(recipes) {
    this.#recipes = recipes;
    this.clearResultsList();
    this.#recipes.forEach((recipe) => {
      this.#itemsList.insertAdjacentHTML(
        "afterbegin",
        this.#addResultHTML(recipe)
      );
    });
  }

  #addResultHTML(data) {
    let markup = `
      <a class = "recipe__link" href= "#${data.id}">
          <div class="recipe__result">
              <img class="recipe__thumbnail" src=${data.img_url}>
              <h2 class ="recipe__result--heading">
                  ${data.title}
              </h2>
              <p class="recipe__author">МateКitchen</p>
          </div>
      </a>
      `;
    return markup;
  }

  loadingSpinner() {
    let markup = `
      <div class="loading__spinner">
          <object class="loading__spinner--icon" data="img/spin1.svg" type="image/svg+xml"></object>
      </div>
      `;
    this.#itemsList.innerHTML = markup;
  }

  // Displaying pagination buttons, for navigating through results pages
  renderPagination(page, numPages) {
    let markup;
    if (page > 1 && page < numPages) {
      markup = `
          <button class="btn btn__pagination pagination--prev" data-nav="prev">← Page ${
            page - 1
          } </button>
          <button class=" btn btn__pagination pagination--next" data-nav="next">Page ${
            page + 1
          } →</button>
        `;
    }
    if (page === numPages) {
      markup = `
          <button class="btn btn__pagination pagination--prev" data-nav="prev">← Page ${
            page - 1
          } </button>
        `;
    }
    if (page === 1) {
      markup = `
        <button class=" btn btn__pagination pagination--next" data-nav="next">Page 2 →</button>
      `;
    }
    this.#paginationDiv.innerHTML = "";
    this.#paginationDiv.insertAdjacentHTML("beforeend", markup);
  }

  clearResultsList() {
    this.#itemsList.innerHTML = "";
    this.#paginationDiv.innerHTML = "";
  }
}

const recipeSearchView = new RecipeSearchView();

export default recipeSearchView;
