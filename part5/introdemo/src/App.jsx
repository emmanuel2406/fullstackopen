import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)


  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
        console.log(error)
      })
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      setUser(user)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm
        loginUser={handleLogin}
      />
    </Togglable>
  )

  const noteFormRef = useRef()

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} type='error' />

      {!user && loginForm()}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>

      {user && <Logout setUser={setUser} />}
      <Footer />
    </div>
  )
}

export default App