/* 
This object is responsible for the eventListeners, but only for the VIEW part - it
selects the element in the DOM, and adds the eventhandler( the callback function), but 
the declaration and handling of the actual function (the callback function) happens in the controller,
so that everything is separated and follows the Separation of Concerns principle.

The inner workings of the object are encapsulated using private properties and methods - "#",
which get accessed through the public interface (methods).
*/

class EventHandlers {
  #loginForm = document.querySelector(".login__form");
  #searchButton = document.querySelector(".btn__search");
  #searchField = document.querySelector(".input__search");
  #pageBtns = document.querySelector(".pagination");
  #servBtns = document.querySelector(".recipe__update__btns");
  #bookBtn = document.querySelector(".btn__bookmark--serving");
  #overlayWindow = document.querySelector(".add__recipe-window");
  #addRecipeBtn = document.querySelector(".btn__nav--add");

  loginHandler(handler) {
    const [username, password, loginBtn] = this.#loginForm.children;
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (username.value && password.value)
        handler(username.value, password.value);
    });
  }

  searchHandler(handler) {
    this.#searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }

  hashHandler(handler) {
    window.addEventListener("hashchange", handler);
  }

  paginationHandler(handler) {
    this.#pageBtns.addEventListener("click", function (e) {
      const navData = e.target.dataset.nav;
      handler(navData);
    });
  }

  servingsHandler(handler) {
    this.#servBtns.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__update--serving");
      const servNum = document.querySelector(".info__persons");
      const curNum = +servNum.dataset.number;

      if (!btn) return;

      const nav = btn.dataset.nav;

      if (+servNum.dataset.number === 1 && nav === "minus") return;

      nav === "plus"
        ? (servNum.dataset.number = +servNum.dataset.number + 1)
        : (servNum.dataset.number = +servNum.dataset.number - 1);

      handler(+servNum.dataset.number, curNum);
    });
  }

  bookmarksHandler(handler) {
    this.#bookBtn.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn__bookmark--serving");

      if (!btn) return;

      btn.classList.toggle("btn--active");
      const isActive = btn.classList.contains("btn--active");

      handler(isActive);
    });
  }

  overlayHandler() {
    const overlay = document.querySelector(".overlay");

    this.#addRecipeBtn.addEventListener("click", () => {
      this.#overlayWindow.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
    });

    this.#overlayWindow.addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
    });
  }

  get searchField() {
    return this.#searchField;
  }
}

const eventHandlers = new EventHandlers();

export default eventHandlers;
