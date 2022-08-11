import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
} from "../controller/post.js";
import validationMiddleware from "../middlewares/validation.js";
import {
  postInsertSchema,
  postUpdateSchema,
  idSchema,
  idSchemaOptional,
} from "../validationSchema/index.js";

const router = express.Router();

router.post("/add", validationMiddleware(postInsertSchema), createPost);
router.put("/update", validationMiddleware(postUpdateSchema), updatePost);
router.delete("/delete", validationMiddleware(idSchema), deletePost);
router.get("/", validationMiddleware(idSchemaOptional, "query"), getPost);

export default router;
