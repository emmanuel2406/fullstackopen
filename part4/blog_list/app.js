const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

const blogsRouter = require('./controllers/blogs')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app