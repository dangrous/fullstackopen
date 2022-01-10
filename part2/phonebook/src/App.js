import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    let duplicate = false
    for (var i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        duplicate = true
        break
      }
    }
    if (!duplicate) {
      const newPerson = {
        name: newName
      }

      setPersons(persons.concat(newPerson))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

const Numbers = ({persons}) => persons.map((person) =>
    <div key={person.name}>{person.name}</div>)

export default App