import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleOnSubmit = e => {
    e.preventDefault();
    const duplicateName = persons.filter(person => person.name === newName);
    duplicateName.length
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat({ name: newName }));
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const renderPersons = persons.map(person => (
    <li key={person.name}>{person.name}</li>
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{renderPersons}</ul>
    </div>
  );
};

export default App;
