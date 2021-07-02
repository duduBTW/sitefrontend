import axios from "axios";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    common: {
      Authorization: `Bearer ${Cookies.get("Authorization")}`,
    },
  },
});
