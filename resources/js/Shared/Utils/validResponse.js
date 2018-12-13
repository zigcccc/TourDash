const validResponse = response =>
	response.status >= 200 && response.status < 300;

export default validResponse;
