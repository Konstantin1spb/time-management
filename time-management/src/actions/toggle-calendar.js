import { ACTION_TYPE } from './action-type';

export const toggleModal = (bool) => {
	return {
		type: ACTION_TYPE.TOGGLE_MODAL,
		payload: bool,
	};
};
