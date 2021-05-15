import React, { useEffect } from 'react';
import { connect }    from 'react-redux';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Button } from '@material-ui/core';
import { getUser } from '../actions';
import { Link } from 'react-router-dom';

const User = (props) => {
		useEffect(() => {
			const id = window.location.pathname.split('/')[2]
			props.getUser(id);
		}, []);
		const { user } = props;
		
	if(!user) return <h1>No User present </h1>
	return(
		<React.Fragment>
			<Link
				to='/'
        className="button icon-left">
        {'< Back'}
      </Link>
			{user && 
				<Card >
					<CardActionArea>
						<CardMedia
							component="img"
							alt="Contemplative Reptile"
							height="180"
							image={user.avatar}
							title="Contemplative Reptile"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2" style={{backgroundColor: 'blue', color: 'white', textAlign: 'center'}}>
								{`${user.first_name} ${user.last_name}`}
							</Typography>
							<Typography style={{textAlign: 'center'}} >
								{user.email}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>}
		</React.Fragment>    
	)
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: (id) => dispatch(getUser(id))
  }
}

const mapStateToProps = state => {
  return { user: state.usersList.user }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);