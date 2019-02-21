import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PersonDetailsModal from './personDetailsModal'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { checkOutAttendee } from '../../store/actions/sheetActions'
class AttendeesList extends Component {
    state ={
        attendeeData : [],
        attendees : []
    }

    componentDidMount(){
        this.updateList();
    }

    componentDidUpdate(prevProps){
       
       // if an attendee is added to the sheet, update
        if(prevProps.sheet.attendees.length !== this.props.sheet.attendees.length){
            console.log('discrepancy in size')
            this.updateList()
        }

        // if a checkout button is clicked, update the attendance sheet
        if(prevProps.isCheckingOut != this.props.isCheckingOut){
            this.updateList()
        }
        
        
    }

    updateList = () => {
        const {sheet,members} = this.props
        //Find Members based on Attendee ID References in Sheet Doc
        console.log('updating list')
        this.setState({
            attendeeData : []
                })

        
        
        sheet.attendees ? (sheet.attendees.forEach(attendee => {
            members.find( member => {
                if(member.id == attendee.attendeeID){
                    console.log("member matched with attendee ID", member, attendee)
                    member.checkInDate = attendee.checkInDate;
                    member.checkOutDate = attendee.checkOutDate;
                    this.setState(prevState => ({
                        attendeeData: [...prevState.attendeeData, member]
                      }))
                }
            })
        })) :(console.log('no attendees checked in for this sheet.'));

        
    }

    checkOut = (attendee) => {
        this.props.handleCheckOut(attendee)
        //this.updateList()
    }
  render() {
      const {members,sheet, handleCheckOut} = this.props
      
    return (
      <div>
      <table className="ui table ">
                    <thead>
                    <tr>
                        <th className="">Name</th>
                        <th className="">Check-In</th>
                        <th className="">Check-Out</th>

                    </tr>
                    </thead>
                    <tbody>
                    { this.state.attendeeData && this.state.attendeeData.map(attendee => {
                        return (
                            <tr className="member" key={attendee.id}>
                                <td><PersonDetailsModal attendee={attendee} /></td>
                                <td>{(attendee.checkInDate) ? 
                                        (   
                                            (new Date(attendee.checkInDate.toDate()).toLocaleString().split(",")[1])
                                        ) : 
                                        (
                                            "-"
                                        )
                                    }</td>
                                <td>{(attendee.checkOutDate) ? 
                                        (   
                                            (new Date(attendee.checkOutDate.toDate()).toLocaleString().split(",")[1])
                                        ) : 
                                        (
                                            (this.props.handleCheckOut) ? (
                                                (this.props.isCheckingOut) ? 
                                                (
                                                    <Button negative disabled loading>Check out</Button>
                                                ) :
                                                (
                                                    <Button negative onClick={() => this.checkOut(attendee)}>Check out</Button>
                                                )
                                            ) : 
                                            (
                                                <Button negative disabled>Never Checked Out</Button>
                                            )
                                        )
                                    }</td>
                                

                            </tr>
                        )
                    })}  
                    </tbody>
                </table>
      </div>
    )
  }
}

export default (AttendeesList)
