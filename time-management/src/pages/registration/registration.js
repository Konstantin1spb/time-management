import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, FormError, H2, Input, InputContainer, Loader } from '../../components';
import { requestServer } from '../../utils';
import { setUserData } from '../../actions';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRedirectIfUserLogged } from '../../hooks';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните поле Логин')
		.matches(/^[\wа-я]+$/i, 'Неверный логин, допускаются только буквы и цифры.')
		.min(3, 'Слишком короткий Логин')
		.max(16, 'Слишком длинный Логин'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются латинские буквы, цифры и знаки # %.',
		)
		.min(5, 'Слишком короткий пароль')
		.max(45, 'Слишком длинный пароль'),
	passwordCheck: yup
		.string()
		.required('Пароли должны совпадать')
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const RegistrationContainer = ({ className }) => {
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
			passwordCheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const loginError = errors?.login?.message;
	const passwordError = errors?.password?.message;
	const passwordCheckError = errors?.passwordCheck?.message;

	const onSubmit = ({ login, password }) => {
		requestServer('/register', 'POST', { login, password }).then((user) => {
			if (user.error) {
				setError('login', { type: 'custom', message: user.error });
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
			<H2>Регистрация</H2>
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
				<InputContainer>
					<Input
						{...register('passwordCheck')}
						type="password"
						name="passwordCheck"
						placeholder="Повторите пароль"
					/>
					<FormError margin="5px 0 0 10px">{passwordCheckError}</FormError>
				</InputContainer>
				<Button type="submit">Зарегистрироваться</Button>
				<Link to="/login" className="already-registered">
					Уже есть аккаунт?
				</Link>
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 430px;
		margin: 0 auto;
	}

	.already-registered {
		margin-top: 20px;
		font-size: 16px;
		text-decoration: underline;
	}
`;
