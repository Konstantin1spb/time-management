import styled from 'styled-components';

const InputContainerContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const InputContainer = styled(InputContainerContainer)`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 30px;
`;
