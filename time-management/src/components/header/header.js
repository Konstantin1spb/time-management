import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { UserMenu } from './components/user-menu';
import { Container } from '../container/container';

const HeaderContainer = ({ className }) => {
	const isCurrentPathLogin = useMatch('/login');
	const isCurrentPathRegister = useMatch('/register');
	if (isCurrentPathLogin || isCurrentPathRegister) {
		return;
	}
	return (
		<header className={className}>
			<Container>
				<div className="header-container">
					<nav>
						<Link to="/">Главная</Link>
						<Link to="/projects">Проекты</Link>
						<Link to="/analytics">Аналитика</Link>
					</nav>
					<UserMenu />
				</div>
			</Container>
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	background-color: #121212;
	position: fixed;
	width: 100%;
	z-index: 3;

	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90px;
	}

	nav {
		display: flex;
		gap: 100px;
	}
`;
