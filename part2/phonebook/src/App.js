import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");

  const inputChangeHandler = e => {
    setNewName(e.target.value);
  };

  const formSubmitHandler = e => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      id: Math.random(),
    };

    setPersons(persons.concat(newPerson));

    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmitHandler}>
        <div>
          name: <input onChange={inputChangeHandler} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
