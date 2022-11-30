import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
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

    if (newName.length > 1 && newNumber.length > 6) {
      // Create new contacts object
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      const foundPerson = persons.find(person => person.name === newName);
      const foundNumber = persons.find(person => person.number === newNumber);

      if (foundPerson && foundNumber) {
        {
          window.alert(`${newName} is already added to the phonebook`);
          setNewName("");
          setNewNumber("");
          return;
        }
      } else if (foundPerson || foundNumber) {
        const personToUpdate = persons.find(person => person.name === newName);
        if (
          window.confirm(
            `${personToUpdate.name} is already added to the phonebook, replace the old number with a new one?`
          )
        ) {
          contactsService
            .updateContact(personToUpdate.id, newPerson)
            .then(updatedPerson =>
              setPersons(
                persons.map(person =>
                  person.id !== updatedPerson.id ? person : updatedPerson
                )
              )
            );
          setNewName("");
          setNewNumber("");
          return;
        }
      } else {
        // Create the new contact in state
        contactsService
          .createContact(newPerson)
          .then(newPerson => setPersons(persons.concat(newPerson)));

        setNewName("");
        setNewNumber("");
      }
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
