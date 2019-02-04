import React, { Component } from 'react'
import {Button, Modal,Header} from 'semantic-ui-react'

class PersonDetailsModal extends Component {
    state = {
        modalOpen : false
    }
    openModal = () =>{
        this.setState({
            modalOpen : true
        })
    }

    handleClose = () =>{
        this.setState({
            modalOpen : false
        })
    }
  render() {
      const {first_name, last_name, dob, gender,phone, type} = this.props.attendee
    return (
      <div>
        <Modal open={this.state.modalOpen} onClose={this.handleClose} trigger={<Button onClick={this.openModal}>{first_name+" "+last_name}</Button>}>
            <Modal.Header>
                {first_name} {last_name}
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>Personal Information</Header>
                    <p>{Math.abs(new Date(Date.now() - dob.toDate()).getUTCFullYear() - 1970 )} years old</p>
                    <p>Gender: {gender}</p>
                    <p>Member Type: {type}</p>
                    <p>Contact Number: {phone}</p>

                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={this.handleClose} negative>Close</Button>
            </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default PersonDetailsModal
