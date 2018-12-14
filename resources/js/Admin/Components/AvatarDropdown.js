import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactPlaceholder from "react-placeholder";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer, OutsideHandler } from "./Helpers";
import Snackbar from "../../Shared/Components/Snackbar";
import { validResponse } from "../../Shared/Utils/";

const DropdownContainer = styled.div`
	position: relative;
`;

const AvatarContainer = styled.div`
	border-radius: 50%;
	width: 35px;
	height: 35px;
	overflow: hidden;
	display: flex;
	margin-right: 10px;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

const AvatarContainerPlaceholder = styled(AvatarContainer)`
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.darkGray};
`;

const DropdownTrigger = styled.div`
	border-radius: 200px;
	background: ${props => props.theme.whiteShade3};
	padding: 4px 10px 4px 4px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: ${props => props.theme.easeTransition};
	font-size: 14px;
	&.is-active {
		background-color: ${props => props.theme.white};
	}
	:hover {
		background: ${props => props.theme.lightGray};
		cursor: pointer;
	}
	svg {
		margin-left: 10px;
	}
	position: relative;
	z-index: 10;
`;

const DropdownTriggerPlaceholder = styled(DropdownTrigger)`
	min-width: 200px;
`;

const DropdownContent = styled.div`
	position: absolute;
	top: 25px;
	left: 0;
	right: 0;
	height: auto;
	background: ${props => props.theme.white};
	color: ${props => props.theme.darkHeavy};
	box-shadow: ${props => props.theme.lightShadow};
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	transition: 200ms linear all;
	max-height: 0;
	overflow: hidden;
	&.is-active {
		max-height: unset;
		padding-bottom: 5px;
		padding-top: 20px;
	}
	a {
		display: flex;
		align-items: center;
		position: relative;
		font-size: 14px;
		padding: 0.75em 1em;
		color: ${props => props.theme.darkHeavy};
		transition: ${props => props.theme.easeTransition};
		&.is-danger {
			color: ${props => props.theme.colorError};
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
			background-color: ${props => props.theme.darkGray};
		}
	}
`;

const AvatarDropdownPlaceholder = () => (
	<DropdownContainer>
		<DropdownTriggerPlaceholder>
			<AvatarContainerPlaceholder>
				<FontAwesomeIcon icon="user" size="lg" />
			</AvatarContainerPlaceholder>
			<FontAwesomeIcon icon="chevron-down" />
		</DropdownTriggerPlaceholder>
	</DropdownContainer>
);

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
		const { userReady, user } = this.props;
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
					<ReactPlaceholder
						customPlaceholder={<AvatarDropdownPlaceholder />}
						ready={userReady}
					>
						<DropdownContainer>
							<DropdownTrigger
								onClick={this._toggleState.bind(this)}
								className={this.state.open ? "is-active" : ""}
							>
								{user.avatar ? (
									<AvatarContainer>
										<img src={user.avatar} alt={user.name} />
									</AvatarContainer>
								) : (
									<AvatarContainerPlaceholder>
										<FontAwesomeIcon icon="user" size="lg" />
									</AvatarContainerPlaceholder>
								)}
								Živjo, {user.name}
								<FontAwesomeIcon
									icon={`chevron-${this.state.open ? "up" : "down"}`}
								/>
							</DropdownTrigger>
							<DropdownContent className={this.state.open ? "is-active" : ""}>
								<Link to="/users/my-profile/">
									My profile
									<Spacer />
									<FontAwesomeIcon icon="user" />
								</Link>
								<Link to="/messages/">
									Messages
									<Spacer />
									<FontAwesomeIcon icon="envelope" />
								</Link>
								<a className="is-danger" onClick={this._signUserOut} href="#">
									Sign out
									<Spacer />
									{loading ? (
										<FontAwesomeIcon icon="circle-notch" spin size="1x" />
									) : (
										<FontAwesomeIcon icon="sign-out-alt" />
									)}
								</a>
							</DropdownContent>
						</DropdownContainer>
					</ReactPlaceholder>
				</Fragment>
			</OutsideHandler>
		);
	}
}

AvatarDropdown.propTypes = {
	user: PropTypes.object,
	userReady: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	user: state.user.user,
	userReady: state.user.ready
});

export default connect(
	mapStateToProps,
	null
)(AvatarDropdown);
