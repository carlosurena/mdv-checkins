import React, {Component} from 'react';
import { connect } from 'react-redux'
import {createMember } from '../../store/actions/memberactions'
import {Modal, Button, Form, Dropdown} from 'semantic-ui-react'

class AddMember extends Component {
    state = {
        fname: '',
        lname:'',
        dob: '',
        gender: '',
        phone: '',
        createdOn:'',
        type:'',
        modalOpen: false
    }

    handleChange = (e) => {
        console.log('input is changing', e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleRadioChange = (e) => {
        this.setState({
            [e.target.name]: e.currentTarget.value
        })
    }
    
    handleDropdownChange = (e, data) => {

        if(data.placeholder === "Select Gender"){
            console.log('gender is changing', data)

            this.setState({
                gender: data.value
            })
        }else if(data.placeholder === "Select Member Type"){
            console.log('type is changing', data)

            this.setState({
                type: data.value
            })
        }
        
    }


    componentDidMount(){
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("submiting ",this.state)
        this.props.createMember(this.state);
        this.setState({
            fname: '',
            lname: '',
            dob: '',
            gender: '',
            phone: '',
            createdOn:'',
            type:''
        });
        
      this.handleClose()
    }

    openModal = () =>{
        this.setState({
            modalOpen:true
        })
    }

    handleClose = () =>{
        this.setState({
            modalOpen:false
        })
    }
    render(){
        const genderOptions = [
            {key: 'm', text: 'Male', value: 'M'},
            {key: 'f', text: 'Female', value: 'F'},
        ]

        const memberOptions = [
            {key: 'visitor', text: 'Visitor', value: 'Visitor'},
            {key: 'visitorInProgress', text: 'Visitor in Progress', value: 'VisitorInProgress'},
            {key: 'passiveMember', text: 'Passive Member', value: 'PassiveMember'},
            {key: 'activeMember', text: 'Active Member', value: 'ActiveMember'},


        ]
        return(
            <div className="">
                <Button className="" primary onClick={this.openModal}>+ Person</Button>
                <Modal open={this.state.modalOpen} onClose={this.handleClose} size="tiny" >
                    <Modal.Header>
                        Add a Person
                    </Modal.Header>
                    <Modal.Content>
                    <div className="ui grid">

                        <Form onSubmit={this.handleSubmit} id="addPerson">
                            <Form.Group>
                                <Form.Field required>
                                    <label>First Name</label>
                                    <input  id="fname" onChange={this.handleChange} placeholder='First Name' />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Last Name</label>
                                    <input  id="lname" onChange={this.handleChange} placeholder='Last Name' />
                                </Form.Field> 
                            </Form.Group>
                            <Form.Group>
                                <Form.Field required>
                                    <label>Gender</label>
                                    <Dropdown required placeholder='Select Gender' fluid selection onChange={this.handleDropdownChange} options={genderOptions}>
                                        </Dropdown>                         
                                </Form.Field>
                                <Form.Field required>
                                    <label>Member Type</label>
                                    <Dropdown required placeholder='Select Member Type' fluid selection onChange={this.handleDropdownChange} options={memberOptions}>
                                    </Dropdown>                         
                                </Form.Field>
                            </Form.Group>
                                
                                
                            
                            <Form.Group>
                                <Form.Field required>
                                    <label>Birthdate</label>
                                    <input required id="dob" type="date" onChange={this.handleChange} placeholder='Birthdate' />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Phone #</label>
                                    <input required id="phone" onChange={this.handleChange} placeholder='Phone Number' />
                                </Form.Field> 
                            </Form.Group>

                            
                        </Form>
                    </div>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button  disabled= {
                            !this.state.fname ||
                            !this.state.lname ||
                            !this.state.gender ||
                            !this.state.type ||
                            !this.state.dob ||
                            !this.state.phone
                        }  positive type="submit" form="addPerson" >Create</Button>
                        <Button negative type="" onClick={this.handleClose}>Cancel</Button>

                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        createMember: (member) => dispatch(createMember(member))
    }
}
export default connect(null, mapDispatchToProps)(AddMember);