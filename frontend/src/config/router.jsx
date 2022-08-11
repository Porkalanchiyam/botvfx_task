import { Home, User, Post, ViewPost, NotFound } from "../screens";

const router = {
  Home: {
    path: "/",
    component: Home,
    isPrivate: false,
  },
  User: {
    path: "/user",
    component: User,
    isPrivate: false,
  },
  Post: {
    path: "/post",
    component: Post,
    isPrivate: false,
  },
  ViewPost: {
    path: "/viewPost/:id",
    component: ViewPost,
    isPrivate: false,
  },
  NotFound: {
    path: "*",
    component: NotFound,
    isPrivate: false,
  },
  Api: {
    User: {
      Get: "/user",
      Add: "/user/add",
      Update: "/user/update",
      Delete: "/user/delete",
    },
    Post: {
      Get: "/post",
      Add: "/post/add",
      Update: "/post/update",
      Delete: "/post/delete",
    },
    Comment: {
      Get: "/comment",
      Add: "/comment/add",
      Update: "/comment/update",
      Delete: "/comment/delete",
    },
  },
};

export default router;
