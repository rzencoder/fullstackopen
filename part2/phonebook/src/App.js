import React, { useState, useEffect } from "react";
import Search from "./Search";
import DisplayPersons from "./DisplayPersons";
import Message from "./Message";
import AddPerson from "./AddPerson";
import {
  addPerson,
  getPhonebook,
  deletePerson,
  replaceNumber,
} from "./services/numberService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [message, setMessage] = useState({});

  useEffect(() => {
    getPhonebook().then((res) => setPersons(res));
  }, []);

  const handleMessage = (data) => {
    setMessage(data);
    setTimeout(() => {
      setMessage({});
    }, 3000);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const duplicateName = persons.filter((person) => person.name === newName);
    duplicateName.length
      ? window.confirm(
          `${newName} is already added to the phonebook. Replace the old number with a new one?`
        ) && handleNumberReplacement(duplicateName[0])
      : addPerson({ name: newName, number: newNumber })
          .then((data) => {
            setPersons(persons.concat(data));
            handleMessage({ text: `Added ${data.name}`, status: "ok" });
          })
          .catch((error) => {
            handleMessage({ text: String(error), status: "error" });
          });
  };

  const handleNumberReplacement = (person) => {
    const data = { ...person, number: newNumber };
    replaceNumber(person.id, data).then((res) => {
      const filteredPersons = persons.filter((val) => val.name !== res.name);
      setPersons([...filteredPersons, res]);
      handleMessage({ text: "Number Changed Successfully", status: "ok" });
    });
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };
  const handleDelete = (person) => {
    window.confirm(`Delete ${person.name}?`) &&
      deletePerson(person)
        .then((data) => {
          const newPersons = persons.filter((val) => val.name !== person.name);
          setPersons(newPersons);
        })
        .catch((error) => {
          handleMessage({
            text: `${person.name} has been already been deleted from the server`,
            status: "error",
          });
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
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
