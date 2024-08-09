import { ACTION_TYPE } from '../actions';

const initialAppState = {
	isModalActive: false,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.TOGGLE_MODAL:
			return {
				...state,
				isModalActive: action.payload,
			};
		default:
			return state;
	}
};
