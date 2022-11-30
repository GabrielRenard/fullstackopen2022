import React from "react";

const Persons = ({ persons, search, onClick }) => {
  const phoneBookList = persons
    .filter(person => {
      return (
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.number.includes(search.toLowerCase())
      );
    })
    .map(person => (
      <li key={person.id}>
        <p>
          {person.name} {person.number}
          <span>
            <button onClick={() => onClick(person.id)}>delete</button>
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
