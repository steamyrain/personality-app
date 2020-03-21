import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import NavBar from './components/NavBar'
import Button from '@material-ui/core/Button'
import {withAuth} from '@okta/okta-react'
import BubbaDucky from './bubbaducky.png'
function LandingPage(props){
	const [auth,setAuth] = useState(null)
	useEffect(()=>{
		const fetchAuth = async() => {
			const authenticated = await props.auth.isAuthenticated();
			console.log(authenticated)
			if (authenticated !== auth){setAuth(authenticated)}
		}
		fetchAuth();
	},[])
	return(
		auth ? (
			<Redirect to='/home'/>
		):
		(
			<div>
				<NavBar auth={props.auth}
					Button={
						<Button
							color="inherit" 
							onClick={()=>props.auth.login('/home')}
						>
							Login
						</Button>
					}
				
				/>
				<img alt="bubba-ducky" src={BubbaDucky} />
			</div>
		)
	)
}
export default withAuth(LandingPage)
