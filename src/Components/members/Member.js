import React, {Component} from 'react';

class Member extends Component{

    state = {
        id: null,
        person: null,
    }
    componentDidMount(){
        let id = this.props.match.params.member_id;
        console.log(this.props)
        console.log(id)
        this.setState({
            id : id
        })
    }
    render(){
        const person = this.state.person ? (
            <div className="person">PERSON LOADED!</div>
        ) : (
            <div className="center">Could not find the requested person (PERSON ID {this.state.id})...</div>
            )
        return(
            <div className="container">
                <div className="center">
                    {person}
                </div>
            </div>
        );
    }
}
export default Member