import styled from 'styled-components';
import { Container, H2 } from '../../components';

const ErrorNotFoundContainer = ({ className, children }) => {
	return (
		<div className={className}>
			<Container>
				<H2>Ошибка</H2>
				<div className="error-text">{children}</div>
			</Container>
		</div>
	);
};

export const ErrorNotFound = styled(ErrorNotFoundContainer)`
	margin-top: 25vh;

	.error-text {
		display: flex;
		justify-content: center;
		font-size: 24px;
	}
`;
