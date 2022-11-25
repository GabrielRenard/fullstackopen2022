import { useState } from "react";
import AnecdoteOfDay from "./AnecdoteOfDay";
import MostVotedAnecdote from "./MostVotedAnecdote";
import Button from "./Button";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [anecdoteIndex, setAnecdoteIndex] = useState(0);
  const [votesArr, setVotesArr] = useState(new Array(anecdotes.length).fill(0));

  console.log(anecdoteIndex);
  console.log(votesArr);

  const nextAnecdoteHandler = () => {
    setAnecdoteIndex(Math.floor(Math.random() * anecdotes.length));
  };

  const voteHandler = () => {
    const copy = [...votesArr];
    copy[anecdoteIndex] += 1;
    setVotesArr(copy);
  };

  const maxVotes = Math.max(...votesArr);
  const maxVotesIndex = votesArr.indexOf(maxVotes);

  const maxVotedAnecdote = anecdotes[maxVotesIndex];

  console.log(maxVotes, maxVotesIndex);

  return (
    <>
      <AnecdoteOfDay
        anecdotesArr={anecdotes}
        anecdotesIndex={anecdoteIndex}
        votesArr={votesArr}
      />
      <Button onclick={nextAnecdoteHandler} name="Next anecdote" />
      <Button onclick={voteHandler} name="Vote" />
      {votesArr.find(el => el > 0) && (
        <MostVotedAnecdote maxVoted={maxVotedAnecdote} />
      )}
    </>
  );
}

export default App;
