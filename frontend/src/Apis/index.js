import router from "../config/router";
import { makeRequest } from "../utils";

//to fetch users
export const fetchUser = async () => {
  const { success, data } = await makeRequest(router.Api.User.Get, "GET");
  let errMsg;
  if (success) {
    return { success: true, data: data.users, errMsg: "" };
  }

  errMsg = data?.message || errMsg;
  return { success: false, errMsg, data: [] };
};

//to fetch users
export const userApiHandler = async (url, method, input, fetchAgain) => {
  const { success, data } = await makeRequest(url, method, input);
  let errMsg;
  await fetchAgain();
  if (success) {
    return { success: true, data: data.user, errMsg: "" };
  }
  errMsg = data?.message || errMsg;
  return { success: false, errMsg, data: [] };
};

//to fetch Post
export const fetchPost = async (id) => {
  let url = router.Api.Post.Get;
  if (typeof id === "string") {
    url += `?id=${id}`;
  }
  const { success, data } = await makeRequest(url, "GET");
  let errMsg;
  if (success) {
    if (typeof id === "string") {
      return { success: true, data: data.post, errMsg: "" };
    }
    return { success: true, data: data.posts, errMsg: "" };
  }

  errMsg = data?.message || errMsg;
  return { success: false, errMsg, data: [] };
};
