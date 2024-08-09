export const requestServer = (url, method = 'GET', data) => {
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
};
