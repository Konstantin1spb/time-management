import styled from 'styled-components';

const IconContainer = ({ className, id, ...props }) => {
	return <i className={`${className} fa ${id}`} {...props} aria-hidden="true"></i>;
};

export const Icon = styled(IconContainer)`
	font-size: ${({ size }) => size};
	color: ${({ color }) => color};
	cursor: ${({ cursor }) => cursor};
`;
