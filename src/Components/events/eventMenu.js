import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { setActiveEventMenuItem } from '../../store/actions/eventactions'
class EventMenu extends Component {
    state = { 
        
    }

    handleItemClick = (e, { name }) => {
        
        this.props.setActiveEventMenuItem(name)
    }

    
    
  render() {
      const {activeItem} = this.props
    return (
      <div>
      <Menu tabular>
          <Menu.Item name='Info' active={activeItem === 'Info'} onClick={this.handleItemClick} />
          <Menu.Item
            name='Locations'
            active={activeItem === 'Locations'}
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
        activeItem : reduxState.event.activeItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setActiveEventMenuItem : (activeItem) => dispatch(setActiveEventMenuItem(activeItem))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EventMenu)