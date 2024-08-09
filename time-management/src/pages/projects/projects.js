import styled from 'styled-components';
import { Container } from '../../components/container/container';
import { Button, H2, Loader, Pagination, Search } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { debounce, requestServer } from '../../utils';
import { ProjectCard } from './components';
import { PAGINATION_LIMIT } from '../../constants/pagination-limit';
import { logout } from '../../actions';
import { useDispatch } from 'react-redux';

const ProjectsContainer = ({ className }) => {
	const [projects, setProjects] = useState([]);
	const [shouldUpdateProjects, setShouldUpdateProjects] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(2);
	const [isSorting, setIsSorting] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		requestServer(
			`/projects?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&sort=${isSorting}`,
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

	if (isLoading) {
		return <Loader />;
	}

	return (
		<main className={className}>
			<H2>Проекты</H2>
			<Container>
				<div className="projects-container">
					<div className="projects-header">
						<Button
							maxwidth="215px"
							height="45px"
							fontSize="16px"
							onClick={onSortClick}
						>
							{isSorting ? 'Отменить' : 'Сортировать по дедлайну'}
						</Button>
						<Search
							searchPhrase={searchPhrase}
							onSearchChange={onSearchChange}
						/>
						<Link to="/project" className="add-project-button">
							+ Создать проект
						</Link>
					</div>
					<div className="projects-list">
						{projects.length ? (
							projects.map(({ id, title, deadline }) => (
								<ProjectCard
									key={id}
									id={id}
									title={title}
									deadline={deadline}
									shouldUpdateProjects={shouldUpdateProjects}
									setShouldUpdateProjects={setShouldUpdateProjects}
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

export const Projects = styled(ProjectsContainer)`
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

	.add-project-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px;
		border: 2px solid #f3c584;
		background-color: transparent;
		color: #fff;
		padding: 0 10px;
		font-size: 16px;
		font-family: Verdana, sans-serif;
		border-radius: 4px;
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
