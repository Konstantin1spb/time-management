import styled from 'styled-components';

const ContainerContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const Container = styled(ContainerContainer)`
	width: 90%;
	margin: 0 auto;
`;
