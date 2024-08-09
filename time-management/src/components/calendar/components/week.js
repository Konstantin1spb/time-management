import styled from 'styled-components';

const WeekContainer = ({ className, week, month, year, setSelectedDate }) => {
	const currentDate = new Date().getTime();

	const onDayClick = (day, month, year, target) => {
		const deadline = new Date(`${year} ${month + 1} ${day}`);
		setSelectedDate(deadline.toLocaleDateString('ru'));

		const daysBtnHTML = document.querySelectorAll('.day');
		daysBtnHTML.forEach((el) => el.classList.remove('active'));
		target.classList.add('active');
	};
	return (
		<div className={className}>
			{week.map((day, index) => {
				const date = new Date(`${year} ${month + 1} ${day}`);
				return (
					<button
						key={index}
						type="button"
						className="day"
						data-date={date.toLocaleDateString('ru')}
						disabled={date - currentDate <= 0 ? true : false}
						onClick={({ target }) => onDayClick(day, month, year, target)}
					>
						{day}
					</button>
				);
			})}
		</div>
	);
};

export const Week = styled(WeekContainer)`
	display: flex;

	&:first-child {
		justify-content: flex-end;
	}

	.day {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		color: #121212;
		font-size: inherit;
		font-family: inherit;
		cursor: pointer;
	}

	.day.active {
		color: #fff;
		background-color: #ff9500;
		border-radius: 10px;
	}

	.day:disabled {
		opacity: 0.4;
	}
`;
