import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,
  //REQUEST_FACT_CATEGORIES,
  //RECEIVE_FACT_CATEGORIES,
  REQUEST_FACT_SEARCH,
  RECEIVE_FACT_SEARCH,
  REQUEST_RANDOM_FACT_FROM_CATEGORY,
  RECEIVE_RANDOM_FACT_FROM_CATEGORY
} from './actions'

function selectedCategory(state = 'explicit',action){
  switch(action.type){
    case SELECT_CATEGORY:
      return action.category
    default:
      return state;
  }
}

const searchFacts = (state = {
  isFetching: false,
  items:[]
}, 
action) => {
  switch(action.type){
    case REQUEST_FACT_SEARCH:
      return Object.assign({}, state, {
        isFetching: true
      })
      break;
    case RECEIVE_FACT_SEARCH:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.searchFacts
      })
      break;
    default:
      return state
  }
}

const categoryFact = (state = {
  isFetching: false,
  items:[]
}, 
action) => {
  switch(action.type){
    case REQUEST_RANDOM_FACT_FROM_CATEGORY:
      return Object.assign({}, state, {
        isFetching: true,
        items: []
      })
      break;
    case RECEIVE_RANDOM_FACT_FROM_CATEGORY:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.categoryFact
      })
      break;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedCategory,
  searchFacts,
  categoryFact
})

export default rootReducer