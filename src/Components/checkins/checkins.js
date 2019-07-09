import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Checkins extends Component {
  state = {

  }
  render() {
    const {user, auth} = this.props
    if(auth.isEmpty) return <Redirect to='/signin' />
    if(user && user.accessLevel === 'pending') return <Redirect to='/pendinguser' />
    
    return (
      <div className="ui">
          <div className="ui green inverted segment">
              <div className="">
                  <Link to="/station"><Button primary>Open a Station</Button></Link>
              </div>
          </div>


        <div className="ui container">
          <div className="">
            <h3>
              {user ? ("Welcome, "+user.first_name+ "!"):(null)}
            </h3>
          </div>
            <div className="">
              {user ? user.accessLevel : ''}
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  console.log(reduxState)
  return{
      auth : reduxState.firebase.auth,
      user : reduxState.auth.user
  }
}

export default connect(mapStateToProps)(Checkins)
