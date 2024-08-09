import { ACTION_TYPE } from './action-type';

export const setProjectData = (project) => {
	return {
		type: ACTION_TYPE.SET_PROJECT_DATA,
		payload: project,
	};
};
