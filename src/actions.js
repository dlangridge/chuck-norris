import fetch from 'isomorphic-fetch'

//Category
//export const REQUEST_FACT_CATEGORIES = 'REQUEST_FACT_CATEGORIES'
//export const RECEIVE_FACT_CATEGORIES = 'RECEIVE_FACT_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const REQUEST_RANDOM_FACT_FROM_CATEGORY = 'REQUEST_RANDOM_FACT_FROM_CATEGORY'
export const RECEIVE_RANDOM_FACT_FROM_CATEGORY = 'RECEIVE_RANDOM_FACT_FROM_CATEGORY'
//SEARCH
export const REQUEST_FACT_SEARCH = 'REQUEST_FACT_SEARCH'
export const RECEIVE_FACT_SEARCH = 'RECEIVE_FACT_SEARCH'


//CATEGORIES
export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function requestRandomFactFromCategory(category){
  return {
    type: REQUEST_RANDOM_FACT_FROM_CATEGORY,
    category,
    categoryFact:[]
  }
}

export function receiveRandomFactFromCategory(category,json){
  console.log(json)
  return {
    type: RECEIVE_RANDOM_FACT_FROM_CATEGORY,
    category,
    categoryFact: [json]
  }
}

export function fetchRandomFactFromCategory(category){
  console.log(category)
  return dispatch => {
    //todo: sanitise the term
    dispatch(requestRandomFactFromCategory(category))
    return fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then(response => response.json())
      .then(json => dispatch(receiveRandomFactFromCategory(category, json)))
  }
}

//SEARCH
export function requestFactsSearch(term){
  return {
    type: REQUEST_FACT_SEARCH,
    term,
    searchFacts:[]
  }
}

export function receiveFactsSearch(term,json){
  return {
    type: RECEIVE_FACT_SEARCH,
    term: term,
    searchFacts: json.result
  }
}

export function fetchFactsFromSearch(term){
  return dispatch => {
    //todo: sanitise the term
    dispatch(requestFactsSearch(term))
    return fetch(`https://api.chucknorris.io/jokes/search?query=${term}`)
      .then(response => response.json())
      .then(json => dispatch(receiveFactsSearch(term, json)))
  }
}