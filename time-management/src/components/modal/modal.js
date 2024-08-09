import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectModalIsActive } from '../../selectors';

const ModalContainer = ({ className, children }) => {
	const isModalActive = useSelector(selectModalIsActive);

	if (!isModalActive) {
		return null;
	}

	return <div className={className}>{children}</div>;
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 5;
`;
