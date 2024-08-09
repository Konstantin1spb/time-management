import styled from 'styled-components';
import { Button, Container, H2, Loader, Pagination, Search } from '../../components';
import { ProjectCard } from '../projects/components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { debounce, requestServer } from '../../utils';
import { PAGINATION_LIMIT } from '../../constants/pagination-limit';
import { PROJECT_TYPES } from './constants/project-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjectType } from '../../selectors';
import { logout, setProjectType } from '../../actions';
import { Charts } from './components/charts';
import { useNavigate } from 'react-router-dom';

const AnalyticsContainer = ({ className }) => {
	const [projects, setProjects] = useState([]);
	const [shouldUpdateProjects, setShouldUpdateProjects] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [isSorting, setIsSorting] = useState(false);
	const projectsTypeRef = useRef(null);
	const dispatch = useDispatch();
	const currentProjectType = useSelector(selectProjectType);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		requestServer(
			`/projects?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sort=${isSorting}&type=${currentProjectType}`,
		)
			.then((projects) => {
				if (projects.error) {
					console.log(projects.error);
					setIsLoading(false);
				}
				setProjects(projects.data);
				setLastPage(projects.lastPage);
				setIsLoading(false);
			})
			.catch(() => {
				localStorage.removeItem('userData');
				dispatch(logout());
				navigate('/login');
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldUpdateProjects, page, isSorting]);

	const startDelayedSearch = useMemo(() => debounce(setShouldUpdateProjects, 1000), []);

	const onSearchChange = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldUpdateProjects);
	};

	const onSortClick = () => {
		setIsSorting(!isSorting);
	};

	const onProjectsTypeListClick = () => {
		projectsTypeRef.current.classList.toggle('active');
	};

	const onProjectTypeClick = (title) => {
		dispatch(setProjectType(title));
		projectsTypeRef.current.classList.toggle('active');
		setShouldUpdateProjects(!shouldUpdateProjects);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<main className={className}>
			<H2>Аналитика</H2>
			<Container>
				<div className="projects-container">
					<Charts shouldUpdateProjects={shouldUpdateProjects} />
					<div className="projects-header">
						<div className="projects-type">
							<Button
								width="155px"
								height="45px"
								padding="0 12px"
								onClick={onProjectsTypeListClick}
							>
								{currentProjectType}
							</Button>
							<ul className="projects-type__list" ref={projectsTypeRef}>
								{PROJECT_TYPES.map(({ title }) => (
									<li
										key={title}
										onClick={() => onProjectTypeClick(title)}
									>
										{title}
									</li>
								))}
							</ul>
						</div>
						<Search
							searchPhrase={searchPhrase}
							onSearchChange={onSearchChange}
						/>
						<Button
							maxwidth="215px"
							height="45px"
							fontSize="16px"
							onClick={onSortClick}
						>
							{isSorting ? 'Отменить' : 'Сортировать по дедлайну'}
						</Button>
					</div>
					<div className="projects-list">
						{projects.length ? (
							projects.map(({ id, title, deadline, done }) => (
								<ProjectCard
									key={id}
									id={id}
									title={title}
									deadline={deadline}
									shouldUpdateProjects={shouldUpdateProjects}
									setShouldUpdateProjects={setShouldUpdateProjects}
									isDone={done}
								/>
							))
						) : (
							<div className="no-projects">Проектов нет</div>
						)}
					</div>
				</div>
				<Pagination page={page} setPage={setPage} lastPage={lastPage} />
			</Container>
		</main>
	);
};

export const Analytics = styled(AnalyticsContainer)`
	.projects-container {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.projects-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.projects-list {
		display: flex;
		flex-direction: column;
		gap: 25px;
		min-height: 705px;
		overflow-y: auto;
	}

	.projects-type {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.projects-type__list {
		display: flex;
		flex-direction: column;
		gap: 9px;
		height: 0;
		font-size: 0;
		background-color: #fff;
		color: #000;
		list-style: none;
		padding: 0;
		margin: 0;
		transition-duration: 0.2s;
		position: absolute;
		z-index: 3;
		border-radius: 10px;
		top: 55px;
	}

	.projects-type__list.active {
		height: auto;
		font-size: 16px;
		padding: 13px 23px;
	}

	.projects-type__list li {
		cursor: pointer;
	}

	.no-projects {
		display: flex;
		justify-content: center;
		font-size: 20px;
		font-weight: bold;
		margin-top: 50px;
	}
`;
