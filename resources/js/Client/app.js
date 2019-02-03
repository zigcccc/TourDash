import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import Router from "./router";
import axios from "axios";
import styled from "styled-components";

export const access_token = window.access_token;
export const csrf_token = document.querySelector('meta[name="csrf-token"]')
	.content;

const client = axios.create({
	baseURL:
		process.env.NODE_ENV === "development"
			? "http://localhost:8000/api"
			: "https://tourdash.app/api",
	responseType: "json",
	headers: {
		_token: csrf_token,
		"X-XSRF-TOKEN": window.xsrf_token,
		Authorization: `Bearer ${access_token}`,
		"X-Requested-With": "XMLHttpRequest"
	}
});

axios.defaults.headers.common["_token"] = csrf_token;
axios.defaults.headers.common["X-XSRF-TOKEN"] = window.xsrf_token;
axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			theme: {}
		};
	}

	componentDidMount() {
		axios
			.get("/api/settings/visual")
			.then(res => {
				const { data } = res.data;
				const settings = data.reduce((result, setting) => {
					let key = Object.keys(setting)[0];
					result[key] = setting[key].setting_value;
					return result;
				}, {});
				console.log(settings);
				this.setState({
					loading: false,
					theme: {
						mainColor: settings.primary_color || "#97695C",
						light: settings.light_color || "#FBFBFB",
						dark: settings.dark_color || "#7d7d7d"
					}
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		const { loading, theme } = this.state;
		return (
			<Fragment>
				{loading ? null : (
					<ThemeProvider theme={theme}>
						<Router />
					</ThemeProvider>
				)}
			</Fragment>
		);
	}
}

const LoadingContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default App;

if (document.getElementById("root")) {
	ReactDOM.render(<App />, document.getElementById("root"));
}
