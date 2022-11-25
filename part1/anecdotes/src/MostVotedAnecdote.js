import React from "react";

const MostVotedAnecdote = props => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {props.maxVoted}
    </>
  );
};

export default MostVotedAnecdote;
