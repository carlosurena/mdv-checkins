import React, { Component } from 'react'
import { Search, Button, Image } from 'semantic-ui-react'
import { connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import SearchRequest from './searchRequest'


class AccessRequestCard extends Component {
    state = {
        linked : false,
        memberRef : null
    }

    personSelected = (memberRef) => {
        //console.log('adding attendee to db', attendeeID)
        this.setState({
            linked : true,
            memberRef : memberRef
        })
        console.log('lonnked')
    }

  render() {
      const { request, user, members} = this.props;
    return (
         ((request && user) && (
                <div key={request.id} className="ui segment grid">
            <div className="ui row centered">
                A new account needs to be linked to a person in your database.
            </div>
            <div className="ui row two columns">
                <div className="column ui segment">
                    <div>
                        <Image size ='tiny' circular floated='left' src={user.photoURL}/>
                        <span>
                            <p>{request.userName}</p>
                            <p>{user.email}</p>
                            <p>Signed up via {user.provider}</p>
                        </span>
                    </div>

                </div>
                { this.state.linked ? 
                (
                    <div className="centered column ui segment">
                    <i class="close icon"></i>

                        <p>Linked!</p>
                    </div>
                ) : 
                (
                    <div className="centered column ui segment">
                        <p>Link to a member:</p>
                        <SearchRequest personSelected={ (memberRef) =>{this.personSelected(memberRef)} } members={members} />
                    </div>
                )
                }
            </div>
            <div className="ui centered row">
                {this.state.linked ? 
                (
                    <Button positive>Link</Button>

                ) :
                (
                    <Button disabled>Link</Button>

                )}
                <Button negative>Deny</Button>

            </div>
                
        </div>
        ))
        
        
    )
  }
}
const mapStateToProps = (reduxState, ownProps) => {
    var id = ownProps.request.userRef
    const users = reduxState.firestore.data.users;
    const user = users ? users[id] : null
    console.log("user",user)
    return {
        user  : user
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(ownProps => [
      { collection: 'users'  }
    ])
  )(AccessRequestCard)
