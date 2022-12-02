import React from "react";

const PersonForm = ({
  onChangeName,
  onChangeNumber,
  onSubmitForm,
  contactInput,
}) => {
  return (
    <form onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" onChange={onChangeName} value={contactInput.name} />
      </div>
      <div>
        <label htmlFor="number">Number</label>
        <input
          id="number"
          onChange={onChangeNumber}
          value={contactInput.number}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
