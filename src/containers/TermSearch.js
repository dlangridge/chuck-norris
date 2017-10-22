import React from 'react'
import { connect } from 'react-redux'
import { fetchFactsFromSearch } from '../actions'

let TermSearch = ({ dispatch }) => {
  let input

  return (
    <div className="form-group">
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(fetchFactsFromSearch(input.value))
        input.value = ''
      }}>
        <input className="form-control" placeholder="Search Chuck Norris facts" ref={node => {
          input = node
        }} />
        <button className="btn btn-primary" type="submit">Get Facts</button>
      </form>
    </div>
  )
}
TermSearch = connect()(TermSearch)

export default TermSearch