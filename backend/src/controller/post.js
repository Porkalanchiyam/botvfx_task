import prisma from "../db/prisma.js";
import { makeSuccessResponse } from "../utils/index.js";

export const createPost = async (req, res) => {
  const content = req.body.content.trim();
  const createdBy = req.body.createdBy.trim();

  const post = await prisma.post.create({
    data: {
      content,
      createdBy,
    },
  });

  res.status(201).json(makeSuccessResponse({ post }));
};

export const updatePost = async (req, res) => {
  const content = req.body.content.trim();
  const createdBy = req.body.createdBy.trim();
  const id = req.body.id.trim();

  const post = await prisma.post.update({
    data: {
      content,
      createdBy,
    },
    where: {
      id,
    },
  });

  res.status(200).json(makeSuccessResponse({ post }));
};

export const deletePost = async (req, res) => {
  const id = req.body.id.trim();

  const post = await prisma.post.update({
    data: {
      isActive: false, //need to update is active false for post and update
    },
    where: {
      id,
    },
  });

  res.status(204).json(makeSuccessResponse({}));
};

export const getPost = async (req, res) => {
  const id = req.query?.id?.trim();
  const filter = { isActive: true };
  const includes = {
    owner: {
      select: {
        firstName: true,
        lastName: true,
        id: true,
      },
    },
  };
  if (id) {
    filter.id = id;
    includes.comments = {
      select: {
        content: true,
        id: true,
        owner: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
          },
        },
      },
      // include: {},
    };
  }

  const posts = await prisma.post.findMany({
    where: filter,
    include: includes,
  });
  if (id) {
    if (posts.length > 0) {
      res.status(200).json(makeSuccessResponse({ post: posts[0] }));
    } else {
      const error = new Error("Post Not Found");
      error.httpCode = 404;
      throw error;
    }
  } else {
    res.status(200).json(makeSuccessResponse({ posts }));
  }
};
