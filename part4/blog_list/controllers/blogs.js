const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title) {
    return response.status(400).json({ error: 'title is missing' })
  }

  if (!request.body.url) {
    return response.status(400).json({ error: 'url is missing' })
  }

  if (!request.body.likes) {
    request.body.likes = 0
  }

  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter