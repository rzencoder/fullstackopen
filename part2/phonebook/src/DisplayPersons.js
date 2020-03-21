import React from "react";

const DisplayPersons = ({ persons, newSearch }) => {
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
      <h2>Numbers</h2>
      <ul>{renderPersons}</ul>
    </div>
  );
};

export default DisplayPersons;
