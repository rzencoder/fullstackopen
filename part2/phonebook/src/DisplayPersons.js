import React from "react";

const DisplayPersons = ({ persons, newSearch, handleDelete }) => {
  const renderPersons = persons.map(person => {
    if (person.name.toLowerCase().includes(newSearch)) {
      return (
        <div key={person.name}>
          <div>
            {person.name} {person.number}
          </div>
          <button onClick={() => handleDelete(person)}>Delete</button>
        </div>
      );
    }
  });
  return (
    <div>
      <h2>Numbers</h2>
      <div>{renderPersons}</div>
    </div>
  );
};

export default DisplayPersons;
