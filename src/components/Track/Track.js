import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  renderAction(isRemoval) {
    if (isRemoval === true) {
      return <a className="Track-action" onClick={this.handleClickRemove} >-</a>;
    } else {
      return <a className="Track-action" onClick={this.handleClickAdd} >+</a>;
    }
  }

  handleClickAdd(event) {
    this.props.onAdd(this.props.track);
  }

  handleClickRemove(event) {
    this.props.onRemove(this.props.track);
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction(this.props.isRemoval)}
      </div>
    );
  }
}

export default Track;
