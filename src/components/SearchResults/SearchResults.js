import React from 'react';
import './SearchResults.css';
import TrackList from './../TrackList/TrackList.js';
import TrackPreview from './../TrackPreview/TrackPreview.js';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {previewUrl: ''};
    this.getPreviewUrl = this.getPreviewUrl.bind(this);
  }

  getPreviewUrl(track) {
      this.setState({previewUrl: track.previewUrl});
  }

  render() {
    return (
      <div className="SearchResults">
        <TrackPreview previewUrl={this.state.previewUrl} />
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} getPreviewUrl={this.getPreviewUrl} isRemoval={false} />
      </div>
    );
  }
}

export default SearchResults;
