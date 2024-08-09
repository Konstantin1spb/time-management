import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, FormError, H2, Input, InputContainer, Loader } from '../../components';
import { requestServer } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../actions';
import { useState } from 'react';
import { useRedirectIfUserLogged } from '../../hooks';

const authFormSchema = yup.object().shape({
	login: yup.string().required('Заполните поле Логин'),
	password: yup.string().required('Введите пароль'),
});

const AuthorizationContainer = ({ className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useRedirectIfUserLogged(setIsLoading);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const loginError = errors?.login?.message;
	const passwordError = errors?.password?.message;

	const onSubmit = ({ login, password }) => {
		requestServer('/login', 'POST', { login, password }).then((user) => {
			if (user.error === '401') {
				setError('login', {
					type: 'custom',
					message: 'Пользователь с таким именем не найден',
				});
				return;
			}
			if (user.error === '402') {
				setError('password', { type: 'custom', message: 'Неверный пароль' });
				return;
			}
			dispatch(setUserData(user.data));
			localStorage.setItem('userData', JSON.stringify(user.data));
			reset();
			navigate('/');
		});
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputContainer>
					<Input
						{...register('login')}
						type="text"
						name="login"
						placeholder="Логин"
					/>
					<FormError margin="5px 0 0 10px">{loginError}</FormError>
				</InputContainer>
				<InputContainer>
					<Input
						{...register('password')}
						type="password"
						name="password"
						placeholder="Пароль"
					/>
					<FormError margin="5px 0 0 10px">{passwordError}</FormError>
				</InputContainer>
				<Button type="submit">Войти</Button>
				<Link to="/register" className="not-registered">
					Зарегистрироваться
				</Link>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 430px;
		margin: 0 auto;
	}

	.not-registered {
		margin-top: 20px;
		font-size: 16px;
		text-decoration: underline;
	}
`;
