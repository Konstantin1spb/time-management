import styled from 'styled-components';
import { forwardRef } from 'react';

const InputContainer = forwardRef(({ className, ...props }, ref) => {
	return <input className={className} {...props} ref={ref}></input>;
});

export const Input = styled(InputContainer)`
	max-width: ${({ maxwidth }) => maxwidth || '400px'};
	width: 100%;
	height: ${({ height }) => height || '35px'};
	border: none;
	border-radius: 7px;
	font-size: 16px;
	padding: 5px 13px;
	transition-duration: 0.2s;

	&:focus {
		outline: none;
		box-shadow: 0 0 10px white;
	}
`;
