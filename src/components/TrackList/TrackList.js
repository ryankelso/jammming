import React from 'react';
import './TrackList.css';
import Track from './../Track/Track.js';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => <Track key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} getPreviewUrl={this.props.getPreviewUrl} isRemoval={this.props.isRemoval} />)}
      </div>
    );
  }
}

export default TrackList;
