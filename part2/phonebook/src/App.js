import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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
      return (
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.number.includes(search.toLowerCase())
      );
    })
    .map(person => (
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    ));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterNameHandler={filterNameHandler} />
      <h3>Add new</h3>
      <PersonForm
        onChangeName={nameChangeHandler}
        onChangeNumber={numberChangeHandler}
        onSubmitForm={formSubmitHandler}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        search={search}
        phoneBookList={phoneBookList}
      />
    </div>
  );
};

export default App;