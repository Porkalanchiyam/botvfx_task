import * as yup from "yup";
import { idSchema } from "./basic.js";

export const commentInsertSchema = yup.object().shape({
  content: yup.string().trim().required("Content is Required."),
  createdBy: yup.string().trim().required("Created by is Required."),
  postId: yup.string().required("postId is Required."),
});

export const commentUpdateSchema = commentInsertSchema.concat(idSchema);
