/*
  A custom Error for handling
  authentication and token expiration cases.
  
 */

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
  }
}

export default AuthError;
