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

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: { value: "", hasError: false },
			password: { value: "", hasError: false },
			repeatPassword: { value: "", hasError: false },
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
		if (
			this.state.username.value.length < 12 ||
			this.state.username.value.indexOf("@") < 0
		) {
			let usernameValue = this.state.username.value;
			this.setState({
				error: "Please enter correct email...",
				username: { value: usernameValue, hasError: true },
				loading: false
			});
			return;
		}
		if (this.state.password.value.length < 6) {
			let passwordValue = this.state.password.value;
			this.setState({
				error: "Password has to be at least 6 characters long...",
				password: {
					value: passwordValue,
					hasError: true
				},
				loading: false
			});
			return;
		}
		if (this.state.password.value !== this.state.repeatPassword.value) {
			let repeatPasswordValue = this.state.repeatPassword.value;
			this.setState({
				error: "Passwords do not match...",
				repeatPassword: {
					hasError: true,
					value: repeatPasswordValue
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
					isOpen={
						this.state.username.hasError ||
						this.state.password.hasError ||
						this.state.repeatPassword.hasError
					}
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
					<MainHeading>Register</MainHeading>
					<AuthForm>
						<AuthInputField
							hasError={this.state.username.hasError}
							placeholder="E-mail"
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
						<AuthInputField
							hasError={this.state.repeatPassword.hasError}
							placeholder="Repeat Password"
							hiddenCharacters={true}
							handleChange={this.handleChange.bind(this, "repeatPassword")}
							value={this.state.repeatPassword.value}
							icon="redo-alt"
						/>
						<MainCta
							isLoading={this.state.loading}
							handleClick={this.handleSubmit.bind(this)}
							text="Register"
						/>
					</AuthForm>
					<AuthHelperLinks maxWidth="75">
						<AuthLink isbold="true" hasicon="left" to="/login/">
							<FontAwesomeIcon icon="long-arrow-alt-left" /> Allready have an
							account?
						</AuthLink>
						<AuthLink to="/terms-of-services/">
							Terms of services and legal info
						</AuthLink>
					</AuthHelperLinks>
				</AuthFormContainer>
			</AuthContainer>
		);
	}
}

export default Register;
