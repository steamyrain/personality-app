import React,{Component,Fragment} from 'react'
import Grid from '@material-ui/core/Grid'
import PersonCard from './components/PersonCard'
import getJSONFlist from './scrapyClient'
import NavBar from './components/NavBar'
import LogoutButton from './components/LogoutButton'
import {withAuth} from '@okta/okta-react'

class Home extends Component {
	constructor(props){
		super(props)
		this.state={loading:true}
	}
	async componentDidMount(){
		getJSONFlist()
		.then(response=>{return this.setState({loading:false,data:response.items})})
	}
	renderList = data =>{
		return(
			data.map( item => (
				<Grid item key={item.profurl}>
					<PersonCard friend={item}/>
				</Grid>
			))	
		)
	}	
	render(){
		const {loading,data} = this.state
		return(
			<div>
				<NavBar Button={<LogoutButton auth={this.props.auth} />}/>
				<Grid container spacing={2}
				alignItems="center"
				justify="center">
					<Fragment>
						{loading?"wait":this.renderList(data)}
					</Fragment>
				</Grid>
			</div>
		)
	}
}

export default withAuth(Home);
