import React from 'react';
import './TrackPreview.css';

class TrackPreview extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.previewUrl) {
      this.myAudio.volume = 0.2;
      this.myAudio.controls = true;
    }
  }

  render() {
    return(
      <div>
        <audio ref={audio => {this.myAudio = audio}} autoPlay="true" src={this.props.previewUrl} type="audio/mpeg">Audio not supported by your browser.</audio>
      </div>
    );
  }
}

export default TrackPreview;
