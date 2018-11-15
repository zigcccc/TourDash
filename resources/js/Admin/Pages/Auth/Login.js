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
import MainHeading from "../../Components/Typography/MainHeading";
import Logo from "../../Components/Logo";
import Snackbar from "../../Components/Snackbar";
import AuthInputField from "../../Components/AuthInputField";
import MainCta from "../../Components/MainCta";

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
		if (this.state.username.value.length < 4) {
			let usernameValue = this.state.username.value;
			this.setState({
				error: "Please enter correct username...",
				username: { value: usernameValue, hasError: true },
				loading: false
			});
			return;
		}
		if (this.state.username.value !== "zkrasovec@gmail.com") {
			let usernameValue = this.state.username.value;
			this.setState({
				error: `User ${usernameValue} doesn't exist, try registering instead...`,
				username: { value: usernameValue, hasError: true },
				loading: false
			});
			return;
		}
		if (this.state.password.value !== "pass123") {
			let passwordValue = this.state.password.value;
			this.setState({
				error: "The password is not correct...",
				password: {
					value: passwordValue,
					hasError: true
				},
				loading: false
			});
			return;
		}
		// Auth ok, log user in...
		setTimeout(() => {
			localStorage.setItem("td_token", true);
			window.location.reload();
		}, 500);
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
