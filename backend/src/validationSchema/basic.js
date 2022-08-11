import * as yup from "yup";

export const idSchema = yup.object().shape({
  id: yup.string().required("Id is Required."),
});

export const idSchemaOptional = yup.object().shape({
  id: yup.string().nullable(),
});
