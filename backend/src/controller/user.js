import prisma from "../db/prisma.js";
import { makeSuccessResponse } from "../utils/index.js";

export const createUser = async (req, res) => {
  const firstName = req.body.firstName.trim();
  const lastName = req.body.lastName?.trim() || null;
  const emailId = req.body.emailId.trim().toLowerCase();

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      emailId,
    },
  });

  res.status(201).json(makeSuccessResponse({ user }));
};

export const updateUser = async (req, res) => {
  const firstName = req.body.firstName.trim();
  const lastName = req.body.lastName?.trim() || null;
  const emailId = req.body.emailId.trim().toLowerCase();
  const id = req.body.id.trim();

  const user = await prisma.user.update({
    data: {
      firstName,
      lastName,
      emailId,
    },
    where: {
      id,
    },
  });

  res.status(200).json(makeSuccessResponse({ user }));
};

export const deleteUser = async (req, res) => {
  const id = req.body.id.trim();

  const user = await prisma.user.update({
    data: {
      isActive: false, //need to update is active false for post and update
    },
    where: {
      id,
    },
  });

  res.status(204).json(makeSuccessResponse({}));
};

export const getUser = async (req, res) => {
  const id = req.query?.id?.trim();
  const filter = { isActive: true };
  if (id) {
    filter.id = id;
    filter.isActive = true;
  }

  const users = await prisma.user.findMany({
    where: filter,
  });
  if (id) {
    if (users.length > 0) {
      res.status(200).json(makeSuccessResponse({ user: users[0] }));
    } else {
      const error = new Error("User Not Found");
      error.httpCode = 404;
      throw error;
    }
  } else {
    res.status(200).json(makeSuccessResponse({ users }));
  }
};
