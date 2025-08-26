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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  blog.title = request.body.title || blog.title
  blog.author = request.body.author || blog.author
  blog.url = request.body.url || blog.url
  blog.likes = request.body.likes || blog.likes
  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

module.exports = blogsRouter