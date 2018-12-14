import React, { Component } from "react";
import {
	AuthContainer,
	AuthForm,
	AuthFormContainer,
	AuthNavbar,
	authNavbarHeight
} from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainHeading from "../../../Shared/Components/Typography/MainHeading";
import Logo from "../../../Shared/Components/Logo";
import Snackbar from "../../../Shared/Components/Snackbar";
import AuthInputField from "../../Components/AuthInputField";
import MainCta from "../../../Shared/Components/MainCta";
import { validateEmail } from "../../../Shared/Utils";

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: { value: "", hasError: false },
			error: "",
			success: "",
			loading: false
		};
	}

	handleChange(field, e) {
		this.setState({
			...this.state,
			[field]: { hasError: false, value: e.target.value }
		});
	}

	async handleSubmit() {
		if (!validateEmail(this.state.email.value)) {
			this.setState({
				...this.state,
				error: "Vnesite veljaven e-poštni naslov.",
				email: {
					...this.state.email,
					hasError: true
				}
			});
			return;
		}
		this.setState({ ...this.state, loading: true });
		let formData = {
			email: this.state.email.value,
			_token: document.querySelector('meta[name="csrf-token"').content
		};
		try {
			const response = await axios.post("/password/email", formData);
			if (response.status >= 200 && response.status < 300) {
				this.setState({
					...this.state,
					loading: false,
					success: response.data.success
				});
			} else {
				console.log(response);
			}
		} catch (e) {
			console.log(e);
			this.setState({
				...this.state,
				loading: false,
				error: e.response ? e.response.data.error : "Something went wrong...",
				email: {
					...this.state.email,
					hasError: true
				}
			});
		}
	}

	render() {
		return (
			<AuthContainer>
				<Snackbar
					isOpen={this.state.email.hasError && this.state.error.length > 0}
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
					<MainHeading>Forgot Password</MainHeading>
					<AuthForm>
						<AuthInputField
							hasError={this.state.email.hasError}
							placeholder="Email"
							handleChange={this.handleChange.bind(this, "email")}
							value={this.state.email.value}
							icon="envelope"
						/>
						<MainCta
							isLoading={this.state.loading}
							handleClick={this.handleSubmit.bind(this)}
							text="Reset"
						/>
					</AuthForm>
				</AuthFormContainer>
			</AuthContainer>
		);
	}
}

export default ForgotPassword;
