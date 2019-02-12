import React, { Component } from 'react';
import Members from './Components/members/members.js';
import Navbar from './Components/navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/dashboard/Home';
import Checkins from './Components/checkins/checkins';
import Member from './Components/members/Member';
import Events from './Components/events/events';
import Station from './Components/station/station';
import Event from './Components/events/event';
import SignIn from './Components/auth/signin';
import SignUp from './Components/auth/signup';
import Account from './Components/auth/account';
import PendingUser from './Components/auth/pendinguser'
import { connect } from 'react-redux';
import { loadUser } from './store/actions/authActions'



class App extends Component {
  state = {

   
  }
  componentDidMount(){
    this.props.loadUser()
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          
          <Navbar />
          <Switch>
            <Route exact path="/" component={Checkins}  />
            <Route exact path="/checkins" component={Checkins}  />
            <Route exact path="/members" component={Members}  />
            <Route exact path="/events" component={Events} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/pendinguser" component={PendingUser} />


            <Route exact path="/station" component={Station} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/member/:member_id" component={Member} />
            <Route path="/event/:event_id" component={Event} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      loadUser : () => dispatch(loadUser()),
      
  }
}
export default connect(null,mapDispatchToProps)(App);
