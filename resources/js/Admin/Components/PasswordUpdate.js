import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "./Card";
import AuthInputField from "../../Auth/Components/AuthInputField";
import MainCtaBase from "../../Shared/Components/MainCta";
import Snackbar from "../../Shared/Components/Snackbar";
import { validResponse } from "../../Shared/Utils";

class PasswordUpdate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password_old: "",
			password_new: "",
			password_new_confirmation: "",
			loading: false,
			error: false,
			errorMessage: "",
			success: false,
			successMessage: ""
		};
		this.updatePassword = this.updatePassword.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.clearErrors = this.clearErrors.bind(this);
		this.clearSuccess = this.clearSuccess.bind(this);
	}

	clearErrors() {
		this.setState({ error: false });
	}

	clearSuccess() {
		this.setState({ success: false });
		this.props.closeModal();
	}

	async updatePassword() {
		const {
			password_old,
			password_new,
			password_new_confirmation
		} = this.state;
		this.setState({ ...this.state, loading: true });
		if (password_new !== password_new_confirmation) {
			this.setState({
				...this.state,
				loading: false,
				error: true,
				errorMessage: "Vnešeni gesli se ne ujemata."
			});
			return;
		}
		const formData = {
			password_old: password_old,
			password_new: password_new,
			password_new_confirmation: password_new_confirmation
		};
		try {
			const response = await axios.put(
				"/api/auth-user/update-password",
				formData,
				{
					headers: {
						_token: document.querySelector('meta[name="csrf-token"]').content,
						"X-XSRF-TOKEN": window.xsrf_token,
						Authorization: `Bearer ${window.access_token}`
					}
				}
			);
			if (validResponse(response)) {
				console.log(response);
				this.setState(
					{
						...this.state,
						loading: false,
						success: true,
						successMessage: response.data.success
					},
					() => {
						setTimeout(() => {
							this.setState({
								success: false,
								password_old: "",
								password_new: "",
								password_new_confirmation: ""
							});
							this.props.closeModal();
						}, 1500);
					}
				);
			} else {
				console.log("Error: ", response);
			}
		} catch (err) {
			if (err.response) {
				if (err.response.data.errors) {
					const firstErrorKey = Object.keys(err.response.data.errors)[0];
					this.setState({
						...this.state,
						error: true,
						errorMessage: err.response.data.errors[firstErrorKey][0],
						loading: false
					});
				} else if (err.response.data.error) {
					this.setState({
						error: true,
						errorMessage: err.response.data.error,
						loading: false
					});
				}
			} else {
				console.log(err);
				this.setState({
					error: true,
					errorMessage: "Nekaj se je zalomilo...",
					loading: false
				});
			}
		}
	}

	handleInput(e) {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value
		});
	}

	render() {
		const {
			password_old,
			password_new,
			password_new_confirmation,
			loading,
			error,
			errorMessage,
			success,
			successMessage
		} = this.state;
		return (
			<Card title="Spremeni geslo">
				<Snackbar
					purpose="error"
					message={errorMessage}
					isOpen={error}
					dissmissAction={this.clearErrors}
				/>
				<Snackbar
					purpose="success"
					message={successMessage}
					isOpen={success}
					dissmissAction={this.clearSuccess}
				/>
				<FormContainer>
					<AuthInputField
						hiddenCharacters={true}
						value={password_old}
						handleChange={this.handleInput}
						placeholder="Staro geslo"
						name="password_old"
						icon="lock-open"
						isSmall
						hasSmallFont
					/>
					<AuthInputField
						hiddenCharacters={true}
						value={password_new}
						handleChange={this.handleInput}
						placeholder="Novo geslo"
						name="password_new"
						icon="unlock"
						isSmall
						hasSmallFont
					/>
					<AuthInputField
						hiddenCharacters={true}
						value={password_new_confirmation}
						handleChange={this.handleInput}
						placeholder="Ponovite novo geslo"
						name="password_new_confirmation"
						icon="redo-alt"
						isSmall
						hasSmallFont
					/>
					<MainCta
						isLoading={loading}
						text="shrani novo geslo"
						handleClick={this.updatePassword}
						fontSize={14}
					/>
				</FormContainer>
			</Card>
		);
	}
}

PasswordUpdate.propTypes = {
	user: PropTypes.object,
	closeModal: PropTypes.func
};

const FormContainer = styled.div`
	padding: 10px 20px 0;
`;

const MainCta = styled(MainCtaBase)`
	margin: 15px auto 0;
`;

export default PasswordUpdate;
