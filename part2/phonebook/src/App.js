import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactsService from "./services/contacts";
import "./index.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactInput, setContactInput] = useState({ name: "", number: "" });
  const [filterInput, setFilterInput] = useState("");
  const [confirmation, setConfirmation] = useState({
    message: "",
    error: false,
    isVisible: false,
  });

  useEffect(() => {
    contactsService.getAll().then(response => {
      setContacts(response.data);
    });
  }, []);

  const nameChangeHandler = e => {
    setContactInput({ ...contactInput, name: e.target.value });
  };

  const numberChangeHandler = e => {
    setContactInput({ ...contactInput, number: e.target.value });
  };

  const formSubmitHandler = e => {
    e.preventDefault();

    if (contactInput.name.length > 1 && contactInput.number.length > 6) {
      // Create new contacts object

      const newContact = {
        name: contactInput.name,
        number: contactInput.number,
      };
      const foundContact = contacts.find(
        contact => contact.name === contactInput.name
      );

      if (!foundContact) {
        // Create the new contact in state
        contactsService
          .createContact(newContact)
          .then(newContact => setContacts(contacts.concat(newContact)));

        setConfirmation({
          ...confirmation,
          message: `Added ${newContact.name}`,
          isVisible: true,
        });
        setTimeout(() => {
          setConfirmation({ ...confirmation, isVisible: false });
        }, 3000);
        setContactInput({ name: "", number: "" });
      } else if (
        foundContact.name === newContact.name &&
        foundContact.number === newContact.number
      ) {
        window.alert(`${newContact.name} is already added to the phonebook`);
        setContactInput({ name: "", number: "" });
        return;
      } else if (
        foundContact.name === newContact.name &&
        foundContact.number !== newContact.number
      ) {
        if (
          window.confirm(
            `${foundContact.name} is already added to the phonebook, replace the old number with a new one?`
          )
        ) {
          contactsService
            .updateContact(foundContact.id, newContact)
            .then(updatedContact =>
              setContacts(
                contacts.map(contact =>
                  contact.id !== updatedContact.id ? contact : updatedContact
                )
              )
            )
            .then(() => {
              setConfirmation({
                ...confirmation,
                message: `updated ${newContact.name}`,
                isVisible: true,
              });
              setTimeout(() => {
                setConfirmation({ ...confirmation, isVisible: false });
              }, 3000);
            })
            .catch(err => {
              console.log(err);
              setConfirmation({
                message: `Information of ${newContact.name} has already been removed from the server`,
                error: true,
                isVisible: true,
              });
              setTimeout(() => {
                setConfirmation({ ...confirmation, isVisible: false });
              }, 3000);
            });
          setContactInput({ name: "", number: "" });
          return;
        }
      }
    }
  };

  const filterNameHandler = e => {
    setFilterInput(e.target.value);
  };

  const deleteContactHandler = id => {
    const contactToDelete = contacts
      .filter(contact => contact.id === id)
      .map(contact => contact.name);
    if (window.confirm(`Delete ${contactToDelete} ?`)) {
      contactsService.deleteContact(id).then(() => {
        setContacts(contacts.filter(contact => contact.id !== id));
      });
      setConfirmation({
        ...confirmation,
        message: `deleted ${contactToDelete}`,
        isVisible: true,
      });
      setTimeout(() => {
        setConfirmation({ ...confirmation, isVisible: false });
      }, 3000);
    }
  };

  return (
    <div className="app-container">
      {confirmation.isVisible && !confirmation.error && (
        <p className="success">{confirmation.message}</p>
      )}
      {confirmation.isVisible && confirmation.error && (
        <p className="error">{confirmation.message}</p>
      )}
      <h2>Phonebook</h2>
      <Filter filterNameHandler={filterNameHandler} />
      <h3>Add new</h3>
      <PersonForm
        onChangeName={nameChangeHandler}
        onChangeNumber={numberChangeHandler}
        onSubmitForm={formSubmitHandler}
        contactInput={contactInput}
      />
      <h2>Numbers</h2>
      <Persons
        contacts={contacts}
        filterInput={filterInput}
        onClick={deleteContactHandler}
      />
    </div>
  );
};

export default App;
