import React, { useEffect, useState } from "react";
import personService from './services/persons'
import Numbers from "./components/Numbers"
import Filter from "./components/Filter"
import Form from "./components/Form"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])
  
  const addPerson = (event) => {
    event.preventDefault();
    let duplicate = false;
    let id = 0;
    // I think this can be done more elegantly and will need to be updated once there's more info in here...
    for (var i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        duplicate = true;
        id = persons[i].id
        break;
      }
    }
    
    const newPerson = {
      name: newName,
      number: newNumber ? newNumber : "(no number provided)",
    };

    if (!duplicate) {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person :returnedPerson))
            setNewName("");
            setNewNumber("");
            setMessage(`Replaced ${returnedPerson.name}'s number`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Numbers persons={persons} search={search} handleDelete={handleDelete} />
    </div>
  );
};

const Notification = ({ message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className='alert'>
      {message}
    </div>
  )
}

export default App;
