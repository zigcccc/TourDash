import React, { Component } from "react";
import styled from "styled-components";
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
import { Columns, Column as ColumnBase } from "bloomer";
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
					<Logo.Primary
						width={window.innerWidth > 768 ? 210 : 120}
						height={authNavbarHeight}
					/>
					<a href="/">
						nazaj na stran
						<FontAwesomeIcon icon="chevron-right" />
					</a>
				</AuthNavbar>
				<AuthFormContainer>
					<MainHeading>Registracija</MainHeading>
					<AuthForm>
						<Columns style={{ marginBottom: 0 }}>
							<Column>
								<AuthInputField
									isSmall
									hasError={this.state.name.hasError}
									placeholder="Ime in priimek"
									handleChange={this.handleChange.bind(this, "name")}
									value={this.state.name.value}
									icon="user"
								/>
							</Column>
							<Column>
								<AuthInputField
									isSmall
									hasError={this.state.email.hasError}
									placeholder="E-pošta"
									handleChange={this.handleChange.bind(this, "email")}
									value={this.state.email.value}
									icon="envelope"
								/>
							</Column>
						</Columns>
						<AuthInputField
							hasError={this.state.password.hasError}
							placeholder="Geslo"
							hiddenCharacters={true}
							handleChange={this.handleChange.bind(this, "password")}
							value={this.state.password.value}
							icon="unlock"
						/>
						<AuthInputField
							hasError={this.state.password_repeat.hasError}
							placeholder="Ponovi geslo"
							hiddenCharacters={true}
							handleChange={this.handleChange.bind(this, "password_repeat")}
							value={this.state.password_repeat.value}
							icon="redo-alt"
						/>
						<MainCta
							isLoading={this.state.loading}
							handleClick={this.handleSubmit.bind(this)}
							text="Registracija"
						/>
					</AuthForm>
					<AuthHelperLinks maxWidth="75">
						<AuthLink isbold="true" hasicon="left" to="/login/">
							<FontAwesomeIcon icon="long-arrow-alt-left" /> Že imate račun?
						</AuthLink>
						<AuthLink to="/terms-of-services/">Pogoji uporabe</AuthLink>
					</AuthHelperLinks>
				</AuthFormContainer>
			</AuthContainer>
		);
	}
}

const Column = styled(ColumnBase)`
	@media screen and (max-width: 1150px) {
		&:not(:last-of-type) {
			padding: 0 0.75rem;
		}
	}
`;

export default Register;
