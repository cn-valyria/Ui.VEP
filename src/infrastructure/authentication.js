import axiosClient from "~/infrastructure/axiosClient";

const bearerTokenKey = "valyria.exchange.token";

export async function authenticate(nationId, rulerName, uniqueCode) {
  const payload = { nationId, rulerName, uniqueCode };
  const response = await axiosClient.post("user/authenticate", payload);
  localStorage.setItem(bearerTokenKey, response.data);
}

export function getBearerToken() {
  return localStorage.getItem(bearerTokenKey);
}