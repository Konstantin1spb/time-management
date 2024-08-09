import styled from 'styled-components';
import { Icon } from '../icon/icon';

const PaginationContainer = ({ className, page, setPage, lastPage }) => {
	return (
		<div className={className}>
			<button onClick={() => setPage(page - 1)} disabled={page === 1}>
				<Icon id="fa-chevron-left" color="#fff" size="20px" />
			</button>
			<div>{page}</div>
			<button
				onClick={() => setPage(page + 1)}
				disabled={page === lastPage || lastPage === 0}
			>
				<Icon id="fa-chevron-right" color="#fff" size="20px" />
			</button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	font-size: 20px;
	margin-top: 30px;

	button {
		border: none;
		background: transparent;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.5;
		cursor: default;
	}
`;
