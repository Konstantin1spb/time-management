import styled from 'styled-components';
import { useState } from 'react';
import { Month } from './components';
import { Icon } from '../icon/icon';
import { toggleModal } from '../../actions';
import { useDispatch } from 'react-redux';

const CalendarContainer = ({ className, setDeadlineDate }) => {
	const [date, setDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const dispatch = useDispatch();

	const nextMonth = () => {
		const newDate = new Date(date);
		newDate.setMonth(date.getMonth() + 1);
		setDate(newDate);
		const daysBtnHTML = document.querySelectorAll('.day');
		daysBtnHTML.forEach((el) => el.classList.remove('active'));
	};

	const prevMonth = () => {
		const newDate = new Date(date);
		newDate.setMonth(date.getMonth() - 1);
		setDate(newDate);
		const daysBtnHTML = document.querySelectorAll('.day');
		daysBtnHTML.forEach((el) => el.classList.remove('active'));
	};

	let sanitizedDate = date.toLocaleString('default', {
		year: 'numeric',
		month: 'long',
	});

	sanitizedDate = sanitizedDate[0].toUpperCase() + sanitizedDate.substring(1);

	const onDeadlineCancelClick = () => {
		setDeadlineDate(null);
		dispatch(toggleModal(false));
	};

	const onDeadlineConfirmClick = () => {
		setDeadlineDate(selectedDate);
		dispatch(toggleModal(false));
	};
	return (
		<div className={className}>
			<div className="calendar-header">
				<Icon id="fa-chevron-left" cursor="pointer" onClick={prevMonth} />
				<div>{sanitizedDate}</div>
				<Icon id="fa-chevron-right" cursor="pointer" onClick={nextMonth} />
			</div>
			<Month
				year={date.getFullYear()}
				month={date.getMonth()}
				setSelectedDate={setSelectedDate}
			/>
			<div className="calendar-controls">
				{selectedDate && (
					<div
						className="calendar-control__button deadline-confirm"
						onClick={onDeadlineConfirmClick}
					>
						{selectedDate}
					</div>
				)}
				<div
					className="calendar-control__button deadline-cancel"
					onClick={onDeadlineCancelClick}
				>
					Бессрочно
				</div>
			</div>
		</div>
	);
};

export const Calendar = styled(CalendarContainer)`
	display: flex;
	flex-direction: column;
	text-align: center;
	height: 315px;
	background-color: #f3c584;
	padding: 20px;
	border-radius: 10px;
	color: #121212;

	.calendar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20px;
		font-weight: bold;
		padding: 0 10px;
		margin-bottom: 10px;
	}

	.calendar-controls {
		display: flex;
		height: 100%;
		gap: 20px;
		justify-content: center;
		align-items: flex-end;
		color: #fff;
	}

	.calendar-control__button {
		padding: 6px 13px;
		border-radius: 5px;
		cursor: pointer;
	}

	.deadline-confirm {
		background-color: #008d00;
	}

	.deadline-cancel {
		background-color: #fd1919;
	}
`;
