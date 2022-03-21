import { API_KEY } from "./config.js";
import AuthError from "./errors.js";

// Helper function used in the controller module

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took took longer than ${sec} seconds!`));
    }, sec * 1000);
  });
};

// If fetching the data takes too long, an Error is being thrown
// Function that takes care of all requests to the API
export const getJSON = async function (url) {
  try {
    const response = fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    // Creating a RACE condition - if the request takes more than the time
    // specified in the timeout function it will reject the Promise with an error
    const result = await Promise.race([response, timeout(15)]);

    const data = await result.json();

    // Throwing custom error if the API_KEY has expired - it gets
    // handled with a custom ErrorHandler in the controller.
    if (result.status === 401) throw new AuthError(data.msg);

    if (!result.ok) throw new Error(data.msg);

    return data;
  } catch (err) {
    throw err;
  }
};

// Function that deals exclusively with getting an API Acess Token
export const getKEY = async function (url, user, pass) {
  try {
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    });

    const result = await Promise.race([response, timeout(15)]);

    const data = await result.json();

    if (!result.ok) throw new Error(data.msg);

    return data;
  } catch (err) {
    throw err;
  }
};

// Function that checks if it is a first time login - checks
// if there is a 'cookie' already - which is being simulated through localStorage.
export const isFirstLogin = function () {
  const check_key = window.localStorage.getItem("api_token");
  if (!check_key) return true;
};
