import mem from "mem";
import { axiosPublic } from "./axiosPublic";
import Cookies from "js-cookie";
import constants from "./constants";

const refreshTokenFn = async () => {
  const refresh_token = Cookies.get("refresh_token") || "";

  try {
    const response = await axiosPublic.post("api/auth/refresh", null, {
      headers: {
        "Authorization": `Bearer ${refresh_token}`
      }
    });

    const { session } = response.data;

    if (!session?.access_token) {
      Cookies.remove("refresh_token");
      Cookies.remove("access_token");
    }

    Cookies.set("access_token", session.access_token);

    return session;
  } catch (error) {
    Cookies.remove("refresh_token");
    Cookies.remove("access_token");
  }
};


export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge: constants.MAX_AGE,
});