import styled from 'styled-components';

const ButtonContainer = ({ className, children, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	max-width: ${({ maxwidth }) => (maxwidth ? maxwidth : '250px')};
	width: ${({ width }) => (width ? width : '100%')};
	height: ${({ height }) => (height ? height : '50px')};
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	border-radius: 7px;
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '20px')};
	background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : '#f3c584')};
	color: ${({ color }) => (color ? color : '#000')};
	padding: ${({ padding }) => (padding ? padding : 'unset')};
	cursor: pointer;
	transition-duration: 0.2s;

	&:hover {
		box-shadow: 0 0 10px ${({ bgcolor }) => (bgcolor ? bgcolor : '#f3c584')};
	}
`;
