const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  if (!request.user) {
    return response.status(400).json({ error: "User id missing or not valid" });
  }

  if (!body.title) {
    return response.status(400).json({ error: "title is missing" });
  }

  if (!body.url) {
    return response.status(400).json({ error: "url is missing" });
  }

  if (!body.likes) {
    body.likes = 0;
  }

  const blog = new Blog({
    ...body,
    user: request.user._id,
  });

  const savedBlog = await blog.save();
  request.user.blogs = request.user.blogs.concat(savedBlog._id);
  await request.user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });

  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  if (!request.user) {
    return response.status(400).json({ error: "User id missing or not valid" });
  }
  if (blog.user.id.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: "Unauthorized" });
  }
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });

  if (!blog) {
    return response.status(404).end();
  }

  if (!request.user) {
    return response.status(400).json({ error: "User id missing or not valid" });
  }
  if (blog.user.id.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  // Update fields atomically
  const updateData = {};
  if (request.body.title !== undefined) updateData.title = request.body.title;
  if (request.body.author !== undefined)
    updateData.author = request.body.author;
  if (request.body.url !== undefined) updateData.url = request.body.url;
  if (request.body.likes !== undefined) updateData.likes = request.body.likes;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updateData,
    { new: true, runValidators: true }
  ).populate("user", { username: 1, name: 1 });

  response.json(updatedBlog);
});

// Atomic like increment endpoint - no need to read current state
blogsRouter.post("/:id/likes", async (request, response) => {
  // Use atomic $inc to increment likes, preventing race conditions
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $inc: { likes: 1 } },
    { new: true, runValidators: true }
  ).populate("user", { username: 1, name: 1 });

  if (!updatedBlog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(400).json({ error: "User id missing or not valid" });
  }

  const comment = request.body.comment;
  if (!comment) {
    return response.status(400).json({ error: "Comment is missing" });
  }

  // Use atomic $push to add comment, preventing race conditions
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: comment } },
    { new: true, runValidators: true }
  ).populate("user", { username: 1, name: 1 });

  if (!updatedBlog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  response.json(updatedBlog);
});

module.exports = blogsRouter;
