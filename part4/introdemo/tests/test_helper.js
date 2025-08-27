const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  }
]

const initialUsers = [
  {
    username: 'testUser',
    name: 'testUser',
    // Using a placeholder hash to satisfy schema; tests shouldn't rely on real hashing here
    passwordHash: 'placeholder_hash',
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const clearDb = async () => {
  await User.deleteMany({})
  await Note.deleteMany({})
}

// Seeds the database with one user and two notes linked to that user
const seedUsersAndNotes = async () => {
  await clearDb()

  const userDoc = new User(initialUsers[0])
  const savedUser = await userDoc.save()

  const noteDocs = await Note.insertMany(
    initialNotes.map(n => ({ ...n, user: savedUser._id }))
  )

  savedUser.notes = noteDocs.map(n => n._id)
  await savedUser.save()

  return { user: savedUser, notes: noteDocs }
}

module.exports = {
  initialNotes,
  initialUsers,
  nonExistingId,
  notesInDb,
  usersInDb,
  clearDb,
  seedUsersAndNotes,
}