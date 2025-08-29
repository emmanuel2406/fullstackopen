import React from 'react'
import noteService from '../services/notes'

const Logout = ({ setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    noteService.setToken(null)
  }
    return (
        <button
          style={{ marginLeft: '5px', backgroundColor: 'red', color: 'white' }}
          onClick={handleLogout}
        >
          Logout
        </button>
    )
}

export default Logout