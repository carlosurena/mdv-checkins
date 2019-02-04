import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PersonDetailsModal from './personDetailsModal'

class AttendeesList extends Component {
    state ={
        attendeeData : [],
        attendees : [],
    }

    componentDidMount(){
        this.updateList();
    }

    componentDidUpdate(prevProps){
       // console.log(prevProps.sheet,this.props.sheet)
        if(prevProps.sheet.attendees.length !== this.props.sheet.attendees.length){
            console.log('discrepancy in size')
            this.updateList()
        }
    }

    updateList = () => {
        const {sheet,members} = this.props
        //Find Members based on Attendee ID References in Sheet Doc
        this.setState({
            attendeeData : []
        })
        
        sheet.attendees ? (sheet.attendees.forEach(attendee => {
            members.find( member => {
                if(member.id == attendee.attendeeID){
                    //console.log("member matched with attendee ID", member, attendee)
                    this.setState(prevState => ({
                        attendeeData: [...prevState.attendeeData, member]
                      }))
                }
            })
        })) :(console.log('no attendees checked in for this sheet.'));
    }
  render() {
      const {members,sheet} = this.props
      
    return (
      <div>
      <table className="ui table ">
                    <thead>
                    <tr>
                        <th className="">Name</th>
                        <th className="">Age</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.attendeeData && this.state.attendeeData.map(attendee => {
                        return (
                            <tr className="member" key={attendee.id}>
                                <td><PersonDetailsModal attendee={attendee} /></td>
                                <td>{Math.abs(new Date(Date.now() - attendee.dob.toDate()).getUTCFullYear() - 1970 )}</td>
                                

                            </tr>
                        )
                    })}  
                    </tbody>
                </table>
      </div>
    )
  }
}

export default AttendeesList
