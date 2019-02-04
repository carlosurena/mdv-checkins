import React from 'react';
import {Link} from 'react-router-dom'
import { Table, Icon, Label, Menu } from 'semantic-ui-react'

const MembersTable = ({members}) => {

    //const {member} = this.props;
    console.log(members);
  
        return(
            <div className="">
                
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Birthdate</Table.HeaderCell>
                        <Table.HeaderCell>Gender</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {members && members.map(member => {
                            return(
                            <Table.Row key={member.id}>
                                <Table.Cell><Link to={"/member/"+member.id}>{member.first_name + " " + member.last_name} </Link> </Table.Cell>
                                <Table.Cell>{(new Date(member.dob.toDate()).toLocaleString().split(",")[0])}</Table.Cell>
                                <Table.Cell>{member.gender}</Table.Cell>
                                <Table.Cell>{member.phone}</Table.Cell>
                            </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        )


}

export default MembersTable