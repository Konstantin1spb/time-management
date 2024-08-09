import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { requestServer } from '../../../utils';
import Chart from 'chart.js/auto';
import { logout } from '../../../actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChartsContainer = ({ className, shouldUpdateProjects }) => {
	const [doneProjectsQuantity, setDoneProjectsQuantity] = useState(null);
	const [projectsQuantity, setProjectsQuantity] = useState(null);
	const [expiredProjectsQuantity, setExpiredProjectsQuantity] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		requestServer('/analytics')
			.then((projects) => {
				if (projects.error) {
					console.log(projects.error);
				}
				setDoneProjectsQuantity(projects.doneProjectsQuantity);

				let projectsCounter = 0;
				let expiredProjectsCounter = 0;

				projects.inProgressProjects.forEach(({ deadline }) => {
					if (deadline) {
						const currentDate = new Date();
						const deadlineDate = new Date(
							deadline.split('.').reverse().join(' '),
						);

						if (deadlineDate <= currentDate) {
							expiredProjectsCounter++;
						} else {
							projectsCounter++;
						}
					} else {
						projectsCounter++;
					}
				});

				setProjectsQuantity(projectsCounter);
				setExpiredProjectsQuantity(expiredProjectsCounter);
			})
			.catch(() => {
				localStorage.removeItem('userData');
				dispatch(logout());
				navigate('/login');
			});
	}, [shouldUpdateProjects, dispatch, navigate]);

	useEffect(() => {
		const ctx1 = document.getElementById('projects-bar-chart');
		const ctx2 = document.getElementById('projects-doughnut-chart');

		const projectsBarCharts = new Chart(ctx1, {
			type: 'bar',
			data: {
				labels: ['В работе', 'Завершенные', 'Просроченные'],
				datasets: [
					{
						label: 'Количество проектов',
						data: [
							projectsQuantity,
							doneProjectsQuantity,
							expiredProjectsQuantity,
						],
						borderWidth: 0,
						backgroundColor: ['#f3c584', '#008d00', '#fd1919'],
					},
				],
			},
			options: {
				plugins: {
					legend: {
						display: false,
					},
				},
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});

		const projectsDoughnutCharts = new Chart(ctx2, {
			type: 'doughnut',
			data: {
				labels: ['В работе', 'Завершенные', 'Просроченные'],
				datasets: [
					{
						label: 'Количество проектов',
						data: [
							projectsQuantity,
							doneProjectsQuantity,
							expiredProjectsQuantity,
						],
						borderWidth: 0,
						backgroundColor: ['#f3c584', '#008d00', '#fd1919'],
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							display: false,
						},
					},
				},
			},
		});

		return () => {
			projectsBarCharts.destroy();
			projectsDoughnutCharts.destroy();
		};
	}, [projectsQuantity, doneProjectsQuantity, expiredProjectsQuantity]);

	return (
		<div className={className}>
			<div className="projects-bar-chart">
				<canvas id="projects-bar-chart"></canvas>
			</div>
			<div className="projects-doughnut-chart">
				<canvas id="projects-doughnut-chart"></canvas>
			</div>
		</div>
	);
};

export const Charts = styled(ChartsContainer)`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 50px 0;

	.projects-bar-chart {
		width: 500px;
		height: 250px;
	}
`;
