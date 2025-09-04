import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteForAnecdote: (state, action) => {
      return state.map(anecdote =>
        anecdote.id === action.payload ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
      )
    },
    createAnecdote: (state, action) => {
      return state.concat(asObject(action.payload))
    },
    sortAnecdotes: (state) => {
      return state.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { voteForAnecdote, createAnecdote, sortAnecdotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer