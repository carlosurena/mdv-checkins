import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Search, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'
import faker from 'faker'
import { Redirect } from 'react-router-dom'

var source;
const resultRenderer = ({ name,phone,age,image }) => {
    return(
            <div className="result">
                <div className="image">
                    <img src={image} alt=""/>
                </div>
            
                <div className="content">
                    <div className="price"  >{age}</div>
                    <div className="title"  >{name}</div>
                    <div className="description" >{phone}</div>
                    

                </div>
            </div>

    )
}
resultRenderer.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    age: PropTypes.string,

  }

class StationSearch extends Component {

    state = {
        value: '',
        isLoading: false,
        results: [],
        toMember: false,
        selectedID : ''

    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.name, selectedID: result.key, toMember: true })
        console.log('Person Selected')
    }

    handleSearchChange = (e, { value }) => {
        
        this.setState({ isLoading: true, value })
        console.log(this.props)
        console.log(this.state)


    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }


    componentDidMount(){
    
       
    }
    componentDidUpdate(){
        //console.log(this.props)
        const {members} = this.props
    
        source = members ? (
            _.times(members.length, (index) => ({
                name: members[index].first_name +" "+ members[index].last_name,
                phone: members[index].phone,
                image: faker.internet.avatar(),
                age: Math.abs(new Date(Date.now() - members[index].dob.toDate().getTime()).getUTCFullYear() - 1970) + "yo",
                key: members[index].id
              }))
        ):(null
          )
           
        }
  render() {
      if(this.state.toMember){
        return <Redirect to={'/member/'+ this.state.selectedID} />
      }
    const { isLoading, value, results } = this.state
    
    return (
     <div className="row">

         <div className="col centered s12 m6">

     
            <Search
                fluid
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                resultRenderer= {resultRenderer}
                {...this.props}
            />
        
          </div>
        </div>
    )
  }
}

export default (StationSearch)
