import styled from 'styled-components';

const MiniLoaderContainer = ({ className }) => {
	return <div className={className}></div>;
};

export const MiniLoader = styled(MiniLoaderContainer)`
	width: 25px;
	height: 25px;
	border: 3px solid #f3c584;
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
