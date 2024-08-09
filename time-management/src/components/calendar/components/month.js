import styled from 'styled-components';
import { Week } from './week';

const MonthContainer = ({ className, year, month, setSelectedDate }) => {
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDayOfMonth = new Date(year, month, 1).getDay();

	const monthDays = [...Array(daysInMonth).keys()];

	const weeks = [];
	let week = [];

	monthDays.forEach((day, index) => {
		const dayOfWeek = (firstDayOfMonth + index) % 7;
		week.push(day + 1);

		if (dayOfWeek === 0 || index === daysInMonth - 1) {
			weeks.push(week);
			week = [];
		}
	});

	return (
		<div className={className}>
			{weeks.map((week, index) => (
				<Week
					key={index}
					week={week}
					month={month}
					year={year}
					setSelectedDate={setSelectedDate}
				/>
			))}
		</div>
	);
};

export const Month = styled(MonthContainer)``;
