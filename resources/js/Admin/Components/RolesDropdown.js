import React, { Component, Fragment } from "react";
import styled from "styled-components";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownContent,
	DropdownItem as BloomerDropdownItem,
	DropdownDivider
} from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const possibleRoles = ["user", "admin", "superadmin"];

class RolesDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			loading: false
		};
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.selectRole = this.selectRole.bind(this);
	}

	toggleDropdown() {
		this.setState({
			active: !this.state.active
		});
	}

	selectRole(role) {
		const { user, handleClick } = this.props;
		handleClick(user.id, role);
		this.setState({ loading: true, active: false });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.user.role !== this.props.user.role) {
			this.setState({ loading: false });
		}
	}

	render() {
		const { active, loading } = this.state;
		const { user, icon } = this.props;
		return (
			<RoleDropdown isAlign="right" isActive={active}>
				<DropdownTrigger style={{ width: "100%" }}>
					<DropdownButton aria-haspopup={true} onClick={this.toggleDropdown}>
						<span>{user.role}</span>
						{loading ? (
							<FontAwesomeIcon icon="circle-notch" spin size="1x" />
						) : (
							<FontAwesomeIcon icon={icon} size="1x" />
						)}
					</DropdownButton>
				</DropdownTrigger>
				<DropdownMenu>
					<DropdownContent>
						{possibleRoles.map((role, i) => (
							<Fragment key={role}>
								<DropdownItem
									isActive={role === user.role}
									className={classNames({
										"is-disabled": role === user.role
									})}
									onClick={() =>
										role !== user.role ? this.selectRole(role) : null
									}
								>
									{role}
									{role === user.role && (
										<FontAwesomeIcon icon="check" size="xs" />
									)}
								</DropdownItem>
								{i !== possibleRoles.length - 1 && <DropdownDivider />}
							</Fragment>
						))}
					</DropdownContent>
				</DropdownMenu>
			</RoleDropdown>
		);
	}
}

RolesDropdown.propTypes = {
	user: PropTypes.object,
	handleClick: PropTypes.func.isRequired,
	icon: PropTypes.string.isRequired
};

const RoleDropdown = styled(Dropdown)`
	display: flex;
	justify-content: space-between;
`;

const DropdownButton = styled(Button)`
	width: 100%;
	display: flex;
	justify-content: space-between;
	border: 1px solid ${props => props.theme.mainColor};
	:hover {
		border: 1px solid ${props => props.theme.mainColor};
		color: ${props => props.theme.mainColor};
	}
	span {
		margin-right: 1em;
	}
	svg {
		color: ${props => props.theme.mainColor};
	}
`;

const DropdownItem = styled(BloomerDropdownItem)`
	svg {
		margin-left: 1em;
	}
	&:hover {
		cursor: pointer;
		background: rgba(0, 0, 0, 0.05);
	}
	&.is-disabled {
		color: ${props => props.theme.darkGray};
		cursor: not-allowed;
		&:hover {
			background: transparent;
		}
	}
`;

export default RolesDropdown;
