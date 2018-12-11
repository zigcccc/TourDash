import React, { Component } from "react";
import {
	AuthContainer,
	AuthForm,
	AuthFormContainer,
	AuthNavbar,
	AuthHelperLinks,
	AuthLink,
	authNavbarHeight
} from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainHeading from "../../../Shared/Components/Typography/MainHeading";
import Logo from "../../../Shared/Components/Logo";
import Snackbar from "../../../Shared/Components/Snackbar";
import AuthInputField from "../../Components/AuthInputField";
import MainCta from "../../../Shared/Components/MainCta";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: { value: "", hasError: false },
			password: { value: "", hasError: false },
			error: "",
			loading: false
		};
	}

	handleChange(field, e) {
		this.setState({
			[field]: { hasError: false, value: e.target.value }
		});
	}

	handleSubmit() {
		this.setState({ loading: true });
		axios
			.post("/api/login", {
				email: this.state.username.value,
				password: this.state.password.value
			})
			.then(data => {
				localStorage.setItem("td_token", data.data.success.token);
				window.location.href = "/admin";
			})
			.catch(err => {
				if (err.response.data.error === "Vnesli ste napačno geslo.") {
					this.setState({
						error: err.response.data.error,
						password: { value: this.state.password.value, hasError: true },
						loading: false
					});
				} else if (err.response.data.error === "Vnesli ste napačno geslo.") {
					this.setState({
						error: err.response.data.error,
						username: { value: this.state.username.value, hasError: true },
						loading: false
					});
				} else {
					this.setState({
						loading: false,
						error: err.response.data.error
					});
				}
			});
	}

	render() {
		return (
			<AuthContainer>
				<Snackbar
					isOpen={this.state.username.hasError || this.state.password.hasError}
					purpose="error"
					position="bottom"
					message={this.state.error}
				/>
				<AuthNavbar>
					<Logo.Primary width={210} height={authNavbarHeight} />
					<a href="/">
						back to tourdash.app
						<FontAwesomeIcon icon="chevron-right" />
					</a>
				</AuthNavbar>
				<AuthFormContainer>
					<MainHeading>Login</MainHeading>
					<AuthForm>
						<AuthInputField
							hasError={this.state.username.hasError}
							placeholder="Username"
							handleChange={this.handleChange.bind(this, "username")}
							value={this.state.username.value}
							icon="user"
						/>
						<AuthInputField
							hasError={this.state.password.hasError}
							placeholder="Password"
							hiddenCharacters={true}
							handleChange={this.handleChange.bind(this, "password")}
							value={this.state.password.value}
							icon="unlock"
						/>
						<MainCta
							isLoading={this.state.loading}
							handleClick={this.handleSubmit.bind(this)}
							text="Login"
						/>
					</AuthForm>
					<AuthHelperLinks maxWidth="50">
						<AuthLink to="/reset-password/">Forgot password?</AuthLink>
						<AuthLink isbold="true" hasicon="right" to="/register/">
							Create account <FontAwesomeIcon icon="long-arrow-alt-right" />
						</AuthLink>
					</AuthHelperLinks>
				</AuthFormContainer>
			</AuthContainer>
		);
	}
}

export default Login;
