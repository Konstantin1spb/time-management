import { ACTION_TYPE } from './action-type';

export const setProjectType = (type) => {
	return {
		type: ACTION_TYPE.SET_PROJECT_TYPE,
		payload: type,
	};
};
