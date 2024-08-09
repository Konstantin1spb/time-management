import { ACTION_TYPE } from '../actions/action-type';

const initialAnalyticsState = {
	projectType: 'Все проекты',
};

export const analyticsReducer = (state = initialAnalyticsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PROJECT_TYPE:
			return {
				...state,
				projectType: action.payload,
			};
		default:
			return state;
	}
};
