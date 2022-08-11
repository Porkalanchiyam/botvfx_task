import * as yup from "yup";
import { idSchema } from "./basic.js";

export const userInsertSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z ]*$/, "Please enter valid first name")
    .max(40)
    .required("First Name is Required."),
  lastName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z ]*$/, "Please enter valid last name")
    .max(40)
    .nullable(),
  emailId: yup
    .string()
    .trim()
    .email("Invalid Email.")
    .required("Email is Required."),
});

export const userUpdateSchema = userInsertSchema.concat(idSchema);
