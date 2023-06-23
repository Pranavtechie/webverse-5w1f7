const API_URL = "http://localhost:8000/api/v1";

export function setAuthToken(token) {
	window.localStorage.setItem("authToken", token);
}

export function getAuthToken() {
	const token = window.localStorage.getItem("authToken");

	return token;
}
export { API_URL };
