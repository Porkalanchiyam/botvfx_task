import prisma from "../db/prisma.js";
import { makeSuccessResponse } from "../utils/index.js";

export const createComment = async (req, res) => {
  const content = req.body.content.trim();
  const createdBy = req.body.createdBy.trim();
  const postId = req.body.postId.trim();

  const comment = await prisma.comment.create({
    data: {
      content,
      createdBy,
      postId,
    },
  });

  res.status(201).json(makeSuccessResponse({ comment }));
};

export const updateComment = async (req, res) => {
  const content = req.body.content.trim();
  const createdBy = req.body.createdBy.trim();
  const postId = req.body.postId.trim();
  const id = req.body.id.trim();

  const comment = await prisma.comment.update({
    data: {
      content,
      createdBy,
      postId,
    },
    where: {
      id,
    },
  });

  res.status(200).json(makeSuccessResponse({ comment }));
};

export const deleteComment = async (req, res) => {
  const id = req.body.id.trim();

  const comment = await prisma.comment.update({
    data: {
      isActive: false, //need to update is active false for post and update
    },
    where: {
      id,
    },
  });

  res.status(204).json(makeSuccessResponse({}));
};

export const getComment = async (req, res) => {
  const id = req.query?.id?.trim();
  const filter = {};
  if (id) {
    filter.id = id;
    filter.isActive = true;
  }

  const comments = await prisma.comment.findMany({
    where: filter,
  });
  if (id) {
    if (comments.length > 0) {
      res.status(200).json(makeSuccessResponse({ comment: comments[0] }));
    } else {
      const error = new Error("Comment Not Found");
      error.httpCode = 404;
      throw error;
    }
  } else {
    res.status(200).json(makeSuccessResponse({ comments }));
  }
};
