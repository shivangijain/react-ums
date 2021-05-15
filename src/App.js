import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect }    from 'react-redux';
import Header from './components/Header';
import Landing from './components/Landing';
import User from './components/User';
import { getUsers }  from './actions';
import './App.css';

const App = (props) => {
  useEffect(() => {
    localStorage.clear();
    props.getUsers();
  }, []);

  
    if(!props.users) return <div>Loading...</div>
    return (
      <div className="container main_container">
        <BrowserRouter>
          <Header />
					<Route 
            exact
            path='/' 
            component={Landing}/>
					<Route path='/user/:id' component={User}/>
				</BrowserRouter>
      </div>
    );
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers())
  }
}

const mapStateToProps = state => {
  return { users: state.usersList.users }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);