import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme=> ({
	card: {
		maxWidth:165,
		maxHeight:100,
	},
	media:{
		height:0,
		paddingTop:'100%',
	},
})				
)
export default function PersonCard(props){
	const classes = useStyles()
	return(
		<div> {props.friend ? (
			<Card>
				<CardHeader className={classes.card}
					avatar={<Avatar src={props.friend.ppurl} />}
					title={props.friend.fname}
					subheader={props.friend.fmutual?props.friend.fmutual:'0 mutual friends'}
				/>
			</Card>
                ):null}
                </div>
	)
}

