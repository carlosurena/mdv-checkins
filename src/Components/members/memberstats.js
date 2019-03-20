import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Button, Select, Icon, Form, Card, Grid, TextArea, Dropdown} from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import ptLocale from 'react-semantic-ui-datepickers/dist/locales/pt-BR';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { updateMember } from '../../store/actions/memberactions'
class MemberStats extends Component {

  state = {
    isEditing: false,
    first_name: null,
    last_name: null,
    dob: null,
    gender: null,
    phone: null,
    type: null,
    email: null,
    allergies:null,
    other:null
  }

  handleButtonClick = (e) => {
    console.log('pressed');
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }))
  }

  handleInputChange = (e) => {
    console.log('changing ', e)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleTextareaChange = (e, data) => {
    console.log('changing ', e, data)
    this.setState({
      other: data.value
    })
  }

  handleDropdownChange = (e, data) => {
    console.log('changing dd', e, data)
    console.log(this.state.gender)
    // this.setState({
    //   [e.target.name]: e.target.value
    // })

    if(data.value === 'Male'){
      this.setState({
        gender: 'M'
      })
    }else if(data.value === 'Female'){
      this.setState({
        gender: 'F'
      })
    }
  }

  handleDateChange = (date) => {

    this.setState({
      dob : date
    })
    
  }

  handleFormSubmit = (date) => {

    console.log('saving')
    this.setState({
      isEditing : false
    })
    console.log(this.props.member)
    var member = new Object;
    member['id'] = this.props.member.id;
    member['first_name'] = this.state.first_name;
    member['last_name'] = this.state.last_name;
    member['gender'] = this.state.gender;
    member['dob'] = this.state.dob;
    member['type'] = this.state.type;
    member['email'] = this.state.email;
    member['phone'] = this.state.phone;
    member['allergies'] = this.state.allergies;
    member['other'] = this.state.other;


    console.log(member)
    this.props.updateMember(member)
    
  }
  handleFormCancel = () => {

    console.log('Cancelling')
    const { member } = this.props;

    this.setState({
      isEditing : false,
      first_name: member.first_name,
      last_name: member.last_name,
      dob: member.dob.toDate(),
      gender: member.gender,
      phone: member.phone,
      type: member.type,
      email: member.email,
      allergies: member.allergies,
      other: member.other

    })
    
  }

componentDidMount(){
  const {member} = this.props;

  this.setState({
    first_name: member.first_name,
    last_name: member.last_name,
    dob: member.dob.toDate(), //needs formatting
    gender: member.gender, //needs formatting
    phone: member.phone, //needs formatting
    type: member.type, //needs formatting
    email:member.email,
    allergies: member.allergies,
    other: member.other
  })
}


  render() {
    const { member } = this.props

    var formattedGender;
    if(this.state.gender && this.state.gender === 'F'){
      formattedGender = 'Female'
    }else if(this.state.gender && this.state.gender === 'M'){
      formattedGender = 'Male'
    }else{
      formattedGender = 'N/A'
    }
    var age;
    var formattedDOB;
    if(this.state.dob){
      age = Math.abs(new Date(Date.now() - this.state.dob.getTime()).getUTCFullYear() - 1970);
      formattedDOB = (new Date(this.state.dob).toLocaleString().split(",")[0])
    }
    const membershipOptions = [
      { key: 'Visitor', value: 'Visitor', text: 'Visitor', text_esp: 'Visita' },
      { key: 'RegularVisitor', value: 'RegularVisitor', text: 'Regular Visitor', text_esp: 'Visita Regular' },
      { key: 'Passive', value: 'Passive', text: 'Passive Member', text_esp: 'Miembro Pasivo' },
      { key: 'Active', value: 'Active', text: 'Active Member', text_esp: 'Miembro Activo' }]

    const genderOptions = [
        { key: 'M', value: 'Male', text: 'Male', text_esp: 'Hombre' },
        { key: 'F', value: 'Female', text: 'Female', text_esp: 'Mujer' }

    ]
  
    const stats = this.state.isEditing ? (
      

        <Grid columns={1} padded>
        <div className="ui segment basic"></div>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              General Information
            </Card.Header>
          </Card.Content>
          <Card.Content>
          <div className="ui divider hidden"></div>

            <form action="" className="ui form">
            <div className="ui equal width grid">
              
                <div className="column">
                  <div className="field">
                    <label><Icon name='user'></Icon>Gender</label>
                    <Dropdown selection onChange={this.handleDropdownChange} options={genderOptions} value={formattedGender}></Dropdown>
                  </div>
                  <div className="ui divider hidden"></div>
                  <div className="field">
                    <label><Icon name='calendar alternate'></Icon> Birthdate</label>
                    <SemanticDatepicker selected={this.state.dob} format='MM/DD/YYYY' onDateChange={this.handleDateChange} />
                  </div>

                  <div className="field">
                    <label><Icon name='address card'></Icon> Allergies</label>
                    <input onChange={this.handleInputChange} type="text" name="allergies" value={this.state.allergies} />
                  </div>

                  <div className="field">
                    <label><Icon name='address card'></Icon> Other Notes</label>
                    <TextArea onChange={this.handleTextareaChange} defaultValue={this.state.other}></TextArea>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <label><Icon flipped="horizontally" name='phone'></Icon> Phone Number</label>
                    <input onChange={this.handleInputChange} type="text" name="phone" value={this.state.phone} />
                  </div>
                  <div className="ui divider hidden"></div>

                  <div className="field">
                    <label><Icon name='mail'></Icon> Email</label>
                    <input onChange={this.handleInputChange} type="text" name="email" value={this.state.email} />
                  </div>
                </div>
              
            </div>
            <Button negative onClick={this.handleFormCancel} floated='right'>Cancel</Button>
            <Button positive onClick={this.handleFormSubmit} floated='right'>Save</Button>
            </form>
            <div className="ui divider hidden"></div>

          </Card.Content>
        </Card>  
      </Grid>
      

    ) : (
      <Grid columns={1} padded>
        <div className="ui segment basic"></div>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              General Information
              <Button basic icon="edit" floated="right" onClick={this.handleButtonClick}>
              </Button>
            </Card.Header>
          </Card.Content>
          <Card.Content>
          <div className="ui divider hidden"></div>

            <div className="ui equal width grid">
              <div className="column">
                <div>
                  <Icon name='user' ></Icon>
                  <b>Gender</b>
                  <p>{formattedGender}</p>
                </div>
                <div className="ui divider hidden"></div>

                <div className="">
                  <Icon name='calendar alternate'></Icon>
                  <b>Birthdate</b>
                  <p>{age} years old ({formattedDOB})</p>
                </div>
              </div>
              <div className="column">
                <div className="">
                  <Icon flipped='horizontally' name='phone'></Icon>
                  <b>Phone Number</b>
                  <p>{this.state.phone}</p>
                </div>
                <div className="ui divider hidden"></div>

                <div className="">
                  <Icon name='mail'></Icon>
                  <b>Email</b>
                  <p>{this.state.email}</p>
                </div>
              </div>

              
            </div>

            <div className="ui grid">
              <div className="column">
                <div>
                    <Icon name='address card' ></Icon>
                    <b>Allergies</b>
                    <p>{this.state.allergies}</p>
                </div>
                <div className="ui divider hidden"></div>

                <div>
                    <Icon name='address card' ></Icon>
                    <b>Other Notes</b>
                    <p>{this.state.other}</p>
                </div>
              </div>
            </div>
            
            <div className="ui divider hidden"></div>
          </Card.Content>
        </Card>  
      </Grid>


      )


    return (
      <div>
        {stats}
      </div>

    )
  }



}

const mapStateToProps = (reduxState, ownProps) => {
return {

}
}

const mapDispatchToProps = (dispatch) =>{
  return{
    updateMember : member => dispatch(updateMember(member))
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'members',
    }
  ])
)(MemberStats);
