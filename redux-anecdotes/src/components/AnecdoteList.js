import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const timerRef = useRef(null)
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) {
      return [...anecdotes]
    }
    const regexp = new RegExp(filter)
    return anecdotes.filter((anecdote) => regexp.test(anecdote.content))
  })
  anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id))
    clearTimeout(timerRef.current)
    dispatch(setNotification(`you voted for '${anecdote.content}'`))
    timerRef.current = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
