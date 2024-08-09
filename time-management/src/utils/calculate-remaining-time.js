export const calculateRemainingTime = (deadline, setRemainingTime) => {
	const deadlineDate = new Date(deadline.split('.').reverse().join(' '));
	const currentDate = new Date();

	if (deadlineDate > currentDate) {
		let timeLeftInMinutes = Math.floor((deadlineDate - currentDate) / (1000 * 60));
		let timeLeftInHours = Math.floor(timeLeftInMinutes / 60);
		let timeLeftInDays = Math.floor(timeLeftInHours / 24);

		timeLeftInHours = Math.floor(timeLeftInHours % 24);
		timeLeftInMinutes = Math.floor(timeLeftInMinutes % 60);

		timeLeftInDays = timeLeftInDays === 0 ? '' : timeLeftInDays + 'д.';
		timeLeftInHours = timeLeftInHours === 0 ? '' : timeLeftInHours + 'ч.';

		const result =
			timeLeftInDays === ''
				? `${timeLeftInHours} ${timeLeftInMinutes}м.`
				: `${timeLeftInDays}`;

		if (!setRemainingTime) {
			return result;
		}

		setRemainingTime(result);
	} else {
		if (!setRemainingTime) {
			return null;
		}

		setRemainingTime(null);
	}
};
