import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { setActiveMemberMenuItem } from '../../store/actions/memberactions'
class MemberMenu extends Component {
    state = { 
        
    }

    handleItemClick = (e, { name }) => {
        
        this.props.setActiveMemberMenuItem(name)
    }

    
    
  render() {
      const {activeItem} = this.props
    return (
      <div>
      <Menu tabular>
          <Menu.Item 
          name='Info' 
          active={activeItem === 'Info'} 
          onClick={this.handleItemClick} 
          />
          <Menu.Item
            name='Other'
            active={activeItem === 'Other'}
            onClick={this.handleItemClick}
          />
          
          <Menu.Item
            name='Reports'
            active={activeItem === 'Reports'}
            onClick={this.handleItemClick}
          />
          
        </Menu>
      </div>
    )
  }
}
const mapStateToProps = (reduxState) => {
    return{
        activeItem : reduxState.member.activeItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setActiveMemberMenuItem : (activeItem) => dispatch(setActiveMemberMenuItem(activeItem))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MemberMenu)