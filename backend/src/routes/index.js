import express from "express";

import { makeSuccessResponse } from "../utils/index.js";
import user from "./user.js";
import Post from "./post.js";
import Comment from "./comment.js";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json(makeSuccessResponse(`Server running on port ${process.env.PORT}`));
});

router.use("/user", user);
router.use("/post", Post);
router.use("/comment", Comment);

export default router;
