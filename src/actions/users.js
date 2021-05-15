import {FETCH_USERS, REJECT_USERS, FETCH_USER, API_URL, SET_PAGE, SET_ROWS_PER_PAGE} from '../constants';
import axios from 'axios';

const fetchUsers = (response) => {
	return {
		type: FETCH_USERS,
		users: response.data
	}
};

const fetchUser = (user) => {
	return {
		type: FETCH_USER,
		user
	}
};


const rejectUsers = (error) => {
	return {
		type: REJECT_USERS,
		error
	}
};

export const getUsers = () => async dispatch => {
		const response = await axios.get(`${API_URL}`);
		if(response.status === 200){
			dispatch(fetchUsers(response.data));
		}else{
			dispatch(rejectUsers({msg: 'Something Went Wrong'}));
		}
};

export const getUser = (id) => (dispatch, getState) => {
	const users = getState().usersList.users || []
	const user = users.find(user => user.id == id)
	return dispatch(fetchUser(user))
}

export const setPage = (page) => (dispatch, getState) => {
	return dispatch({type: SET_PAGE, page})
}

export const setRowsPerPage = (rowsPerPage) => (dispatch, getState) => {
	return dispatch({type: SET_ROWS_PER_PAGE, rowsPerPage})
}

