import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import DisplayPersons from "./DisplayPersons";
import AddPerson from "./AddPerson";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(res => {
      setPersons(res.data);
    });
  }, []);

  const handleOnSubmit = e => {
    e.preventDefault();
    const duplicateName = persons.filter(person => person.name === newName);
    duplicateName.length
      ? alert(`${newName} is already added to the phonebook`)
      : axios
          .post("http://localhost:3001/persons", {
            name: newName,
            number: newNumber
          })
          .then(res => {
            setPersons(persons.concat(res.data));
          });
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
