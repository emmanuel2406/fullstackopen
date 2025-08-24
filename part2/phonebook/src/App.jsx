import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState(null)

  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [updateNotification, setUpdateNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const findPerson = persons.find(person => person.name === newName)
    if (findPerson) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)) {
        const personObject = {name: newName, number: newNumber}
        personService
          .update(findPerson.id, personObject)
          .then(returnedPerson => {
            const newPersons = persons.map(person => person.id === findPerson.id ? returnedPerson : person)
            setPersons(newPersons)
            const newFilteredPersons = filteredPersons.map(person => person.id === findPerson.id ? returnedPerson : person)
            setFilteredPersons(newFilteredPersons)
            setUpdateNotification(`Updated ${newName}'s number`)
            setTimeout(() => {
              setUpdateNotification(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorNotification(`Information of '${newName}' was already deleted from server`)
            setTimeout(() => {
              setErrorNotification(null)
            }, 5000)
            console.log(error)
          })
      }
      return
    }
    const personObject = {name: newName, number: newNumber}
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setFilteredPersons(filteredPersons.concat(returnedPerson))
        setUpdateNotification(`Added ${newName}`)
            setTimeout(() => {
              setUpdateNotification(null)
        }, 5000)
      })
      .catch(error => {
        setErrorNotification(`Person validation failed: ${error.response.data.error}`)
        setTimeout(() => {
          setErrorNotification(null)
        }, 5000)
      })
    setNewName('')
    setNewNumber('')
  }

  const filterPersons = (event) => {
    const newSearchName = event.target.value
    setSearchName(newSearchName)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(newSearchName.toLowerCase())))
  }

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
    personService
      .deletePerson(id)
      .then(() => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
        const newFilteredPersons = filteredPersons.filter(person => person.id !== id)
        setFilteredPersons(newFilteredPersons)
      })
      .catch(error => {
          alert(`the person '${persons.find(person => person.id === id).name}' was already deleted from server`)
          console.log(error)
        })
    }
  }

  if (persons === null) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorNotification} type='error' />
      <Notification message={updateNotification} type='notification' />

      <Filter searchName={searchName} filterPersons={filterPersons} />

      <h3>Add a new</h3>

      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={(event) => setNewName(event.target.value)} handleNumberChange={(event) => setNewNumber(event.target.value)} />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App