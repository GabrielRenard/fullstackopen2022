import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactsService from "./services/contacts";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

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

      if (!foundPerson) {
        // Create the new contact in state
        contactsService
          .createContact(newPerson)
          .then(newObj => setPersons(persons.concat(newObj)));

        setSuccessMessage(`Added ${newPerson.name}`);
        setIsSuccessMessageVisible(true);
        setTimeout(() => {
          setIsSuccessMessageVisible(false);
        }, 3000);
        setNewName("");
        setNewNumber("");
      } else if (
        foundPerson.name === newPerson.name &&
        foundPerson.number === newPerson.number
      ) {
        window.alert(`${newName} is already added to the phonebook`);
        setNewName("");
        setNewNumber("");
        return;
      } else if (
        foundPerson.name === newPerson.name &&
        foundPerson.number !== newPerson.number
      ) {
        if (
          window.confirm(
            `${foundPerson.name} is already added to the phonebook, replace the old number with a new one?`
          )
        ) {
          contactsService
            .updateContact(foundPerson.id, newPerson)
            .then(updatedPerson =>
              setPersons(
                persons.map(person =>
                  person.id !== updatedPerson.id ? person : updatedPerson
                )
              )
            )
            .then(() => {
              setSuccessMessage(`updated ${newPerson.name}`);
              setIsSuccessMessageVisible(true);
              setTimeout(() => {
                setIsSuccessMessageVisible(false);
              }, 3000);
            })
            .catch(err => {
              console.log(err);
              setErrorMessage(
                `Information of ${newPerson.name} has already been removed from the server `
              );
              setIsErrorMessageVisible(true);
              setTimeout(() => {
                setIsErrorMessageVisible(false);
              }, 3000);
            });

          setNewName("");
          setNewNumber("");

          return;
        }
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
      setSuccessMessage(`deleted ${personToDelete}`);
      setIsSuccessMessageVisible(true);
      setTimeout(() => {
        setIsSuccessMessageVisible(false);
      }, 3000);
    }
  };

  return (
    <div className="app-container">
      {isSuccessMessageVisible && <p className="success">{successMessage}</p>}
      {isErrorMessageVisible && <p className="error">{errorMessage}</p>}
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
