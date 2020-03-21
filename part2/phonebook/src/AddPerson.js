import React from "react";

const AddPerson = ({
  handleOnSubmit,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber
}) => {
  return (
    <div>
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
    </div>
  );
};

export default AddPerson;
