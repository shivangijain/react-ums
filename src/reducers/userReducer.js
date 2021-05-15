import {FETCH_USERS, REJECT_USERS, FETCH_USER, SET_PAGE, SET_ROWS_PER_PAGE} from '../constants'

export const usersList = (state = {page: 0, rowsPerPage: 10}, action) => {
	switch (action.type) {
		case FETCH_USERS: {
			return {
				...state,
				users: action.users
			};
		}

		case FETCH_USER: {
			return {
				...state,
				user: action.user
			};
		}

		case SET_PAGE: {
			return {
				...state,
				page: action.page
			};
		}

		case SET_ROWS_PER_PAGE: {
			return {
				...state,
				rowsPerPage: action.rowsPerPage
			};
		}

		case REJECT_USERS: {
			return {
				...state,
				error: action.error
			};
		}

		default:
			return state;
	}
};