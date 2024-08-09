import styled from 'styled-components';
import { Button, Calendar, Container, FormError, H2, Modal } from '../../../components';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { logout, toggleModal } from '../../../actions';
import { requestServer } from '../../../utils';
import { useMatch, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const projectFormSchema = yup.object().shape({
	title: yup
		.string()
		.required('Заполните поле Название')
		.max(70, 'Слишком длинное название'),
	description: yup.string().max(1500, 'Слишком длинное описание'),
});

const ProjectContentContainer = ({
	className,
	project: { id, title, description, deadline, done: isDone },
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isCreating = useMatch('/project');
	const [deadlineDate, setDeadlineDate] = useState(deadline);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			title,
			description,
		},
		resolver: yupResolver(projectFormSchema),
	});

	const titleError = errors?.title?.message;
	const descError = errors?.description?.message;

	const onDeadlineClick = () => {
		dispatch(toggleModal(true));
	};

	const onCreateSubmit = (data) => {
		data.deadline = deadlineDate;
		requestServer('/projects', 'POST', data)
			.then((project) => {
				if (project.error) {
					console.log(project.error);
					return;
				}
				navigate(-1);
			})
			.catch(() => {
				localStorage.removeItem('userData');
				dispatch(logout());
				navigate('/login');
			});
		reset();
	};

	const onUpdateSubmit = (data) => {
		data.deadline = deadlineDate;
		data.done = false;
		requestServer(`/projects/${id}`, 'PATCH', data)
			.then((project) => {
				if (project.error) {
					console.log(project.error);
					return;
				}
				navigate(-1);
			})
			.catch(() => {
				localStorage.removeItem('userData');
				dispatch(logout());
				navigate('/login');
			});
	};

	const onDeleteClick = () => {
		requestServer(`/projects/${id}`, 'DELETE')
			.then((project) => {
				if (project.error) {
					console.log(project.error);
					return;
				}
				navigate(-1);
			})
			.catch(() => {
				localStorage.removeItem('userData');
				dispatch(logout());
				navigate('/login');
			});
	};

	const onCancelClick = () => {
		navigate(-1);
	};

	return (
		<main className={className}>
			<H2>
				{isCreating ? 'Новый проект' : isDone ? 'Завершенный проект' : 'Проект'}
			</H2>
			<Container>
				<div className="project-container">
					<form>
						<div>
							<input
								{...register('title')}
								type="text"
								name="title"
								className="project-title"
								placeholder="Название"
							/>
							<FormError margin="5px 0 0 0">{titleError}</FormError>
						</div>
						<div>
							<textarea
								{...register('description')}
								type="text"
								name="description"
								className="project-desc"
								placeholder="Описание проекта..."
							/>
							<FormError margin="5px 0 0 0">{descError}</FormError>
						</div>
						<div className="project-controls">
							<div className="project-controls__column">
								{isCreating ? (
									<Button
										type="button"
										bgcolor="#fd1919"
										color="#fff"
										padding="5px 15px"
										onClick={onCancelClick}
									>
										Отмена
									</Button>
								) : (
									<Button
										type="button"
										bgcolor="#fd1919"
										color="#fff"
										padding="5px 15px"
										onClick={onDeleteClick}
									>
										Удалить проект
									</Button>
								)}
							</div>
							<div className="project-controls__column">
								<Modal>
									<Calendar setDeadlineDate={setDeadlineDate} />
								</Modal>
								<Button
									type="button"
									padding="5px 15px"
									onClick={onDeadlineClick}
								>
									Дедлайн
								</Button>
								{isCreating ? (
									<Button
										type="submit"
										bgcolor="#008d00"
										color="#fff"
										padding="5px 15px"
										onClick={handleSubmit(onCreateSubmit)}
									>
										Создать
									</Button>
								) : (
									<Button
										type="submit"
										bgcolor="#008d00"
										color="#fff"
										padding="5px 15px"
										onClick={handleSubmit(onUpdateSubmit)}
									>
										{isDone ? 'Возобновить' : 'Обновить'}
									</Button>
								)}
							</div>
						</div>
						<div className="deadline-date">
							Дедлайн: {deadlineDate || 'Бессрочный'}
						</div>
					</form>
				</div>
			</Container>
		</main>
	);
};

export const ProjectContent = styled(ProjectContentContainer)`
	.project-container form {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	.project-title {
		width: 100%;
		font-size: 22px;
		border: none;
		background-color: transparent;
		color: #fff;
	}

	.project-desc {
		width: 100%;
		height: 300px;
		font-size: 18px;
		background-color: transparent;
		border: none;
		color: #fff;
		resize: none;
	}

	.project-title:focus,
	.project-desc:focus {
		outline: none;
	}

	.project-controls {
		display: flex;
		justify-content: space-between;
	}

	.project-controls__column {
		display: flex;
		gap: 20px;
	}

	.deadline-date {
		display: flex;
		align-items: center;
	}
`;
