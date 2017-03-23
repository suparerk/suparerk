import { combineReducers } from 'redux'
import test from './test'
import word from './word'

const reducer = combineReducers({
  word,
})

export default reducer
