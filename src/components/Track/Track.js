import React from 'react';
import './Track.css';

class Track extends React.Component {
  // Step 27 - don't fully understand .renderAction() yet, not sure if this is complete or correct yet
  // will get called in <a className="Track-action"></a> ???
  // will get passed isRemoval as a prop from... ???
  renderAction(isRemoval) {
    if (isRemoval === true) {
      return '-';
    } else {
      return '+';
    }
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist/*<!-- track artist will go here-->*/} | {this.props.track.album/*<!-- track album will go here -->*/}</p>
        </div>
        <a className="Track-action">{/*<!-- + or - will go here -->*/}{this.renderAction(false)}</a>
      </div>
    );
  }
}

export default Track;
