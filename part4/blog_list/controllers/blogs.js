const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  if (!request.user) {
    return response.status(400).json({ error: 'User id missing or not valid' })
  }

  if (!body.title) {
    return response.status(400).json({ error: 'title is missing' })
  }

  if (!body.url) {
    return response.status(400).json({ error: 'url is missing' })
  }

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    ...body,
    user: request.user._id
  })

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (!request.user) {
    return response.status(400).json({ error: 'User id missing or not valid' })
  }
  if (blog.user.id.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  if (!blog) {
    return response.status(404).end()
  }

  if (!request.user) {
    return response.status(400).json({ error: 'User id missing or not valid' })
  }
  if (blog.user.id.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  blog.title = request.body.title || blog.title
  blog.author = request.body.author || blog.author
  blog.url = request.body.url || blog.url
  blog.likes = request.body.likes || blog.likes
  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter