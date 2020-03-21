import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import {makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
		root:{
			flexGrow:1,
		},
		title:{
			flexGrow:1,
		},
	})			
);
export default function NavBar(props) {
	const classes = useStyles();
	return(
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						Peeps
					</Typography>
					{
						props.Button
					}
				</Toolbar>
			</AppBar>
		</div>
	)
}

