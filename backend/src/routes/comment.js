import express from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  getComment,
} from "../controller/comment.js";
import validationMiddleware from "../middlewares/validation.js";
import {
  commentInsertSchema,
  commentUpdateSchema,
  idSchema,
  idSchemaOptional,
} from "../validationSchema/index.js";

const router = express.Router();

router.post("/add", validationMiddleware(commentInsertSchema), createComment);
router.put("/update", validationMiddleware(commentUpdateSchema), updateComment);
router.delete("/delete", validationMiddleware(idSchema), deleteComment);
router.get("/", validationMiddleware(idSchemaOptional, "query"), getComment);

export default router;
