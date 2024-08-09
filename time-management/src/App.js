import styled from 'styled-components';
import { Header, Footer, Overlay, Loader } from './components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
	Authorization,
	Registration,
	Projects,
	Project,
	Analytics,
	Main,
	ErrorNotFound,
} from './pages';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from './actions';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100%;
`;

const Page = styled.div`
	padding-top: 90px;
`;

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const userDataJSON = localStorage.getItem('userData');

		if (!userDataJSON) {
			navigate('/login');
			setIsLoading(false);
			return;
		}

		const userData = JSON.parse(userDataJSON);

		dispatch(setUserData(userData));
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return <Loader />;
	}
	return (
		<>
			<AppColumn>
				<Header />
				<Page>
					<Routes>
						<Route path="/" element={<Main />}></Route>
						<Route path="/login" element={<Authorization />}></Route>
						<Route path="/register" element={<Registration />}></Route>
						<Route path="/projects" element={<Projects />}></Route>
						<Route path="/project" element={<Project />}></Route>
						<Route path="/project/:id" element={<Project />}></Route>
						<Route path="/analytics" element={<Analytics />}></Route>
						<Route
							path="*"
							element={
								<ErrorNotFound>
									Такой страницы не существует
								</ErrorNotFound>
							}
						></Route>
					</Routes>
				</Page>
				<Footer />
			</AppColumn>
			<Overlay />
		</>
	);
};

export default App;
