import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Container } from '../container/container';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState();
	const [temperature, setTemperature] = useState();
	const [weather, setWeather] = useState();
	const [loadWeatherSuccess, setLoadWeatherSuccess] = useState(false);
	const currentDate = new Date().toLocaleDateString();

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Saint Petersburg&units=metric&lang=ru&appid=49e34f799e505e340434885a4ebb7b70',
		)
			.then((loadedData) => loadedData.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
				setLoadWeatherSuccess(true);
			})
			.catch((e) => {
				console.error(e);
				setLoadWeatherSuccess(false);
			});
	}, []);

	return (
		<footer className={className}>
			<Container>
				<div className="footer-container">
					<div>{currentDate}</div>
					<div>Time Management App</div>
					{loadWeatherSuccess && (
						<div>
							{city}
							<br />
							{temperature} градусов, {weather}
						</div>
					)}
				</div>
			</Container>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	background-color: #121212;
	margin-top: 50px;

	.footer-container {
		height: 90px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
