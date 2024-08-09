import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalIsActive } from '../../selectors';
import { toggleModal } from '../../actions';

const OverlayContainer = ({ className }) => {
	const dispatch = useDispatch();
	const isModalActive = useSelector(selectModalIsActive);

	if (!isModalActive) {
		return null;
	}

	const onOverlayClick = () => {
		dispatch(toggleModal(false));
	};

	return <div className={className} onClick={onOverlayClick}></div>;
};

export const Overlay = styled(OverlayContainer)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: #000;
	opacity: 0.7;
	z-index: 4;
`;
