import React, {Component} from 'react';
import { connect } from 'react-redux'
import {createEvent } from '../../store/actions/eventactions'
import M from 'materialize-css'


class CreateEvent extends Component {
    state = {
        title:'',
        isRecurring: false,
        weekday:'',
        eventTime:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleRadioChange = (e) => {
        if(e.currentTarget.value === 'true'){
            this.setState({
                [e.target.name]: true
            })
        }else if(e.currentTarget.value === 'false'){
            this.setState({
                [e.target.name]: false
            })
        }else{
            this.setState({
                [e.target.name]: e.currentTarget.value
            })
        }
        
        
    }
    
    handleDropdownChange = (e) => {
        this.setState({
            [e.target.id]: e.currentTarget.value
        })
    }


    componentDidMount(){
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("submiting ",this.state)
        this.props.createEvent(this.state);
        this.setState({
            title:'',
            isRecurring: false,
            weekday:'',
            eventTime:''
        });
        
        //close modal
        //var instance = M.Modal.getInstance(document.getElementById('modal-close-btn'));
        //M.Modal.init(elem);

        let elem = document.querySelector('#createEventModal');
        var instance = M.Modal.init(elem);
        
        //var instance = M.Modal.getInstance(elem);
        instance.close();
        //document.getElementById("EventsForm").reset();
    }

    render(){
        return(
             <div id="createEventModal" className="modal modal-fixed-footer">
                 
             <form id="eventsForm" onSubmit={this.handleSubmit}>
                <div className="modal-content">
                    <div className="row">
                        <h4>New Event</h4>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="title" type="text" className="validate"  onChange={this.handleChange} value={this.state.title} required />
                            <label htmlFor="title">Event Name</label>
                        </div> 
                        
                    </div>
                    <div className="row">
                    <div className="input-field col s8 offset-s2 center">
                        
                            <span className="col s6">
                                <label>
                                    <input onChange={this.handleRadioChange} value="true" name="isRecurring" type="radio" />
                                    <span>Recurring Event</span>
                                </label>                            
                            </span>
                            <span className="col s6">
                                <label>
                                    <input onChange={this.handleRadioChange} value="false" name="isRecurring" type="radio"  />
                                    <span>Single Event</span>
                                </label>                            
                            </span>
                            
                    </div> 

                        
                        
                    </div>
                    <div className="row">
                        <div className="input-field col s12 center">
                            
                            <span className="col s2 l1">
                                <label>
                                    <input onChange={this.handleRadioChange} value="Sunday" name="weekday" type="radio"  />
                                    <span>Sun</span>
                                </label>                            
                            </span>
                            <span className="col s2 l1">
                                <label>
                                    <input onChange={this.handleRadioChange} value="Monday" name="weekday" type="radio"  />
                                    <span>Mon</span>
                                </label>                            
                            </span>
                            <span className="col s2 l1">
                                <label>
                                    <input onChange={this.handleRadioChange} value="Tuesday" name="weekday" type="radio"  />
                                    <span>Tue</span>
                                </label>                            
                            </span>
                            <span className="col s2 l1">
                                <label>
                                    <input onChange={this.handleRadioChange} value="Wednesday" name="weekday" type="radio"  />
                                    <span>Wed</span>
                                </label>                            
                            </span>
                            <span className="col s2 l1">
                                <label>
                                    <input onChange={this.handleRadioChange} value="Thursday" name="weekday" type="radio"  />
                                    <span>Thu</span>
                                </label>                            
                            </span>
                            <span className="col s2 l1">
                                <label>
                                    <input onChange={this.handleRadioChange} value="Friday" name="weekday" type="radio"  />
                                    <span>Fri</span>
                                </label>                            
                            </span>
                            <span className="col s2 m1">
                                <label>
                                    <input onChange={this.handleRadioChange} value="Sunday" name="weekday" type="radio"  />
                                    <span>Sat</span>
                                </label>                            
                            </span>

                            
                            

                        </div>
                    </div>            
                   
                </div>
                    <div className="modal-footer">
                        <button id="modal-close-btn" type="submit" className="btn">Submit</button>
                    </div>
                </form>
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        createEvent: (event) => dispatch(createEvent(event))
    }
}
export default connect(null, mapDispatchToProps)(CreateEvent);