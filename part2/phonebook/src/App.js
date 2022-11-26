import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const nameChangeHandler = e => {
    setNewName(e.target.value);
  };

  const numberChangeHandler = e => {
    setNewNumber(e.target.value);
  };

  const formSubmitHandler = e => {
    e.preventDefault();

    if (persons.find(el => el.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`);
      setNewName("");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: Math.random(),
    };

    setPersons(persons.concat(newPerson));

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmitHandler}>
        <div>
          name: <input onChange={nameChangeHandler} value={newName} />
        </div>
        <div>
          number: <input onChange={numberChangeHandler} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
