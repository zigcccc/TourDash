import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import Login from "./Login";
import Register from "./Register";
import Verify from "./Verify";
import { withRouter, Link } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

export const authNavbarHeight = 75;

export const AuthContainer = styled.div`
	background-color: ${props => props.theme.whiteShade2};
	height: 100vh;
	padding: 20px 25px;
	display: flex;
	flex-direction: column;
`;

export const AuthNavbar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	a {
		color: ${props => props.theme.darkHeavy};
		font-weight: 200;
		transition: ${props => props.theme.easeTransition};
		font-size: 16px;
		:hover {
			color: ${props => props.theme.darkHeavy};
			transform: translate(5px, 0);
		}
		svg {
			margin-left: 1em;
			transform: translate(0, 1px);
		}
	}
`;

export const AuthFormContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;
	max-width: 650px;
	margin: 0 auto;
	transform: translate(0, -${authNavbarHeight}px);
	@media screen and (max-width: 1150px) {
		width: 500px;
		max-width: calc(100vw - 60px);
		transform: translate(0, 0);
	}
`;

export const AuthForm = styled.div`
	margin-top: 20px;
`;

export const AuthHelperLinks = styled.div`
	display: flex;
	justify-content: space-between;
	width: ${props => props.maxWidth}%;
	margin: 0 auto;
	@media screen and (max-width: 1150px) {
		flex-direction: column;
		align-items: center;
		a {
			&:not(:last-of-type) {
				margin-bottom: 10px;
			}
		}
	}
`;

export const AuthLink = styled(Link)`
	font-size: 16px;
	font-weight: ${props => (props.isbold ? 700 : 200)};
	color: ${props => props.theme.darkPrimary};
	:hover {
		svg {
			transform: ${props =>
				props.hasicon === "right" ? "translate(5px, 0)" : "translate(-5px, 0)"};
		}
	}
	svg {
		margin-left: ${props => (props.hasicon === "right" ? "10px" : "0")};
		margin-right: ${props => (props.hasicon === "left" ? "10px" : "0")};
		transition: ${props => props.theme.easeTransition};
	}
`;

export const FormText = styled.p`
	padding: 0 1em;
	margin-bottom: 2em;
`;

class Auth extends Component {
	render() {
		switch (this.props.match.path) {
			case "/login":
				return <Login />;
			case "/register":
				return <Register />;
			case "/email/verify":
				return <Verify />;
			case "/password/reset":
				return <ForgotPassword />;
			default:
				return <div>Error</div>;
		}
	}
}

export default withRouter(withTheme(Auth));
