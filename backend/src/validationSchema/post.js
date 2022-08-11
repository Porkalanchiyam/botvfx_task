import * as yup from "yup";
import { idSchema } from "./basic.js";

export const postInsertSchema = yup.object().shape({
  content: yup.string().trim().required("Content is Required."),
  createdBy: yup.string().trim().required("Created by is Required."),
});

export const postUpdateSchema = postInsertSchema.concat(idSchema);
