import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserRole } from '../selectors';

export const useRedirectIfUserLogged = (setIsLoading) => {
	const navigate = useNavigate();
	const currentRole = useSelector(selectUserRole);

	useEffect(() => {
		if (currentRole) {
			navigate('/');
			setIsLoading(false);
		}
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
