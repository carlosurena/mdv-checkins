import React, {Component} from 'react';
import { connect } from 'react-redux'
import {createMember } from '../../store/actions/memberactions'
import M from 'materialize-css'


class AddMember extends Component {
    state = {
        fname: '',
        lname:'',
        dob: '',
        gender: 'M',
        phone: '',
        createdOn:'',
        type:''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleRadioChange = (e) => {
        this.setState({
            [e.target.name]: e.currentTarget.value
        })
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
        this.props.createMember(this.state);
        this.setState({
            fname: '',
            lname: '',
            dob: '',
            gender: 'M',
            phone: '',
            createdOn:'',
            type:''
        });
        
        //close modal
        //var instance = M.Modal.getInstance(document.getElementById('modal-close-btn'));
        //M.Modal.init(elem);

        let elem = document.querySelector('#addMemberModal');
        var instance = M.Modal.init(elem);
        
        //var instance = M.Modal.getInstance(elem);
        instance.close();
        //document.getElementById("membersForm").reset();
    }

    render(){
        return(
             <div id="addMemberModal" className="modal modal-fixed-footer">
             <form id="membersForm" onSubmit={this.handleSubmit}>
                <div className="modal-content">
                    <div className="row">
                        <h4>New Member</h4>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="fname" type="text" className="validate"  onChange={this.handleChange} value={this.state.fname} required />
                            <label htmlFor="fname">First Name</label>
                        </div> 
                        <div className="input-field col s6">
                            <input id="lname" type="text" className="validate"  onChange={this.handleChange} value={this.state.lname} required />
                            <label htmlFor="lname">Last Name</label>
                        </div>   
                    </div>
                    <div className="row">
                    <div className="input-field col s6">
                            <span className="col s6">
                                <label>
                                    <input onChange={this.handleRadioChange} value="M" name="gender" type="radio" checked />
                                    <span>Male</span>
                                </label>                            
                            </span>
                            <span className="col s6">
                                <label>
                                    <input onChange={this.handleRadioChange} value="F" name="gender" type="radio"  />
                                    <span>Female</span>
                                </label>                            
                            </span>
                            
                        </div> 

                        <div className="input-field col s6">
                            <i className="material-icons prefix">insert_invitation</i>
                            <input id="dob" type="date" className="validate"  onChange={this.handleChange} value={this.state.dob} required />
                            <label htmlFor="dob">Birthdate</label>
                        </div> 
                        
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
                            <input id="phone" type="tel" className="validate"  onChange={this.handleChange} value={this.state.phone} required />
                            <label htmlFor="phone">Phone Number</label>
                        </div> 
                        <div className="input-field col s6">
                            <select id="type" onChange={this.handleDropdownChange}>
                                <option value="" disabled selected>Choose a type</option>
                                <option value="Visitor">Visitor</option>
                                <option value="Passive">Passive Member</option>
                                <option value="Active">Active Member</option>
                            </select>
                            <label>Type of Member</label>
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
        createMember: (member) => dispatch(createMember(member))
    }
}
export default connect(null, mapDispatchToProps)(AddMember);