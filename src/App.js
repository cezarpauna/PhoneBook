import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (newNumber === '') {
      alert('You must enter a phone number')
    } else {
      persons.filter(p => p.name === newName).length > 0
      ? alert(newName + ' is already added to phonebook')
      : setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('')
      console.log(persons)
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
      ? personsToShow.map((p) => <p key={p.name}>{p.name} {p.number}</p>)
      : persons.map((p) => <p key={p.name}>{p.name} {p.number}</p>)}
    </div>
  )
}

export default App
