import React, { Component } from 'react'

class EventEdit extends Component {
  render() {
    return (
      <div>
        <div className="container section">
            <h4>Edit</h4>
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{this.props.event.title} - {this.props.id}</span>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque harum cum consectetur? Mollitia maiores quibusdam, nemo, dolores perspiciatis fugit magnam voluptatibus commodi voluptas omnis porro fuga explicabo! Animi, unde fuga.</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>Created By John</div>
                    <div>{this.props.event.createdOn}</div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default EventEdit
