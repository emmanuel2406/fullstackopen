import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const vote = (id) => {
    dispatch(voteForAnecdote(id))
    dispatch(sortAnecdotes())
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