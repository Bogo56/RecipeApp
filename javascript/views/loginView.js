class LoginView {
  #overlay = document.querySelector(".login__screen--overlay");
  #loginForm = document.querySelector(".login__screen");

  showLogin() {
    [this.#overlay, this.#loginForm].forEach((el) => {
      el.classList.remove("hidden");
    });

    // using the value for easier conditional chaining and
    // short circuiting inside the controller

    return true;
  }

  hideLogin() {
    [this.#overlay, this.#loginForm].forEach((el) => {
      el.classList.add("hidden");
    });
  }
}

const loginView = new LoginView();

export default loginView;
