import React from 'react';
import {Link} from 'react-router-dom'

const MembersTable = ({members, deleteMember}) => {

    //const {member} = this.props;
    console.log(members);
  
        return(
            <div className="">
                <table className="highlight centered ">
                    <thead>
                    <tr>
                        <th className="">Name</th>
                        <th className="hide-on-small-only">Birthdate</th>
                        <th className="hide-on-med-and-down">Gender</th>
                        <th className=""> Phone Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    { members && members.map(member => {
                        return (
                            <tr className="member" key= {member.id}>
                                <td> <Link to={"/member/"+member.id}>{member.first_name + " " + member.last_name} </Link> </td>
                                <td className="hide-on-small-only">{(new Date(member.dob.toDate()).toLocaleString().split(",")[0]) } </td>
                                <td  className="hide-on-med-and-down">{member.gender} </td>
                                <td>{member.phone} </td>
                            </tr>
                        )
                    })}  
                    </tbody>
                </table>
            </div>
        )


}

export default MembersTable