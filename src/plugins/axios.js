export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    // Stupid hack because Azure SWA overwrites the Authorization header in Prod *shakes fist*
    config.headers.common["X-Valyria-Auth"] = config.headers.common["Authorization"];
  });
}