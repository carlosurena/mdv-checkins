import React,{Component} from 'react'
import { connect } from 'react-redux'
class Home extends Component{

    state = {

    }
    render(){
        return(
            <div className="container">
            {console.log("props", this.props)}
    
                <h1 className="center">
                    Home Pager
                </h1>
                
                <p>
                    ddfLorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat quibusdam reiciendis corporis repudiandae delectus, aliquid numquam voluptas aliquam! Distinctio, voluptas enim. Facilis, magnam? Ad cum culpa praesentium nulla ut molestiae?
                </p>
                <h3>
                    {this.props.user ? ("Welcome, "+this.props.user.displayName+ "!"):(null)}
                </h3>
                
            </div>
        )
    }
    
}

const mapStateToProps = (reduxState) => {
    console.log(reduxState)
    return{
        user : reduxState.firebase.auth
    }
}
export default connect(mapStateToProps)(Home)