import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Checkins extends Component {
  render() {
    const {user} = this.props
    if(user.isEmpty) return <Redirect to='/signin' />
    
    return (
      <div className="">
        <div className="section green">
        <div className="container">
            <div className="col">
                <Link to="/station"><Button primary>Open a Station</Button></Link>
            </div>
        </div>
        

        </div>
        <div className="container">
          <div className="section">
            <h3>
              {this.props.user ? ("Welcome, "+this.props.user.displayName+ "!"):(null)}
            </h3>
          </div>
            <div className="row">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore itaque vitae reprehenderit corrupti cumque exercitationem autem dolor enim facere iure, illo tenetur soluta ab quisquam rerum deserunt beatae officia veniam!
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  console.log(reduxState)
  return{
      user : reduxState.firebase.auth
  }
}

export default connect(mapStateToProps)(Checkins)
