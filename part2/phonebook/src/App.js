import React, { useState } from "react";
import Numbers from "./components/Numbers"
import Filter from "./components/Filter"
import Form from "./components/Form"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    let duplicate = false;
    // I think this can be done more elegantly and will need to be updated once there's more info in here...
    for (var i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        duplicate = true;
        break;
      }
    }
    if (!duplicate) {
      const newPerson = {
        name: newName,
        number: newNumber ? newNumber : "(no number provided)",
      };

      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Numbers persons={persons} search={search} />
    </div>
  );
};

export default App;
