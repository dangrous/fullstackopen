import React from "react";

const Numbers = ({ persons, search, handleDelete }) =>
  persons
    .filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((person) => (
      <div key={person.name}>
        {person.name} {person.number} <button onClick={() => handleDelete(person.name, person.id)}>delete</button>
      </div>
    ));

export default Numbers