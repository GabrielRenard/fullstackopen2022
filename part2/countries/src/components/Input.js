import React from "react";

const Input = ({ onChange, value }) => {
  return (
    <div className="flex flex-col self-center w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12">
      <label htmlFor="country" className="invisible">
        Enter a country
      </label>
      <input
        type="text"
        id="country"
        onChange={onChange}
        className="text-xl placeholder-slate-900 glass-card border-none p-[0.25rem] focus:outline-none bg-slate-100 md:text-slate-900 pl-3 rounded-full "
        placeholder="Enter a Country"
      />
    </div>
  );
};

export default Input;
