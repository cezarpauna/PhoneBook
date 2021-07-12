import React, { useEffect, useState } from 'react'
import phoneService from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (newNumber === '') {
      alert('You must enter a phone number')
    } else {
      if (persons.filter(p => p.name === newName).length > 0) {
        if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one ?')) {
          const updatePerson = persons.find(p => p.name === newName)
          console.log(updatePerson)
          updatePerson.number = newNumber
          phoneService
            .update(updatePerson.id, updatePerson)
            .then(response => {
              setPersons(persons.map(
                pers => pers.id !== updatePerson.id ? pers : response
              ))
            })
            setNewName('')
            setNewNumber('')
        } else {
          setNewName('')
          setNewNumber('')
        }
      } else
        phoneService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
          })
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleDelete = (props) => {
    console.log(props.id)
    const returnF = () => {
      if (window.confirm("Do you want to delete " + props.name)) {
        phoneService
          .deleteUser(props.id)
        setPersons(persons.filter((pers) => pers.id !== props.id))
      }
    }
    return returnF
  }

  const personsToShow = persons.filter((p) => p.name.startsWith(newFilter))
  console.log(personsToShow)

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={newFilter} onChange={handleNewFilter} />
        </div>
      </form>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
          <br />
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {newFilter !== ''
      ? personsToShow.map((p) => <p key={p.id}>{p.name} {p.number}</p>)
      : persons.map((p) =>  <p key={p.name}>{p.name} {p.number}
      <button onClick={handleDelete(p)}>delete</button></p>)}
    </div>
  )
}

export default App
