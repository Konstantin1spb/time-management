import styled from 'styled-components';
import { Input } from '..';

const SearchContainer = ({ className, searchPhrase, onSearchChange }) => {
	return (
		<Input
			className={className}
			value={searchPhrase}
			placeholder="Найти проект"
			onChange={onSearchChange}
		/>
	);
};

export const Search = styled(SearchContainer)`
	width: 200px;
`;
