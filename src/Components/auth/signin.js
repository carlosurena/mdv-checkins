import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginGoogle, loginFacebook } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { Button, Card } from 'semantic-ui-react'
import { inherits } from 'util';

class SignIn extends Component {

    //hello

    render() {
        const { user } = this.props
        if (!user.isEmpty) return <Redirect to='/' />
        return (
            <div className='ui'>

                <div className="ui middle aligned column stackable center page grid" style = {{ minHeight : 500}}>
                    <div className="four wide column"></div>
                    <div className="ui six wide column">
                        <h1 className=" ui header">Welcome!</h1>
                        <Card>
                            
                        <Button primary onClick={this.props.loginFacebook}>
                            Login with Facebook
                            </Button>

                        <Button negative onClick={this.props.loginGoogle}>
                            Login with Google
                            </Button>
                    </Card>
                    </div>
                    
                </div>
                


                {this.props.authError ? (
                    null
                ) : (
                        <div className="centered">
                            <p>{this.props.authError}</p>

                        </div>
                    )}


            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        authError: reduxState.auth.authError,
        user: reduxState.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginGoogle: () => dispatch(loginGoogle()),
        loginFacebook: () => dispatch(loginFacebook())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
