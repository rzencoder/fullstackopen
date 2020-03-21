import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import DisplayPersons from "./DisplayPersons";
import AddPerson from "./AddPerson";
import {
  addPerson,
  getPhonebook,
  deletePerson
} from "./services/numberService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    getPhonebook().then(res => setPersons(res));
  }, []);

  const handleOnSubmit = e => {
    e.preventDefault();
    const duplicateName = persons.filter(person => person.name === newName);
    duplicateName.length
      ? alert(`${newName} is already added to the phonebook`)
      : addPerson(newName, newNumber).then(data =>
          setPersons(persons.concat(data))
        );
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
  const handleDelete = person => {
    window.confirm(`Delete ${person.name}?`) &&
      deletePerson(person).then(data => {
        const newPersons = persons.filter(val => val.name !== person.name);
        setPersons(newPersons);
      });
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
      <DisplayPersons
        persons={persons}
        handleDelete={handleDelete}
        newSearch={newSearch}
      />
    </div>
  );
};

export default App;
