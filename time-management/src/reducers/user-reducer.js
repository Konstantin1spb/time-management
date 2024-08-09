import { ACTION_TYPE } from '../actions/action-type';

const initialUserState = {
	id: null,
	login: null,
	roleId: null,
	registeredAt: null,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;
		default:
			return state;
	}
};
