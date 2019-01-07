import React, {Component} from 'react';

class CreateEvent extends Component {
    state = {
        title: '',
        type:'',
        weekday: '',
        startDate:'',
        endDate:''
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.addMember(this.state);
        this.setState({
            fname: '',
            lname: '',
            dob: '',
            gender: '',
            phone: ''
        });
        //document.getElementById("membersForm").reset();
    }

    render(){
        return(
             
             <form id="createEventForm" onSubmit={this.handleSubmit}>
                <div className="modal-content">
                    <h2>Create new Event</h2>
                    
                    <label htmlFor="title">First Name: </label>
                    <input type="text" id="title" onChange={this.handleChange} value={this.state.title}></input>

                    
                </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn modal-close">Submit</button>
                    </div>
                </form>
            
            
        )
    }
}
export default CreateEvent;