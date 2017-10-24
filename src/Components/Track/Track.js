import React from 'react';
import './Track.css';


export class Track extends React.Component() {

    renderAction(addRemove) {
        if (addRemove.onAdd) {
            return <a className="Track-action">+</a>
        }
        if (addRemove.onRemove) {
            return <a className="Track-action">-</a>
        }
    }

    render() {
        return(
            <div className="Track">
            <div className="Track-information">
              <h3>{this.props.track.name}</h3>
              <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
            <a className="Track-action">{this.renderAction(this.props)}</a>
          </div>
        );
    }
}