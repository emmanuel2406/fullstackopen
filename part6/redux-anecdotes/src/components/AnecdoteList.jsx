import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote, sortAnecdotes, setAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import anecdotesService from '../services/anecdotes'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => {
      dispatch(setAnecdotes(anecdotes))
    })
  }, [dispatch])

  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    dispatch(sortAnecdotes())
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification(`You voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
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