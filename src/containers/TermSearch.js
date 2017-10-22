import React from 'react'
import { connect } from 'react-redux'
import { fetchFactsFromSearch } from '../actions'

let TermSearch = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(fetchFactsFromSearch(input.value))
        input.value = ''
      }}>
        <input placeholder="Search Chuck Norris facts" ref={node => {
          input = node
        }} />
        <button type="submit">
          Get Fact
        </button>
      </form>
    </div>
  )
}
TermSearch = connect()(TermSearch)

export default TermSearch