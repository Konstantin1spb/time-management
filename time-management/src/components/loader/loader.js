import styled from 'styled-components';

const LoaderContainer = ({ className }) => {
	return <div className={className}></div>;
};

export const Loader = styled(LoaderContainer)`
	width: 48px;
	height: 48px;
	border: 5px solid #f3c584;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
	position: absolute;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
