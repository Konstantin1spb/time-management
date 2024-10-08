import { requestServer } from '../utils';
import { logout } from './logout';
import { setProjectData } from './set-project-data';

export const loadProjectAsync = (projectId, navigate) => (dispatch) =>
	requestServer(`/projects/${projectId}`)
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
