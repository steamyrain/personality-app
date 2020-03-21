import React from 'react'
import Button from '@material-ui/core/Button'
import {withAuth} from '@okta/okta-react'
export default withAuth( function LogoutButton(props){
	return(
		<Button color="inherit"
			onClick={(e)=>{
					e.preventDefault()
					props.auth.logout('/')
				}}
		>
			Logout
		</Button>
	)
})
