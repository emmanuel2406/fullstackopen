const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

const user = {
  username: 'root',
  name: 'superUser',
  password: 'sekret',
}

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(initialBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(initialBlogs)
    assert.deepStrictEqual(result, initialBlogs[2])
  })

  test('of a list with one blog is the blog itself', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('of an empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, null)
  })
})

describe('most blogs', () => {
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    assert.deepStrictEqual(result, ['Robert C. Martin', 3])
  })

  test('of a list with one blog is the blog itself', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, ['Edsger W. Dijkstra', 1])
  })

  test('of an empty list is null', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, null)
  })
})

describe('most likes', () => {
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(initialBlogs)
    assert.deepStrictEqual(result, ['Edsger W. Dijkstra', 17])
  })

  test('of a list with one blog is the blog itself', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, ['Edsger W. Dijkstra', 5])
  })

  test('of an empty list is null', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, null)
  })
})
describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await helper.clearDb()
    // Create user with hashed password
    const passwordHash = await bcrypt.hash(user.password, 10)
    const userToSave = new User({
      username: user.username,
      name: user.name,
      passwordHash: passwordHash
    })
    await userToSave.save()
    await Blog.insertMany(initialBlogs.map(blog => ({ ...blog, user: userToSave._id })))
  })
  const getTokenFromUser = async (user) => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: user.username, password: user.password })
      .expect(200)
    return loginResponse.body.token
  }

  describe('blog api', () => {

    test('can fetch all blogs', async() => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('can add a blog', async() => {
      const token = await getTokenFromUser(user)

      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        likes: 5,
        userId: user.id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

      const contents = blogsAtEnd.map(r => r.title)
      assert(contents.includes('Test Blog'))
    })

    test('if likes is missing, it defaults to 0', async() => {
      const token = await getTokenFromUser(user)

      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        userId: user.id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
    })

    describe('posting a blog with missing fields', () => {
      test('title is missing', async() => {
        const token = await getTokenFromUser(user)
        const newBlog = {
          author: 'Test Author',
          url: 'https://test.com',
          likes: 5
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
      })

      test('url is missing', async() => {
        const token = await getTokenFromUser(user)
        const newBlog = {
          title: 'Test Blog',
          author: 'Test Author',
          likes: 5
        }

        await api
          .post('/api/blogs')
          .send(newBlog)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
      })
    })

    test('fails to add blog if no token is provided', async() => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        likes: 5,
        userId: user.id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })
  })

  test('blog has id field', async() => {
    const response = await helper.blogsInDb()
    const blog = response[0]
    assert.strictEqual(blog.id, initialBlogs[0]._id.toString())
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async() => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      const token = await getTokenFromUser(user)

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })

    test('fails with status code 404 if id is invalid', async() => {
      const invalidId = '5a422bc61b54a676234d17fd'
      const blogsAtStart = await helper.blogsInDb()
      const token = await getTokenFromUser(user)

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with status code 401 if the token is invalid', async() => {
      const invalidToken = 'invalidToken'
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${invalidToken}`)
        .expect(401)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async() => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      blogToUpdate.likes = 99

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd[0].likes, blogToUpdate.likes)
    })
    test('fails with status code 404 if id is invalid', async() => {
      const invalidId = '5a422bc61b54a676234d17fd'
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes = 99

      await api
        .put(`/api/blogs/${invalidId}`)
        .send(blogToUpdate)
        .expect(404)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})