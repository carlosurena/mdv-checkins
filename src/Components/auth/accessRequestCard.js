import React, { Component } from 'react'
import { Search, Button, Image, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import SearchRequest from './searchRequest'
import { linkUser, denyUser } from '../../store/actions/authActions'


class AccessRequestCard extends Component {
    state = {
        linked: false,
        member: null
    }

    personSelected = (memberRef) => {
        //console.log('adding attendee to db', attendeeID)
        const member = this.props.members.find((member) => {
            return member.id === memberRef
        });

        console.log("linked to->", member, memberRef)
        this.setState({
            linked: true,
            member: member
        })

    }

    linkProfile = () =>{
        const { request, user, linkUser } = this.props;
        const { member } = this.state;
        console.log("user and member link :", user, member)
        linkUser(request.userRef,member.id);
    }

    deletePendingRequest = () =>{
        //request contains ID, accessLevel, and TimeStamp of creation
        const { request, user, denyUser} = this.props;
        const { member } = this.state;
        console.log("REQUEST IS: ", request)
        console.log("denying user: ", user)
        //Only gets called for denying pending users, passing id of pending user
        denyUser(request.id);

    }

    render() {
        const { request, user, members } = this.props;
        const {member} = this.state;
        return (
            ((request && user) && (
                <div key={request.id} className="ui segment grid">
                    <div className="ui row centered">
                        A new account needs to be linked to a person in your database.
            </div>
                    <div className="ui row two columns">
                        <div className="column ui segment">
                            <div>
                                <Image size='tiny' circular floated='left' src={user.photoURL} />
                                <span>
                                    <p>{request.userName}</p>
                                    <p>{user.email}</p>
                                    <p>Signed up via {user.provider}</p>
                                </span>
                            </div>

                        </div>
                        { this.state.linked ?
                            (
                                <div className="column ui segment">
                                    <span className="floated right">
                                        <Icon link className="ui right floated" onClick={() => this.setState({ linked: false })} name='close' />
                                    </span>
                                    <div className="centered ">
                                        <span>
                                            <p>{member.first_name} {member.last_name}</p>
                                            <p>{Math.abs(new Date(Date.now() -member.dob.toDate().getTime()).getUTCFullYear() - 1970) + "yo"}</p>
                                            <p>phone: {member.phone ? (member.phone) : ( "No phone number")} </p>
                                        </span>
                                    </div>
                                </div>

                            ) :
                            (
                                <div className="centered column ui segment">
                                    <p>Link to a member:</p>
                                    <SearchRequest personSelected={(memberRef) => { this.personSelected(memberRef) }} members={members} />
                                       
                                </div>
                            )
                        }
                    </div>
                    <div className="ui centered row">
                        {this.state.linked ?
                            (
                                <div className="ui buttons">
                                    <Button positive onClick={this.linkProfile}>Link</Button>
                                    <div className="or"></div>
                                    <Button negative>Deny</Button>
                                </div>

                            ) :
                            (
                                <div className="ui buttons">
                                    <Button disabled>Link</Button>
                                    <div className="or"></div>
                                    <Button negative onClick={this.deletePendingRequest}>Deny</Button>
                                </div>

                            )}


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
    console.log("user", user)
    return {
        user: user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        linkUser : (user,member) => dispatch(linkUser(user,member)),
        denyUser : (penRef) => dispatch(denyUser(penRef))
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(ownProps => [
        { collection: 'users' }
    ])
)(AccessRequestCard)
