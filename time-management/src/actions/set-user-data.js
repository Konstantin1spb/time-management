import { ACTION_TYPE } from './action-type';

export const setUserData = (user) => {
	return {
		type: ACTION_TYPE.SET_USER_DATA,
		payload: user,
	};
};
