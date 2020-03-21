import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const handleOnSubmit = e => {
    e.preventDefault();
    const duplicateName = persons.filter(person => person.name === newName);
    duplicateName.length
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));
  };

  const handleNameChange = e => {
    setNewName(e.target.value);
  };
  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };
  const handleSearchChange = e => {
    setNewSearch(e.target.value);
  };

  const renderPersons = persons.map(person => {
    if (person.name.toLowerCase().includes(newSearch)) {
      return (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      );
    }
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input onChange={handleSearchChange} value={newSearch} />
      </div>
      <h2>Add a New Number</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
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
