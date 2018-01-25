import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ''}
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleClickSearch() {
    // pass the value of the search term to this.props.onSearch()
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(event) {
    // set SearchBar's searchTerm state to the event (search box) target's value
    this.setState({searchTerm: event.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.handleClickSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
