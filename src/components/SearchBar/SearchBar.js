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
    // set a search term variable to the event (search box) target's value
    this.setState({searchTerm: event.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        {/* Added onClick to make submitting a search term work, it doesn't
        seem to be addressed in the instructions? Steps 66-73. Is it addressed
        in a later step??*/}
        <a onClick={this.handleClickSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
