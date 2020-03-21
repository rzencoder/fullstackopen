import React, { useState } from "react";
import Search from "./Search";
import DisplayPersons from "./DisplayPersons";
import AddPerson from "./AddPerson";

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange} newSearch={newSearch} />
      <AddPerson
        handleNameChange={handleNameChange}
        handleOnSubmit={handleOnSubmit}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <DisplayPersons persons={persons} newSearch={newSearch} />
    </div>
  );
};

export default App;
