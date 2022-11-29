import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

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

    if (newName !== "") {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      axios.post("http://localhost:3001/persons", newPerson).then(response => {
        setPersons(persons.concat(response.data));

        setNewName("");
        setNewNumber("");
      });
    }
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
