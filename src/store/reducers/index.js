import categoriesReducer from './categoriesReducers'
import itemsReducer from './itemsReducers'
import indexReducer from './indexReducers'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  categoriesReducer,
  itemsReducer,
  indexReducer,
})

export default allReducers
