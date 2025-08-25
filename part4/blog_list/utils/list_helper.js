const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  // return top author with the number of blogs
  const authorBlogCount = {}

  for (let i = 0; i < blogs.length; i ++) {
    if (!(blogs[i].author in authorBlogCount)) {
        authorBlogCount[blogs[i].author] = 0
    }
    authorBlogCount[blogs[i].author] += 1
  }

  return Object.entries(authorBlogCount).reduce((max, [author, count]) => count > max[1] ? [author, count] : max, ['', 0])
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  // return top author with the number of likes
  const authorLikes = {}

  for (let i = 0; i < blogs.length; i ++) {
    if (!(blogs[i].author in authorLikes)) {
        authorLikes[blogs[i].author] = 0
    }
    authorLikes[blogs[i].author] += blogs[i].likes
  }

  return Object.entries(authorLikes).reduce((max, [author, likes]) => likes > max[1] ? [author, likes] : max, ['', 0])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}