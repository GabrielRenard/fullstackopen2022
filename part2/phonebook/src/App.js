import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import ContactsList from "./components/ContactsList";
import contactsService from "./services/contacts";
import "./index.css";
import Card from "./components/UI/Card";
import Button from "./components/UI/Button";
import { IoIosClose } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactInput, setContactInput] = useState({
    name: "",
    number: "",
  });
  const [filterInput, setFilterInput] = useState("");
  const [confirmation, setConfirmation] = useState({
    message: "",
    error: false,
    isVisible: false,
  });
  const [showForm, setShowForm] = useState(false);

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

  const filterNameHandler = e => {
    setFilterInput(e.target.value);
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

      console.log(newContact);

      if (!foundContact) {
        // Create the new contact in state if the contact doesnt already exist
        contactsService
          .createContact(newContact)
          .then(newContact => setContacts(prev => prev.concat(newContact)))
          .catch(error => {
            console.log(error.response.data.error);
            setConfirmation({
              ...confirmation,
              message: error.response.data.error,
              error: true,
              isVisible: true,
            });
            return;
          });

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
                message: `Information of ${newContact.name} Has Already Been Removed From The Server`,
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
        message: `Deleted ${contactToDelete}`,
        isVisible: true,
      });
      setTimeout(() => {
        setConfirmation({ ...confirmation, isVisible: false });
      }, 3000);
    }
  };

  const isSuccess = confirmation.isVisible && !confirmation.error;
  const isError = confirmation.isVisible && confirmation.error;

  return (
    <>
      {!showForm && (
        <>
          <div className="flex flex-col h-screen box-border bg-gray-900 text-gray-50">
            <h2 className="self-center text-4xl py-6 sm:text-5xl md:text-6xl">
              Phonebook
            </h2>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 w-fit self-center rounded-full p-5 mb-5 hover:bg-green-700 hover:text-green-50 hover:transition-colors duration-10"
            >
              <BsPlusLg className="text-2xl text-green-50 " />
            </Button>
            <Card
              key={showForm ? "open" : "close"}
              className="rounded-xl text-lg bg-purple-600 p-5 self-center w-11/12 md:w-10/12 lg:w-11/12 lg:max-w-6xl"
            >
              <div className="flex font-bold">
                <p className="w-1/2 ">Name</p>
                <p className="w-1/2">Number</p>
                <div></div>
              </div>
              <ContactsList
                contacts={contacts}
                filterInput={filterInput}
                onClick={deleteContactHandler}
              />
            </Card>
          </div>
        </>
      )}
      {showForm && (
        <>
          <div className="flex flex-col h-auto box-border bg-gray-900 text-gray-50">
            {isSuccess && (
              <p className="absolute w-full text-white bg-green-900 rounded-sm text-center text-xl md:text-2xl">
                {confirmation.message}
              </p>
            )}
            {isError && (
              <p className="text-white bg-red-900 rounded-sm text-center text-xl md:text-2xl">
                {confirmation.message}
              </p>
            )}
            <h2 className="self-center text-4xl py-6 sm:text-5xl md:text-6xl">
              Phonebook
            </h2>
            <Card className="flex flex-col container rounded-xl text-lg bg-purple-600 py-3 px-5 mb-5 w-11/12 sm:8/12 sm:text-xl md:w-[35rem] md:container">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="self-end rounded-full"
              >
                <IoIosClose className="text-6xl text-purple-50" />
              </Button>
              <Filter filterNameHandler={filterNameHandler} />
              <ContactForm
                onChangeName={nameChangeHandler}
                onChangeNumber={numberChangeHandler}
                onSubmitForm={formSubmitHandler}
                contactInput={contactInput}
              />
            </Card>
            <div
              className=" self-center h-screen w-11/12 md:w-10/12 lg:w-11/12 lg:max-w-6xl"
              animate={{}}
            >
              <Card className="rounded-xl text-lg bg-purple-600 p-5 mb-5">
                <div className="flex font-bold">
                  <p className="w-1/2 ">Name</p>
                  <p className="w-1/2">Number</p>
                  <div></div>
                </div>
                {/* <h2 className="text-2xl">Contacts</h2> */}
                <ContactsList
                  contacts={contacts}
                  filterInput={filterInput}
                  onClick={deleteContactHandler}
                />
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
