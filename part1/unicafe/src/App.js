import React, { useState } from 'react'

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad == 0) {
    return <div>No feedback given</div>
  } else {  
    return (
      <>
        <Readout value={good} text="good" />
        <Readout value={neutral} text="neutral" />
        <Readout value={bad} text="bad" />
        <Readout value={good+neutral+bad} text="all" />
        <Readout value={(good - bad)/(good+neutral+bad)} text="average" />
        <Readout value={good/(good+neutral+bad)*100} text="positive" suffix="%" />
      </>
    )
  }
}

const Button = ({handleClick, text}) =>
  <button onClick={handleClick}>{text}</button>

const Readout = ({value, text, suffix}) =>
  <div>{text} {value} {suffix}</div>

export default App;