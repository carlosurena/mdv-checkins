import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Button, Select, Radio, Form } from 'semantic-ui-react'

class MemberStats extends Component {

  state = {
    isEditing: false,
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    phone: '',
    type: ''
  }

  handleButtonClick = (e) => {
    console.log('pressed');
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }))
  }

  handleInputChange = (e) => {

    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('submitting form');
    this.setState({
      isEditing: false
    })
  }

  handleChange = (e, { gender }) => {
    console.log('changing radio')
    this.setState({
      gender
    })
    console.log(this.state.gender)
  }

  handleRadioChange = (e) => {
    this.setState({
      [e.target.name]: e.currentTarget.value
    })
  }


  render() {
    const { member } = this.props
    const membershipOptions = [
      { key: 'Visitor', value: 'Visitor', text: 'Visitor', text_esp: 'Visita' },
      { key: 'RegularVisitor', value: 'RegularVisitor', text: 'Regular Visitor', text_esp: 'Visita Regular' },
      { key: 'Passive', value: 'Passive', text: 'Passive Member', text_esp: 'Miembro Pasivo' },
      { key: 'Active', value: 'Active', text: 'Active Member', text_esp: 'Miembro Activo' }]

    const stats = this.state.isEditing ? (
      <div>
        <div className="container section">
          <div className="card">
            <div className="card-content">
              <form onSubmit={this.handleFormSubmit}>
                <div className="input-field">
                  <label className='active' htmlFor="first_name">First name</label>

                  <input type="text" id="first_name" defaultValue={member.first_name} onChange={this.handleInputChange} />
                </div>


                <div className="input-field">
                  <label className='active' htmlFor="last_name">Last name</label>
                  <input type="text" id="last_name" defaultValue={member.last_name} onChange={this.handleInputChange} />
                </div>



                <div className="input-field">

                  <input type="tel" id="phone" defaultValue={member.phone} onChange={this.handleInputChange} />
                  <label className='active' htmlFor="phone">Phone</label>
                </div>
                <div className="input-field">
                  <label className='active' htmlFor="dob">Birthdate</label>
                  <input type="date" id="dob" defaultValue={(new Date(member.dob.toDate()).toLocaleString().split(",")[0])} onChange={this.handleInputChange} />
                </div>

                <div className="input-field col s6 valign-wrapper">
                  <span className="col s6">
                    <label>
                      <input onChange={this.handleRadioChange} value="M" name="gender" type="radio" checked />
                      <span>Male</span>
                    </label>
                  </span>
                  <span className="col s6">
                    <label>
                      <input onChange={this.handleRadioChange} value="F" name="gender" type="radio" />
                      <span>Female</span>
                    </label>
                  </span>


                </div>
                <div className="input-field valign-wrapper">
                  <Select placeholder='Membership Type' options={membershipOptions} value={member.type}></Select>

                </div>




                <Button primary type='submit'>Save</Button>
              </form>

            </div>
          </div>
        </div>
      </div>

    ) : (

        <div className="container section">
          <div className="card">
            <div className="card-content">
              <div>General Information</div>
              <div className="">{member.first_name} {member.last_name}</div>
              <div className="">Gender: {member.gender}</div>
              <div className="">Phone Number: {member.phone}</div>
              <div className="">Birthdate: {(new Date(member.dob.toDate()).toLocaleString().split(",")[0])}</div>
              <div className="d">Member Type: {member.type}</div>
              <Button primary onClick={this.handleButtonClick}>Edit</Button>
            </div>
          </div>
        </div>

      )


    return (
      <div>
        {stats}
      </div>

    )
  }



}

const mapStateToProps = (reduxState, ownProps) => {
  console.log(reduxState)
  const id = ownProps.match.url.split("/")[2];
  console.log(id)
  const members = reduxState.firestore.data.members
  const member = members[id]
  return {
    member: member
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: 'members',
    }
  ])
)(MemberStats);
