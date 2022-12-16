import React from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";
import { FaTrashAlt } from "react-icons/fa";

const ContactsList = ({ contacts, filterInput, onClick }) => {
  if (contacts) {
    const phoneBookList = contacts
      .filter(contact => {
        return (
          contact.name.toLowerCase().includes(filterInput.toLowerCase()) ||
          contact.number.includes(filterInput.toLowerCase())
        );
      })
      .map(contact => (
        <Card
          key={contact.id}
          className="shadow-md shadow-purple-900 bg-purple-200 rounded-md mb-3 p-2 "
        >
          <li className="text-md flex justify-between">
            <p className="w-1/2 md:text-xl">{contact.name}</p>
            <p className="w-1/2 md:text-xl">{contact.number}</p>
            <Button type="button" onClick={() => onClick(contact.id)}>
              <FaTrashAlt className="text-purple-900 text-2xl md:text-3xl" />
            </Button>
          </li>
        </Card>
      ));
    return (
      <ul>
        {phoneBookList && phoneBookList}
        {phoneBookList.length === 0 && (
          <p className="font-bold">No contacts...</p>
        )}
      </ul>
    );
  }
};

export default ContactsList;
