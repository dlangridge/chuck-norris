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
      <div class="">
        <TermSearch />
        {searchFacts.isFetching && <p><img src="https://media.giphy.com/media/8YKstBTN4i68E/giphy.gif" /><br />loading...</p>}
        {!searchFacts.isFetching && !searchFacts.items && <h3>No results</h3>}
        {searchFacts.items && searchFacts.items.length > 0 &&
          <Facts facts={searchFacts.items} />
        }
        
        <div>Select a category <CategoryPicker onChange={this.handleCategoryChange} /></div>
        
        <div>Category: {selectedCategory} {selectedCategory && <button onClick={() => this.handleCategoryRefresh(selectedCategory)}>Refresh</button>}</div>
        
        {categoryFact.isFetching && <p><img src="https://media.giphy.com/media/8YKstBTN4i68E/giphy.gif" /><br />loading...</p>}
        {categoryFact.items && categoryFact.items.length > 0 &&
          <Facts facts={categoryFact.items} />
        }
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