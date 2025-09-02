import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'

import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  // Provider is the magic - instead of prop drilling, we can use it to auto-pass the store to all children
  <Provider store={store}>
    <App />
  </Provider>
)