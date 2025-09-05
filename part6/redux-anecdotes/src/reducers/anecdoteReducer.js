import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
      // voteForAnecdote: (state, action) => {
      //   return state.map(anecdote =>
      //     anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      //   )
      // },
    replaceAnecdote: (state, action) => {
      return state.map(anecdote =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      )
    },
    sortAnecdotes: (state) => {
      return state.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote: (state, action) => {
      return state.concat(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { replaceAnecdote, sortAnecdotes, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdotesService.updateAnecdote(anecdote.id, newAnecdote)
    dispatch(replaceAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer