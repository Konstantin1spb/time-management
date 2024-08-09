import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, MiniLoader } from '../../../components';
import { calculateRemainingTime, requestServer } from '../../../utils';
import { useLayoutEffect, useState } from 'react';
import { logout } from '../../../actions';
import { useDispatch } from 'react-redux';

const ProjectCardContainer = ({
	className,
	id,
	title,
	deadline,
	shouldUpdateProjects,
	setShouldUpdateProjects,
	isDone,
}) => {
	const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(deadline));
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onDoneButtonClick = () => {
		setIsLoading(true);
		requestServer(`/projects/${id}`, 'PATCH', { done: true })
			.then(() => {
				setShouldUpdateProjects(!shouldUpdateProjects);
				setIsLoading(false);
			})
			.catch(() => {
				localStorage.removeItem('userData');
				dispatch(logout());
				navigate('/login');
			});
	};

	useLayoutEffect(() => {
		const interval = setInterval(
			() => calculateRemainingTime(deadline, setRemainingTime),
			60000,
		);

		return () => clearInterval(interval);
	}, [deadline]);

	let projectCardDeadlineText;

	if (deadline) {
		projectCardDeadlineText =
			(remainingTime && `Осталось: ${remainingTime}`) || 'Время вышло';
	} else {
		projectCardDeadlineText = 'Бессрочный';
	}

	if (isDone) {
		projectCardDeadlineText = 'Проект завершен';
	}

	return (
		<div className={className}>
			<Link to={`/project/${id}`} className="project-card__container">
				<div className="project-card__title">{title}</div>
				<div
					className={`project-card__deadline ${isDone ? 'done' : remainingTime || !deadline ? '' : 'expired'}`}
				>
					{projectCardDeadlineText}
				</div>
			</Link>
			{isLoading ? (
				<div className="project-card__done-loader">
					<MiniLoader />
				</div>
			) : (
				<button
					className="project-card__done-button"
					onClick={onDoneButtonClick}
					disabled={isDone}
				>
					<Icon id="fa-check" size="22px" color="#f3c584" />
				</button>
			)}
		</div>
	);
};

export const ProjectCard = styled(ProjectCardContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;

	.project-card__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 2px solid #f3c584;
		border-radius: 4px;
		padding: 15px;
		width: 100%;
		max-height: 200px;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;
	}

	.project-card__title {
		width: 75%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.done {
		color: #008d00;
	}

	.expired {
		color: #fd1919;
	}

	.project-card__done-button {
		border: none;
		background-color: transparent;
		cursor: pointer;
	}

	.project-card__done-button:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.project-card__done-loader {
		min-width: 34px;
	}
`;
