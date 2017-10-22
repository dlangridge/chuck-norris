import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CategoryPicker extends Component {
	constructor(props){
		super(props)
		this.state = {
			options:[]
		}
	}
	componentWillMount() {
		fetch('https://api.chucknorris.io/jokes/categories')
		.then(response => response.json())
		.then(options => {
		  	this.setState({ options })
		})
	}
	
	render() {
		const { value, onChange, options } = this.props

		return (
			<span>
				<select className="form-control" onChange={e => onChange(e.target.value)} value={value}>
					{this.state.options.map(option => (
					<option value={option} key={option}>
						{option}
					</option>
					))}
				</select>
			</span>
		)
	}
}

CategoryPicker.propTypes = {
  //options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  //value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}