import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProjectAsync, RESET_PROJECT_DATA } from '../../actions';
import { useMatch, useParams } from 'react-router-dom';
import { selectProject } from '../../selectors';
import { ProjectContent } from './components/project-content';
import { ErrorNotFound } from '../error/error';
import { Loader } from '../../components';

export const Project = () => {
	const dispatch = useDispatch();
	const isCreating = useMatch('/project');
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const project = useSelector(selectProject);

	useLayoutEffect(() => {
		dispatch(RESET_PROJECT_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		dispatch(loadProjectAsync(params.id)).then((project) => {
			if (project.error) {
				setError('Проект не найден');
			}
			setIsLoading(false);
		});
	}, [dispatch, params.id, isCreating]);

	if (error) {
		return <ErrorNotFound>Проект не найден</ErrorNotFound>;
	}

	if (isLoading) {
		return <Loader />;
	}

	return <ProjectContent project={project} />;
};
