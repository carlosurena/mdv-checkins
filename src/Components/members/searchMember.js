import React, { Component } from 'react'

class SearchMember extends Component {

    state = {
        query: ''
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        console.log('searching for person ' + this.state.query)
    }

    handleChange = (e) => {
        this.setState({
            query : e.target.value
        })
    }
  render() {
    return (
      <div className="row">
          <form className="s12" onSubmit={this.handleSubmit}>
            <div className="row">
                <div className="input-field col s12 m6 offset-m6">
                    <div className="row">
                        <div className="col s9">
                            <input placeholder="Search people..." type="text" value = {this.state.query} onChange={ this.handleChange} id="autocomplete-input" className="autocomplete" />
                        </div>
                        <div className="col s3 valign-wrapper">
                            <button type="submit" className="btn">Search</button>

                        </div>
                    </div>
                    

                </div>
            </div>
          </form>
      </div>
    )
  }
}

export default SearchMember
