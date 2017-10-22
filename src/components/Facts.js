import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Facts extends Component {
  render() {
    return (
      <ul className="facts-list">
        {this.props.facts.map((fact, i) => <li key={i}>{fact.value}</li>)}
      </ul>
    )
  }
}

Facts.propTypes = {
  facts: PropTypes.array.isRequired
}