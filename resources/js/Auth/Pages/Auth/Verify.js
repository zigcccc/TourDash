import React, { Component } from "react";
import {
	AuthContainer,
	AuthForm,
	AuthFormContainer,
	AuthNavbar,
	AuthHelperLinks,
	AuthLink,
	authNavbarHeight,
	FormText
} from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainHeading from "../../../Shared/Components/Typography/MainHeading";
import Logo from "../../../Shared/Components/Logo";
import Snackbar from "../../../Shared/Components/Snackbar";

class Verify extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resendSuccess: false,
			resendError: false
		};
	}

	handleVerification(e) {
		e.preventDefault();
		const targetUrl = e.target.href;
		axios
			.get(targetUrl)
			.then(res =>
				res.status >= 200 && res.status < 300
					? this.setState({ resendSuccess: true })
					: this.setState({ resendError: true })
			)
			.catch(err => {
				this.setState({ resendError: true });
				console.log(err.response);
			});
	}

	render() {
		return (
			<AuthContainer>
				<Snackbar
					purpose="success"
					isOpen={this.state.resendSuccess}
					position="bottom"
					message="A fresh verification link has been sent to your email address."
				/>
				<Snackbar
					purpose="error"
					isOpen={this.state.resendError}
					position="bottom"
					message="Something went wrong, please contact our support team..."
				/>
				<AuthNavbar>
					<Logo.Primary width={210} height={authNavbarHeight} />
					<a href="/">
						back to tourdash.app
						<FontAwesomeIcon icon="chevron-right" />
					</a>
				</AuthNavbar>
				<AuthFormContainer>
					<MainHeading>Verify E-mail</MainHeading>
					<AuthForm>
						<FormText>
							Before proceeding, please check your email for a verification
							link. If you did not receive the email{" "}
							<a
								onClick={this.handleVerification.bind(this)}
								href="/email/resend"
							>
								click here to request another
							</a>
							.
						</FormText>
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

export default Verify;
