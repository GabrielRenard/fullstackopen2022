import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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

  const filterNameHandler = e => {
    setSearch(e.target.value);
  };

  const phoneBookList = persons
    .filter(person => {
      return person.name.toLowerCase().includes(search.toLowerCase());
    })
    .map(person => (
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    ));

  return (
    <div>
      <div>
        <label htmlFor="filter">Filter</label>
        <input type="text" id="filter" onChange={filterNameHandler} />
      </div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" onChange={nameChangeHandler} value={newName} />
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <input id="number" onChange={numberChangeHandler} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{phoneBookList}</ul>
    </div>
  );
};

export default App;
