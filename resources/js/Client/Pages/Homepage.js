import React, { Component } from "react";
import { Section } from "../Elements";
import { Box } from "bloomer";

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
		};
		this.getUser = this.getUser.bind(this);
	}
	async getUser() {
		try {
			const user = await axios.get("/api/auth-user", {
				headers: {
					Authorization: `Bearer ${window.access_token}`
				}
			});
			if (user.status === 200) {
				this.setState({
					user: user.data.user
				});
			}
		} catch (e) {
			console.log(e);
		}
	}
	logout() {
		axios
			.post("/logout")
			.then(res => (window.location.href = "/login"))
			.catch(err => console.log(err.response));
	}
	componentDidMount() {
		this.getUser();
	}
	render() {
		return (
			<Section maxWidth={960}>
				<Box>Homepage</Box>
				{this.state.user && <h1>Hi, {this.state.user.name}</h1>}
				<button onClick={this.getUser}>get user info</button>
				<button onClick={this.logout}>logout</button>
			</Section>
		);
	}
}

export default Homepage;
