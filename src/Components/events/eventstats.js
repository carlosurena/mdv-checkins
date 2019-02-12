import React, { Component } from 'react'

class EventStats extends Component {
  render() {
    return (
      <div>
        <div className="ui container ">
            <h4>STATS</h4>
            <div className="ui card">
                <div className="ui card content">
                    <span className="ui header">{this.props.event.title}</span>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque harum cum consectetur? Mollitia maiores quibusdam, nemo, dolores perspiciatis fugit magnam voluptatibus commodi voluptas omnis porro fuga explicabo! Animi, unde fuga.</p>
                </div>
                <div className="">
                    <div> 
                      { 
                      (this.props.event.creatorName) 
                      ? ("Created By "+ this.props.event.creatorName) 
                      : ("Creator not found")
                      }</div>
                    <div>{}</div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default EventStats
