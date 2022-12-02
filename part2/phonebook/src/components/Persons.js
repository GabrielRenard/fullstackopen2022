import React from "react";

const Persons = ({ contacts, filterInput, onClick }) => {
  const phoneBookList = contacts
    .filter(contact => {
      return (
        contact.name.toLowerCase().includes(filterInput.toLowerCase()) ||
        contact.number.includes(filterInput.toLowerCase())
      );
    })
    .map(contact => (
      <li key={contact.id}>
        <p>
          {contact.name} {contact.number}
          <span>
            <button onClick={() => onClick(contact.id)}>delete</button>
          </span>
        </p>
      </li>
    ));

  return (
    <ul>
      {phoneBookList && phoneBookList}
      {phoneBookList.length === 0 && <p>No contacts</p>}
    </ul>
  );
};

export default Persons;
