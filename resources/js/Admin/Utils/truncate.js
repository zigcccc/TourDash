const truncate = (str, lng) =>
	str.length > lng ? str.substr(0, lng + 3) + "..." : str;
export default truncate;
