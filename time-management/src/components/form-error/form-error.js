import styled from 'styled-components';

const FormErrorContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const FormError = styled(FormErrorContainer)`
	width: 100%;
	font-size: 15px;
	color: #ff3d3d;
	margin: ${({ margin }) => margin || '0'};
`;
