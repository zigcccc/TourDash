import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer, Avatar } from "../Elements";
import OutsideHandler from "../Helpers/OutsideHandler";
import Snackbar from "../../Shared/Components/Snackbar";
import { validResponse } from "../../Shared/Utils/";

class AvatarDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			hasError: false,
			error: "",
			loading: false
		};
		this._signUserOut = this._signUserOut.bind(this);
		this._dissmissError = this._dissmissError.bind(this);
	}

	_toggleState() {
		this.setState({
			open: !this.state.open
		});
	}

	_closeDropdown() {
		this.setState({
			open: false
		});
	}

	_dissmissError() {
		this.setState({
			hasError: false,
			error: ""
		});
	}

	async _signUserOut(e) {
		e.preventDefault();
		this.setState({ ...this.state, loading: true });
		try {
			const response = await axios.post("/logout");
			if (validResponse(response)) {
				window.location.href = "/login";
			} else {
				this.setState({
					hasError: true,
					loading: false,
					error: "Nekaj je šlo narobe..."
				});
			}
		} catch (err) {
			this.setState({
				hasError: true,
				loading: false,
				error: "Nekaj je šlo narobe..."
			});
		}
	}

	render() {
		const { user } = this.props;
		const { hasError, error, loading } = this.state;
		return (
			<OutsideHandler handleClickOutside={this._closeDropdown.bind(this)}>
				<Fragment>
					<Snackbar
						purpose="error"
						message={error}
						position="top"
						hasDissmissAction={true}
						dissmissAction={this._dissmissError}
						isOpen={hasError}
					/>
					{!user.loading && user.user && (
						<DropdownContainer>
							<DropdownTrigger
								onClick={this._toggleState.bind(this)}
								className={this.state.open ? "is-active" : ""}
							>
								{user.user.avatar ? (
									<AvatarContainer>
										<Avatar
											src={user.user.avatar}
											alt={user.user.name}
											size={30}
										/>
									</AvatarContainer>
								) : (
									<AvatarContainerPlaceholder>
										<FontAwesomeIcon icon="user" size="lg" />
									</AvatarContainerPlaceholder>
								)}
								<Username>Živjo, {user.user.name}</Username>
								<FontAwesomeIcon
									icon={`chevron-${this.state.open ? "up" : "down"}`}
								/>
							</DropdownTrigger>
							<DropdownContent className={this.state.open ? "is-active" : ""}>
								{(user.user.role === "admin" ||
									user.user.role === "superadmin") && (
									<Fragment>
										<a href="/admin/users/my-profile/">
											Moj profil
											<Spacer />
											<FontAwesomeIcon icon="user" />
										</a>
										<a href="/admin/users/my-profile/">
											Administracija
											<Spacer />
											<FontAwesomeIcon icon="cog" />
										</a>
									</Fragment>
								)}
								<a className="is-danger" onClick={this._signUserOut} href="#">
									Odjava
									<Spacer />
									{loading ? (
										<FontAwesomeIcon icon="circle-notch" spin size="1x" />
									) : (
										<FontAwesomeIcon icon="sign-out-alt" />
									)}
								</a>
							</DropdownContent>
						</DropdownContainer>
					)}
				</Fragment>
			</OutsideHandler>
		);
	}
}

AvatarDropdown.propTypes = {
	user: PropTypes.object
};

const mapStateToProps = state => ({
	user: state.user
});

const DropdownContainer = styled.div`
	position: relative;
`;

const AvatarContainer = styled.div`
	margin-right: 10px;
`;

const Username = styled.span`
	@media screen and (max-width: 1150px) {
		display: none;
	}
`;

const AvatarContainerPlaceholder = styled(AvatarContainer)`
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.darkGray};
`;

const DropdownTrigger = styled.div`
	border-radius: 200px;
	padding: 4px 10px 4px 4px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: ${props => props.theme.easeTransition};
	font-size: 14px;
	&.is-active {
		background-color: white;
	}
	:hover {
		background: rgba(0, 0, 0, 0.05);
		cursor: pointer;
	}
	svg {
		margin-left: 10px;
		@media screen and (max-width: 1150px) {
			margin-left: 0;
		}
	}
	position: relative;
	z-index: 10;
`;

const DropdownContent = styled.div`
	position: absolute;
	top: 25px;
	left: 0;
	right: 0;
	height: auto;
	background: white;
	color: white;
	box-shadow: ${props => props.theme.lightShadow};
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	transition: 200ms linear all;
	max-height: 0;
	overflow: hidden;
	@media screen and (max-width: 1150px) {
		left: -75px;
		top: 40px;
		border-radius: 10px;
	}
	&.is-active {
		max-height: unset;
		padding-bottom: 5px;
		padding-top: 20px;
		@media screen and (max-width: 1150px) {
			padding-top: 5px;
		}
	}
	a {
		display: flex;
		align-items: center;
		position: relative;
		font-size: 14px;
		padding: 0.75em 1em !important;
		text-transform: none !important;
		color: ${props => props.theme.dark};
		transition: ${props => props.theme.easeTransition};
		&.is-danger {
			color: ${props => props.theme.colorError};
			&:hover {
				color: ${props => props.theme.colorError};
			}
		}
		:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
		:last-of-type {
			:after {
				display: none;
			}
		}
		:after {
			content: "";
			display: block;
			position: absolute;
			bottom: 0;
			height: 1px;
			left: 10%;
			width: 80%;
			background-color: ${props => props.theme.dark};
		}
	}
`;

export default connect(
	mapStateToProps,
	null
)(AvatarDropdown);
