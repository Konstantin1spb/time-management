import { useNavigate } from 'react-router-dom';
import { requestServer } from '../utils';
import { logout } from './logout';
import { setProjectData } from './set-project-data';

export const loadProjectAsync = (projectId) => (dispatch) => {
	const navigate = useNavigate();

	return requestServer(`/projects/${projectId}`)
		.then((project) => {
			if (project.data) {
				dispatch(setProjectData(project.data));
			}

			return project;
		})
		.catch(() => {
			localStorage.removeItem('userData');
			dispatch(logout());
			navigate('/login');
		});
};
