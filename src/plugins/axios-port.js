import { setClient } from "~/infrastructure/axiosClient";

export default ({ app, store }) => {
  setClient(app.$axios);
}