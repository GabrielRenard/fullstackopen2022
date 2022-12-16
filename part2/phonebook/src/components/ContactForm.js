import React from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { ImUserPlus } from "react-icons/im";

const ContactForm = ({
  onChangeName,
  onChangeNumber,
  onSubmitForm,
  contactInput,
}) => {
  return (
    <form onSubmit={onSubmitForm} className="flex flex-col">
      <Input
        label="Name"
        onChange={onChangeName}
        value={contactInput.name}
        type="text"
        placeholder="Enter a name"
      />
      <Input
        label="Number"
        onChange={onChangeNumber}
        value={contactInput.number}
        placeholder="Enter a phone number"
      />
      <Button
        type="submit"
        className="flex justify-center w-full bg-green-600 text-green-100 p-2 mt-3 rounded-md hover:bg-green-700 hover:text-green-50 hover:transition-colors duration-10 sm:w-3/12 sm:justify-around sm:self-end lg:w-auto"
      >
        Add
        <ImUserPlus className="text-3xl" />
      </Button>
    </form>
  );
};

export default ContactForm;
