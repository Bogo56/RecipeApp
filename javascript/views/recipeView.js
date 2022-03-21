/* 
This object is responsible for displaying all details of a particular recipe,
after receiving all the data from the model.

The inner workings of the object are encapsulated using private properties and methods - "#",
which get accessed through the public interface (methods).
*/

class RecipeView {
  #recipeImg = document.querySelector(".food__background");
  #recipeTitle = document.querySelector(".h2__title span");
  #recipeTime = document.querySelector(".time__span");
  #recipeIngr = document.querySelector("ul.ingredients__section");
  #recipeLink = document.querySelector(".btn__recipe__link");
  #servingsNumber = document.querySelector(".info__persons");
  #bookmarkBtn = document.querySelector(".btn__bookmark--serving");
  #recipeData;

  // The public method used for rendering the recipe details in the app
  renderResult(data) {
    this.#recipeData = data;
    let res = this.#addIngredientsHTML();
    this.#bookmarkBtn.classList.remove("hidden");
    this.#recipeIngr.innerHTML = "";
    this.#recipeIngr.insertAdjacentHTML("afterbegin", res);
    this.#addRecipeDetails();
  }

  renderServings() {
    this.#servingsNumber.textContent = this.#servingsNumber.dataset.number;
  }

  resetServings() {
    this.#servingsNumber.dataset.number = 3;
    this.renderServings();
  }

  #addRecipeDetails() {
    let recipe = this.#recipeData.recipe;
    this.#removeSpinner();
    this.#recipeImg.style.backgroundImage = `url(${recipe.img_url})`;
    this.#recipeTitle.textContent = recipe.title;
    this.#recipeTime.textContent = recipe.time;
    this.#recipeLink.href = recipe.recipe_link;
    this.#recipeData.bookmarked
      ? this.#bookmarkBtn.classList.add("btn--active")
      : this.#bookmarkBtn.classList.remove("btn--active");
  }

  //   Example using a PURE function(creating a modified copy of the original data - map())
  // Using the data to build the html code for the recipe ingredients
  #addIngredientsHTML() {
    const result = this.#recipeData.ingredients
      .map((ing) => {
        let markup = `
            <li class="recipe__ingredient">
                <div class="ingredients__row">
                    <img  class="ingredient_detail--icon" src="img/check.png">
                    <div class="ingredient__detail">
                        <span class="ingredient_qty">${
                          ing.qty ? ing.qty : "на"
                        }</span>
                        <span class="unit">${
                          ing.unit ? ing.unit : "вкус"
                        }</span>
                        ${ing.product}
                    </div>
                </div>
            </li>
            `;
        return markup;
      })
      .reduce((a, b) => a + b);

    return result;
  }

  // Displaying a spinner while data is being loaded and rendered
  loadingSpinner() {
    let markup = `
    <div class="loading__spinner">
        <object class="loading__spinner--icon" data="img/spin1.svg" type="image/svg+xml"></object>
    </div>
    `;
    this.#recipeImg.style.backgroundImage = "url()";
    this.#recipeImg.innerHTML = markup;
  }

  #removeSpinner() {
    let markup = `
    <div class="recipe__title">
        <h2 class= "h2__title">
            <span></span>
        </h2>
    </div>
        `;
    this.#recipeImg.innerHTML = markup;
    this.#recipeTitle = document.querySelector(".h2__title span");
  }
}

const recipeView = new RecipeView();

export default recipeView;
