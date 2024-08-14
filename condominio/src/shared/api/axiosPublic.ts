import axios from "axios";
import constants from "./constants";

axios.defaults.baseURL = constants.BASE_URL;

export const axiosPublic = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});