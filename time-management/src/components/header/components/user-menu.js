import styled from 'styled-components';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../icon/icon';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLogin } from '../../../selectors';
import { logout } from '../../../actions';

const UserMenuContainer = ({ className }) => {
	const userMenuRef = useRef(null);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch();

	const onUserMenuClick = () => {
		userMenuRef.current.classList.toggle('active');
	};

	const onLogout = () => {
		localStorage.removeItem('userData');
		dispatch(logout());
	};

	return (
		<div className={className} ref={userMenuRef}>
			<div className="user-menu__name" onClick={onUserMenuClick}>
				<span>{login}</span>
				<Icon id="fa-caret-down" />
			</div>
			<ul>
				<li>
					<Link to="/login" onClick={onLogout}>
						Выйти
					</Link>
				</li>
			</ul>
		</div>
	);
};

export const UserMenu = styled(UserMenuContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;

	&.active ul {
		height: auto;
		font-size: 18px;
		padding: 13px 23px;
	}

	&.active i {
		transform: rotate(180deg);
	}

	.user-menu__name {
		display: flex;
		gap: 10px;
		align-items: center;
		cursor: pointer;
	}

	i {
		transition-duration: 0.2s;
	}

	ul {
		height: 0;
		font-size: 0;
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: 7px;
		list-style: none;
		color: #000;
		background-color: #fff;
		top: 15px;
		border-radius: 10px;
		padding: 0;
		transition-duration: 0.2s;
	}
`;
