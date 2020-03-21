import React,{Component} from 'react'
import NavBar from './components/NavBar'
import LogoutButton from './components/LogoutButton'
import {withAuth} from '@okta/okta-react'
import FormUpload from './components/FormUpload'

class Home extends Component {
	render(){
		return(
			<div>
				<NavBar Button={<LogoutButton auth={this.props.auth}/>}/>
				<FormUpload auth={this.props.auth}/>
			</div>
		)
	}
}

export default withAuth(Home);
