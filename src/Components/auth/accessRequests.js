import React, { Component } from 'react'
import { connect } from 'react-redux'
import {compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import AccessRequestCard from './accessRequestCard'
class AccessRequests extends Component {

  state = {

  }

  render() {
    const {requests, members} = this.props
    console.log(requests)
    return (
      <div className="">
        {
          (requests && requests.map( (request) =>{
            return (
              <AccessRequestCard request={request} members={members} />
            )
          }))
        }
      </div>
    )
  }
}
const mapStateToProps = (reduxState) =>{
  return {

  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([])
)(AccessRequests)
