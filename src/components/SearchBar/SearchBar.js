import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ''}
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleEnterSearch = this.handleEnterSearch.bind(this);
  }

  handleClickSearch() {
    // pass the value of the search term to this.props.onSearch()
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(event) {
    // set SearchBar's searchTerm state to the event (search box) target's value
    this.setState({searchTerm: event.target.value});
  }

  handleEnterSearch(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchTerm);
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyUp={this.handleEnterSearch} />
        <a onClick={this.handleClickSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
