import styled from 'styled-components';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Button,
	Calendar,
	Container,
	FormError,
	Input,
	Loader,
	Modal,
} from '../../components';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout, toggleModal } from '../../actions';
import { requestServer } from '../../utils';
import { useNavigate } from 'react-router-dom';

const addProjectFormSchema = yup.object().shape({
	title: yup
		.string()
		.required('Заполните поле Название')
		.max(70, 'Слишком длинное название'),
	description: yup.string().max(1500, 'Слишком длинное описание'),
});

const MainContainer = ({ className }) => {
	const addProjectContainerRef = useRef(null);
	const [deadlineDate, setDeadlineDate] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			title: '',
			description: '',
		},
		resolver: yupResolver(addProjectFormSchema),
	});

	const titleError = errors?.title?.message;
	const descError = errors?.description?.message;

	const onAddProjectClick = () => {
		addProjectContainerRef.current.classList.add('active');
	};

	const onAddProjectSubmit = (data) => {
		setIsLoading(true);
		data.deadline = deadlineDate;
		requestServer('/projects', 'POST', data)
			.then((project) => {
				if (project.error) {
					console.log(project.error);
					setIsLoading(false);
					return;
				}
				setIsLoading(false);
				navigate('/projects');
			})
			.catch(() => {
				localStorage.removeItem('userData');
				dispatch(logout());
				navigate('/login');
			});
		reset();
	};

	const onDeadlineClick = () => {
		dispatch(toggleModal(true));
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<main className={className}>
			<Container>
				<div className="main-container">
					<div className="big-text">
						Создавай проекты и<br />
						управляй своим временем
					</div>
					<div className="add-project-container" ref={addProjectContainerRef}>
						<Button
							className="add-project-button"
							onClick={onAddProjectClick}
						>
							Начать
						</Button>
						<form
							className="add-project-form"
							onSubmit={handleSubmit(onAddProjectSubmit)}
						>
							<div className="add-project__input-container">
								<Input
									maxwidth="none"
									height="45px"
									{...register('title')}
									type="text"
									name="title"
									placeholder="Введите название проекта"
								/>
								<FormError margin="5px 0 0 10px">{titleError}</FormError>
							</div>
							<div className="add-project__input-container">
								<textarea
									{...register('description')}
									type="text"
									name="description"
									placeholder="Введите описание проекта"
								/>
								<FormError margin="5px 0 0 10px">{descError}</FormError>
							</div>
							<Modal>
								<Calendar setDeadlineDate={setDeadlineDate} />
							</Modal>
							<div className="add-project-form__buttons">
								<Button type="button" onClick={onDeadlineClick}>
									Выставить дедлайн
								</Button>
								<Button type="submit">Создать проект</Button>
							</div>
							<div className="add-project-form__deadline">
								Дедлайн: {deadlineDate || 'Бессрочный'}
							</div>
						</form>
					</div>
				</div>
			</Container>
		</main>
	);
};

export const Main = styled(MainContainer)`
	.main-container {
		margin-top: 150px;
	}

	.big-text {
		font-size: 50px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 50px;
	}

	.add-project-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.add-project-container.active .add-project-form {
		right: 0;
	}

	.add-project-container.active .add-project-button {
		left: -100%;
	}

	.add-project-button {
		position: relative;
		left: 0;
		transition-duration: 0.2s;
	}

	.add-project-form {
		top: -50px;
		min-width: 530px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		position: relative;
		right: -100%;
		transition-duration: 0.2s;
	}

	.add-project__input-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.add-project__input-container input {
		box-sizing: border-box;
	}

	textarea {
		width: 100%;
		height: 150px;
		resize: none;
		border: none;
		border-radius: 7px;
		font-size: 16px;
		padding: 10px 13px;
		transition-duration: 0.2s;
		font-family: Arial, sans-serif;
		box-sizing: border-box;
	}

	textarea:focus {
		outline: none;
		box-shadow: 0 0 10px white;
	}

	.add-project-form__buttons {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	.add-project-form__deadline {
		margin-top: 5px;
	}
`;
