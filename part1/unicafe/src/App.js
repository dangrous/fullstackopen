import React, { useState } from 'react'

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <h1>statistics</h1>
      <Readout feedback={good} text="good" />
      <Readout feedback={neutral} text="neutral" />
      <Readout feedback={bad} text="bad" />
    </div>
  )
}

const Button = ({handleClick, text}) =>
  <button onClick={handleClick}>{text}</button>

const Readout = ({feedback, text}) =>
  <p>{text} {feedback}</p>

export default App;
