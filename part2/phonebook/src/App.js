import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import contactsService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    contactsService.getAll().then(response => {
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

      contactsService.createContact(newPerson).then(response => {
        setPersons(persons.concat(response.data));

        setNewName("");
        setNewNumber("");
      });
    }
  };

  const filterNameHandler = e => {
    setSearch(e.target.value);
  };

  const deleteContactHandler = id => {
    const personToDelete = persons
      .filter(person => person.id === id)
      .map(person => person.name);
    if (window.confirm(`Delete ${personToDelete} ?`)) {
      contactsService.deleteContact(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  };

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
        onClick={deleteContactHandler}
      />
    </div>
  );
};

export default App;
