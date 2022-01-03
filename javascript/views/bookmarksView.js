/* 
This object is responsible for displaying all bookmarked recipes.

The inner workings of the object are encapsulated using private properties and methods - "#",
which get accessed through the public interface (methods).
*/

class BookmarksView {
  #bookmarksList = document.querySelector("ul.bookmarks_list");
  #bookmarks;

  renderResults(recipes) {
    this.#bookmarks = recipes;
    this.clearResultsList();
    this.#bookmarks.forEach((recipe) => {
      this.#bookmarksList.insertAdjacentHTML(
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

  clearResultsList() {
    this.#bookmarksList.innerHTML = "";
  }
}

const bookmarksView = new BookmarksView();

export default bookmarksView;
