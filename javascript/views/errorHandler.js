/* 
This object is responsible for displaying the error messages.

The inner workings of the object are encapsulated using private properties and methods - "#",
which get accessed through the public interface (methods).
*/

class ErrorHandler {
  #recipeList = document.querySelector(".recipe__list");
  renderError(msg) {
    let markup = `
          <div class="error">
              <img class="error--icon" src="./img/error.svg">
              <p class="error__msg">${msg}</p>
          </div>
          `;
    this.#recipeList.innerHTML = markup;
  }
}

// Custom Error handler that handles Authentication Errors
class LoginErrorHandler {
  #messageBox = document.querySelector(".login__message");

  showError(msg) {
    this.#messageBox.textContent = msg;
    this.#messageBox.classList.remove("hidden");
  }
}

const errorHandler = new ErrorHandler();
const loginErrorHandler = new LoginErrorHandler();

export { errorHandler, loginErrorHandler };
