import React, {Component} from 'react';
import { connect } from 'react-redux'
import {createEvent } from '../../store/actions/eventactions'
import { Modal, Form, Button } from 'semantic-ui-react'

class CreateEvent extends Component {
    state = {
        title:'',
        isRecurring: false,
        weekday:'',
        eventTime:'',
        modalOpen: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleRadioChange = (e, {value}) => {
       console.log('radio changed to', value)
       this.setState({
           weekday: value
       }) 
        
    }
    
    handleDropdownChange = (e) => {
        this.setState({
            [e.target.id]: e.currentTarget.value
        })
    }

    handleCheckbox = (e, {checked}) => {
        this.setState({
            isRecurring : checked
        })
    }


    componentDidMount(){
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("submiting ",this.state)
        this.props.createEvent(this.state,this.props.user);
        this.handleClose()
        
     
    }
    openModal = () =>{
        this.setState({
            modalOpen:true
        })
    }

    handleClose = () =>{
        this.setState({
            modalOpen:false,
            title:'',
            isRecurring: false,
            weekday:'',
            eventTime:''
        })
    }

    render(){


        
        return(
            <div>
            <Button primary onClick={this.openModal}>+ Event</Button>
                <Modal open={this.state.modalOpen} onClose={this.handleClose} size="tiny" >
                    <Modal.Header>
                        Create an Event
                    </Modal.Header>
                    <Modal.Content>
                    <div className="ui grid">

                        <Form onSubmit={this.handleSubmit} id="addEvent">
                            <Form.Group>
                                <Form.Field required>
                                    <label>Title</label>
                                    <input  id="title" onChange={this.handleChange} placeholder='First Name' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group inline>
                                <label>{this.state.isRecurring ? ('Recurring Event') :('Single Event')}</label>
                                <Form.Checkbox 
                                checked={this.state.isRecurring}
                                id='isRecurring'
                                onChange={this.handleCheckbox} 
                                toggle></Form.Checkbox>
                                
                                
                            </Form.Group>

                            <Form.Group inline>
                                {this.state.isRecurring ? (
                                    <Form.Field inline required>
                                        <label>Day</label>
                                        <Form.Checkbox 
                                        radio
                                        label='Mon'
                                        name='weekday'
                                        value='Monday'
                                        checked={this.state.weekday === 'Monday'}
                                        onChange={this.handleRadioChange}
                                        />
                                        <Form.Checkbox 
                                        radio
                                        label='Tue'
                                        name='weekday'
                                        value='Tuesday'
                                        checked={this.state.weekday === 'Tuesday'}
                                        onChange={this.handleRadioChange}
                                        />
                                        <Form.Checkbox 
                                        radio
                                        label='Wed'
                                        name='weekday'
                                        value='Wednesday'
                                        checked={this.state.weekday === 'Wednesday'}
                                        onChange={this.handleRadioChange}
                                        />
                                        <Form.Checkbox 
                                        radio
                                        label='Thu'
                                        name='weekday'
                                        value='Thursday'
                                        checked={this.state.weekday === 'Thursday'}
                                        onChange={this.handleRadioChange}
                                        />
                                        <Form.Checkbox 
                                        radio
                                        label='Fri'
                                        name='weekday'
                                        value='Friday'
                                        checked={this.state.weekday === 'Friday'}
                                        onChange={this.handleRadioChange}
                                        />
                                        <Form.Checkbox 
                                        radio
                                        label='Sat'
                                        name='weekday'
                                        value='Saturday'
                                        checked={this.state.weekday === 'Saturday'}
                                        onChange={this.handleRadioChange}
                                        />
                                        <Form.Checkbox 
                                        radio
                                        label='Sun'
                                        name='weekday'
                                        value='Saturday'
                                        checked={this.state.weekday === 'Sunday'}
                                        onChange={this.handleRadioChange}
                                        />
                                    </Form.Field>
                                    ) : (null)}
                               
                            </Form.Group>
                                
                                
                            
                            <Form.Group>
                               
                            </Form.Group>

                            
                        </Form>
                    </div>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button  disabled= {
                            !this.state.title ||
                            (this.state.isRecurring && !this.state.weekday)
                        }  positive type="submit" form="addEvent" >Create</Button>
                        <Button negative type="" onClick={this.handleClose}>Cancel</Button>

                    </Modal.Actions>
                </Modal>
            
             {/* <div id="createEventModal" className="modal modal-fixed-footer">
                 
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
            </div> */}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        createEvent: (event,user) => dispatch(createEvent(event,user))
    }
}

const mapStateToProps = (reduxState) =>{
    return {
        user : reduxState.firebase.auth
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);