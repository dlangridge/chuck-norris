import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectCategory,
  fetchCategoriesIfNeeded,
  fetchFactsFromSearch,
  fetchRandomFactFromCategory
} from '../actions'
import Facts from '../components/Facts'
import CategoryPicker from '../components/CategoryPicker'
import TermSearch from './TermSearch'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleTermSearch = this.handleTermSearch.bind(this)
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if(this.props.selectedCategory !== prevProps.selectedCategory){
      const{dispatch, selectedCategory} = this.props
    }
  }

  handleCategoryChange(nextCategory) {
    this.props.dispatch(selectCategory(nextCategory))
    this.props.dispatch(fetchRandomFactFromCategory(nextCategory))
  }

  handleCategoryRefresh(category){
    this.props.dispatch(fetchRandomFactFromCategory(category))
  }

  handleTermSearch(e){
    e.preventDefault()
    
    const{dispatch, term} = this.props
    dispatch(fetchFactsFromSearch(term))
  }

  render() {
    const { selectedCategory, categories, term, searchFacts, categoryFact } = this.props
    return (
      <div className="container">
		<div className="row">
			<div className="col-md-12 text-center">
				<h1>Chuck Norris API</h1>
			</div>
		</div>  
        <div className="row">
        	<div className="col-md-6 text-center">
            <h2>Search for facts</h2>
                <div className="form-inline">
              <TermSearch />
            </div>
            {searchFacts.isFetching && <p><img src="https://media.giphy.com/media/8YKstBTN4i68E/giphy.gif" /><br />loading...</p>}
            {!searchFacts.isFetching && !searchFacts.items && <h3>No results</h3>}
            {searchFacts.items && searchFacts.items.length > 0 &&
              <div className="text-left">
                <Facts facts={searchFacts.items} />
              </div>
            }
          	</div>
        	<div className="col-md-6 text-center">
            <h2>Get a random fact from a category</h2>
            <div class="form-inline">
              <div className="form-group"><label>Select a category</label> <CategoryPicker onChange={this.handleCategoryChange} /> {selectedCategory && <button className="btn btn-primary" onClick={() => this.handleCategoryRefresh(selectedCategory)}>Refresh</button>}</div>
            </div>
            {/* <div>Current category: {selectedCategory} </div> */}
            
            {categoryFact.isFetching && <p><img src="https://media.giphy.com/media/8YKstBTN4i68E/giphy.gif" /><br />loading...</p>}
            {categoryFact.items && categoryFact.items.length > 0 &&
            <Facts facts={categoryFact.items} />
            }
        	</div>
        </div>
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedCategory: PropTypes.string,
  searchFacts: PropTypes.object,
  categoryFact: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedCategory, term, searchFacts, categoryFact } = state

  return {
    selectedCategory,
    term,
    searchFacts,
    categoryFact
  }
}

export default connect(mapStateToProps)(AsyncApp)