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
import { validResponse } from "../../../Shared/Utils";

class PasswordReset extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: { value: "", hasError: false },
			password: { value: "", hasError: false },
			password_confirmation: { value: "", hasError: false },
			error: "",
			success: "",
			loading: false
		};
	}

	handleChange(field, e) {
		if (this.state.error.length > 0) {
			this.setState({
				...this.state,
				error: ""
			});
		}
		this.setState({
			[field]: { hasError: false, value: e.target.value }
		});
	}

	async handleSubmit() {
		const { token } = this.props.match.params;
		this.setState({ loading: true });
		let formData = {
			email: this.state.email.value,
			password: this.state.password.value,
			password_confirmation: this.state.password_confirmation.value,
			token: token
		};
		try {
			const response = await axios.post("/password/reset", formData);
			if (validResponse(response)) {
				this.setState({
					...this.state,
					success: response.data.success
				});
				setTimeout(() => {
					window.location.href = response.data.path;
				}, 500);
			} else {
				console.log("Error: ", response);
			}
		} catch (err) {
			if (err.response.data) {
				if (err.response.data.errors) {
					const firstErrorKey = Object.keys(err.response.data.errors)[0];
					this.setState({
						...this.state,
						[firstErrorKey]: {
							...this.state[firstErrorKey],
							hasError: true
						},
						error: err.response.data.errors[firstErrorKey][0],
						loading: false
					});
				} else if (err.response.data.error) {
					this.setState({
						error: err.response.data.error,
						loading: false
					});
				}
			} else {
				console.log(err);
				this.setState({
					error: "Nekaj se je zalomilo...",
					loading: false
				});
			}
		}
	}

	render() {
		return (
			<AuthContainer>
				<Snackbar
					isOpen={
						this.state.email.hasError ||
						this.state.password.hasError ||
						this.state.password_confirmation.hasError ||
						this.state.error.length > 0
					}
					purpose="error"
					position="bottom"
					message={this.state.error}
				/>
				<Snackbar
					isOpen={this.state.success.length > 0}
					purpose="success"
					position="bottom"
					message={this.state.success}
				/>
				<AuthNavbar>
					<Logo.Primary width={210} height={authNavbarHeight} />
					<a href="/">
						back to tourdash.app
						<FontAwesomeIcon icon="chevron-right" />
					</a>
				</AuthNavbar>
				<AuthFormContainer>
					<MainHeading>Reset Password</MainHeading>
					<AuthForm>
						<AuthInputField
							hasError={this.state.email.hasError}
							placeholder="Email"
							handleChange={this.handleChange.bind(this, "email")}
							value={this.state.email.value}
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
							hasError={this.state.password_confirmation.hasError}
							placeholder="Confirm Password"
							hiddenCharacters={true}
							handleChange={this.handleChange.bind(
								this,
								"password_confirmation"
							)}
							value={this.state.password_confirmation.value}
							icon="redo-alt"
						/>
						<MainCta
							isLoading={this.state.loading}
							handleClick={this.handleSubmit.bind(this)}
							text="save"
						/>
					</AuthForm>
				</AuthFormContainer>
			</AuthContainer>
		);
	}
}

export default PasswordReset;
