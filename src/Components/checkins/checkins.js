import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class Checkins extends Component {
  render() {
    return (
      <div className="">
        <div className="section green">
        <div className="container">
            <div className="col">
                <Link to="/station"><Button primary>Create Station</Button></Link>
            </div>
        </div>
        

        </div>
        <div className="container">
            <div className="row">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore itaque vitae reprehenderit corrupti cumque exercitationem autem dolor enim facere iure, illo tenetur soluta ab quisquam rerum deserunt beatae officia veniam!
            </div>
        </div>
      </div>
    )
  }
}

export default Checkins
