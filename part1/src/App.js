import React, { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}></Part>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}></Part>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}></Part>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const anecdoteVoteArr = [0, 0, 0, 0, 0, 0]

  const [ratings, setRatings] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const [allRatings, setAllRatings] = useState(0)
  const [averageRating, setAverageRating] = useState(0)
  const [positiveRating, setPositiveRating] = useState(0)
  const [selectedAnecdote, setSelectedAnecdote] = useState(0)
  const [selectedAnecdoteVote, setSelectedAnecdoteVote] = useState(anecdoteVoteArr)
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(0)




  const increaseGood = () => {
    let good = ratings.good + 1
    let allRatings = good + ratings.neutral + ratings.bad
    setRatings({ ...ratings, good: good })
    setAllRatings(allRatings)
    setAverageRating((good - ratings.bad) / (good + ratings.neutral + ratings.bad))
    setPositiveRating(good / allRatings * 100)
  }

  const increaseNeutral = () => {
    let neutral = ratings.neutral + 1
    let allRatings = ratings.good + neutral + ratings.bad
    setRatings({ ...ratings, neutral: neutral })
    setAllRatings(allRatings)
    setAverageRating((ratings.good - ratings.bad) / (ratings.good + neutral + ratings.bad))
    setPositiveRating(ratings.good / allRatings * 100)
  }

  const increaseBad = () => {
    let bad = ratings.bad + 1
    let allRatings = ratings.good + ratings.neutral + bad
    setRatings({ ...ratings, bad: bad })
    setAllRatings(allRatings)
    setAverageRating((ratings.good - bad) / (ratings.good + ratings.neutral + bad))
    setPositiveRating(ratings.good / allRatings * 100)
  }

  const nextAnecdote = () => {
    let anecdote = selectedAnecdote + 1
    if (anecdote > 5) {
      setSelectedAnecdote(0)
    }
    else {
      setSelectedAnecdote(anecdote)
    }
  }

  const voteAnecDote = () => {
    const copyArr = { ...selectedAnecdoteVote }
    copyArr[selectedAnecdote] += 1
    setSelectedAnecdoteVote(copyArr)
    let mostVoted = 0
    for(let i = 0 ; i < 5; i++){
        if(copyArr[i] < copyArr[i + 1]){
          mostVoted = i + 1
        }
    }
    setMostVotedAnecdote(mostVoted)
  }


  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>

      <h1>Give Feedbacks</h1>
      <ClickButton clickEvent={increaseGood} buttonName="Good"></ClickButton>
      <ClickButton clickEvent={increaseNeutral} buttonName="Neutral"></ClickButton>
      <ClickButton clickEvent={increaseBad} buttonName="Bad"></ClickButton>

      <h1>Statistics</h1>
      <Statistics ratings={ratings} average={averageRating} allRatings={allRatings} positiveRating={positiveRating}></Statistics>
      <br></br>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selectedAnecdote={selectedAnecdote}></Anecdote>
      <AnecdoteVote selectedAnecdoteVote={selectedAnecdoteVote} selectedAnecdote={selectedAnecdote}></AnecdoteVote>
      <div>
        <ClickButton clickEvent={nextAnecdote} buttonName="Next anecdote"></ClickButton>
        <ClickButton clickEvent={voteAnecDote} buttonName="Vote anecdote"></ClickButton>
      </div>
      <br></br>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} selectedAnecdote={mostVotedAnecdote}></Anecdote>
    </div>
  )
}

const Statistics = ({ ratings, average, allRatings, positiveRating }) => {
  if (allRatings === 0) {
    return (
      <div>
        No feedbacks given
      </div>
    )
  }
  else {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <Statistic statisticName="Good" statisticValue={ratings.good}></Statistic>
            </tr>
            <tr>
              <Statistic statisticName="Neutral" statisticValue={ratings.neutral}></Statistic>
            </tr>
            <tr>
              <Statistic statisticName="Bad" statisticValue={ratings.bad}></Statistic>
            </tr>
            <tr>
              <Statistic statisticName="All" statisticValue={allRatings}></Statistic>
            </tr>
            <tr>
              <Statistic statisticName="Average" statisticValue={average}></Statistic>
            </tr>
            <tr>
              <Statistic statisticName="Positive" statisticValue={positiveRating + " %"}></Statistic>
            </tr>
          </tbody>
        </table>

      </>
    )
  }
}

const Statistic = ({ statisticName, statisticValue }) =>
  <>
    <td>
      {statisticName}
    </td>
    <td>
      {statisticValue}
    </td>
  </>

const Anecdote = ({ anecdotes, selectedAnecdote }) =>
  <>
    <div>{anecdotes[selectedAnecdote]}</div>
  </>

const AnecdoteVote = ({ selectedAnecdoteVote, selectedAnecdote }) => {
  return (
    <>
      <div>has {selectedAnecdoteVote[selectedAnecdote]} votes</div>
    </>
  )
}



const ClickButton = ({ clickEvent, buttonName }) =>
  <>
    <button onClick={clickEvent}>
      {buttonName}
    </button>
  </>


export default App;
