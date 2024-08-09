import { requestServer } from '../utils';
import { ACTION_TYPE } from './action-type';

export const logout = () => {
	requestServer('/logout', 'POST');
	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
