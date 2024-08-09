import { ACTION_TYPE } from '../actions/action-type';

const initialProjectState = {
	id: null,
	title: '',
	description: '',
	deadline: '',
	isDone: null,
	createdAt: null,
};

export const projectReducer = (state = initialProjectState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PROJECT_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.RESET_PROJECT_DATA:
			return initialProjectState;
		default:
			return state;
	}
};
