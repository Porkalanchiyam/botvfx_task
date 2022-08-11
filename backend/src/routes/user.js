import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from "../controller/user.js";
import validationMiddleware from "../middlewares/validation.js";
import {
  userInsertSchema,
  userUpdateSchema,
  idSchema,
  idSchemaOptional,
} from "../validationSchema/index.js";

const router = express.Router();

router.post("/add", validationMiddleware(userInsertSchema), createUser);
router.put("/update", validationMiddleware(userUpdateSchema), updateUser);
router.delete("/delete", validationMiddleware(idSchema), deleteUser);
router.get("/", validationMiddleware(idSchemaOptional, "query"), getUser);

export default router;
