const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

describe.only('when there is initially one user in db', () => {
  beforeEach(async () => {
    await helper.clearDb()
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'superUser', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails if password is too short', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sa',
    }

    await api.post('/api/users').send(newUser).expect(400)
  })

  test('creation fails if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Root User',
      password: 'sekret',
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})