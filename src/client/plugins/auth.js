import axios from "axios";
const API_URL = "http://localhost:7071";

class AuthService {
  login(user) {
    console.log("this works!");
  }
}

export default ({ app }, inject) => {
  inject("auth", new AuthService())
}