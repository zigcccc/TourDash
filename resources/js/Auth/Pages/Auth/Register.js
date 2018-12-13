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
import { Columns, Column } from "bloomer";
import MainHeading from "../../../Shared/Components/Typography/MainHeading";
import Logo from "../../../Shared/Components/Logo";
import Snackbar from "../../../Shared/Components/Snackbar";
import AuthInputField from "../../Components/AuthInputField";
import MainCta from "../../../Shared/Components/MainCta";

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: { value: "", hasError: false },
			email: { value: "", hasError: false },
			password: { value: "", hasError: false },
			password_repeat: { value: "", hasError: false },
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
		let formData = {
			name: this.state.name.value,
			email: this.state.email.value,
			password: this.state.password.value,
			password_repeat: this.state.password_repeat.value
		};

		axios
			.post("/register", formData)
			.then(res => {
				window.location.href = res.data.path;
			})
			.catch(err => {
				if (err.response.data.error) {
					const errorElement = Object.keys(err.response.data.error)[0];
					this.setState({
						...this.state,
						[errorElement]: {
							...this.state[errorElement].value,
							hasError: true
						},
						error: err.response.data.error[errorElement][0],
						loading: false
					});
				}
			});
	}

	render() {
		return (
			<AuthContainer>
				<Snackbar
					isOpen={
						this.state.name.hasError ||
						this.state.email.hasError ||
						this.state.password.hasError ||
						this.state.password_repeat.hasError
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
						<Columns style={{ marginBottom: 0 }}>
							<Column>
								<AuthInputField
									isSmall
									hasError={this.state.name.hasError}
									placeholder="Full Name"
									handleChange={this.handleChange.bind(this, "name")}
									value={this.state.name.value}
									icon="user"
								/>
							</Column>
							<Column>
								<AuthInputField
									isSmall
									hasError={this.state.email.hasError}
									placeholder="E-mail"
									handleChange={this.handleChange.bind(this, "email")}
									value={this.state.email.value}
									icon="envelope"
								/>
							</Column>
						</Columns>
						<AuthInputField
							hasError={this.state.password.hasError}
							placeholder="Password"
							hiddenCharacters={true}
							handleChange={this.handleChange.bind(this, "password")}
							value={this.state.password.value}
							icon="unlock"
						/>
						<AuthInputField
							hasError={this.state.password_repeat.hasError}
							placeholder="Repeat Password"
							hiddenCharacters={true}
							handleChange={this.handleChange.bind(this, "password_repeat")}
							value={this.state.password_repeat.value}
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
