import React from "react";

const AnecdoteOfDay = ({ anecdotesArr, anecdotesIndex, votesArr }) => {
  return (
    <>
      <p>{anecdotesArr[anecdotesIndex]}</p>
      <p>Has {votesArr[anecdotesIndex]} votes</p>
    </>
  );
};

export default AnecdoteOfDay;
