import React,{Component} from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {Security,SecureRoute,ImplicitCallback} from '@okta/okta-react'
import config from './config'
import HomeUpload from './HomeUpload'
import LandingPage from './LandingPage'

class App extends Component {
	render(){
		return(
			<Router>
				<Security
				{...config.oidc}
				>
					<Switch>
						<Route exact path="/" component={LandingPage}/>
						<Route path="/implicit/callback" 
						component={ImplicitCallback} />
						<SecureRoute path="/home" component={HomeUpload}/>
					</Switch>
				</Security>
			</Router>
		)
	}
}

export default App;
