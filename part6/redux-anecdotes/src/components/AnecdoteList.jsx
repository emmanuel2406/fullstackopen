import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { initializeAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(initializeAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(voteAnecdote(anecdote))
    dispatch(sortAnecdotes())
    dispatch(setNotificationWithTimeout(`You voted for '${anecdote.content}'`, 5))
  }
  return (
      anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
  )
}

export default AnecdoteList