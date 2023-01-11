import { getBearerToken } from "~/infrastructure/authentication"

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    const token = getBearerToken();
    console.log(token);
    if (token) {
      $axios.setToken(token, "Bearer");
    } else {
      // Shorthand for removing the token since one doesn't exist in localStorage
      $axios.setToken(false);
    }

    return config;
  })
}