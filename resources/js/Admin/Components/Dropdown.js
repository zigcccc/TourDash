import React, { Component, Fragment } from "react";
import styled from "styled-components";
import classNames from "classnames";
import PropTypes from "prop-types";
import _isArray from "lodash/isArray";
import {
	Button,
	Dropdown as BloomerDropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownContent,
	DropdownItem as BloomerDropdownItem,
	DropdownDivider as BloomerDropdownDivider
} from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropdown = props =>
	props.label ? (
		<Container>
			<Label>{props.label}</Label>
			<DropdownElement {...props} />
		</Container>
	) : (
		<DropdownElement {...props} />
	);

class DropdownElement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.selectType = this.selectType.bind(this);
	}

	toggleDropdown() {
		this.setState({
			active: !this.state.active
		});
	}

	selectType(type) {
		const { handleClick } = this.props;
		handleClick(type);
		this.setState({ active: false });
	}

	render() {
		const { active } = this.state;
		const {
			icon,
			current,
			possibilities,
			color,
			fullWidth,
			condensed,
			loading,
			style,
			mimicInputField
		} = this.props;
		return (
			<RoleDropdown
				isAlign="right"
				isActive={active}
				className={classNames({
					"full-width": fullWidth,
					[this.props.className]: true
				})}
				style={style}
			>
				<DropdownTrigger style={{ width: "100%" }}>
					<DropdownButton
						aria-haspopup={true}
						onClick={this.toggleDropdown}
						className={classNames({
							dark: color === "dark",
							success: color === "success",
							danger: color === "danger",
							"mimic-input": mimicInputField,
							opened: active
						})}
					>
						<span>
							{loading ? (
								<FontAwesomeIcon icon="circle-notch" spin size="1x" />
							) : _isArray(possibilities) ? (
								current
							) : (
								possibilities[current]
							)}
						</span>
						<FontAwesomeIcon icon={icon} size="1x" />
					</DropdownButton>
				</DropdownTrigger>
				<DropdownMenu>
					<DropdownContent>
						{_isArray(possibilities)
							? possibilities.map((type, i) => (
									<Fragment key={type}>
										<DropdownItem
											isActive={type === current}
											className={classNames({
												"is-disabled": type === current
											})}
											onClick={() => this.selectType(type)}
										>
											{type}
											{type === current && (
												<FontAwesomeIcon icon="check" size="xs" />
											)}
										</DropdownItem>
										{i !== possibilities.length - 1 && (
											<DropdownDivider
												className={classNames({
													"is-condensed": condensed
												})}
											/>
										)}
									</Fragment>
							  ))
							: Object.keys(possibilities).map((type, i) => (
									<Fragment key={type}>
										<DropdownItem
											isActive={type === current}
											className={classNames({
												"is-disabled": type === current
											})}
											onClick={() => this.selectType(type)}
										>
											{possibilities[type]}
											{type === current && (
												<FontAwesomeIcon icon="check" size="xs" />
											)}
										</DropdownItem>
										{i !== Object.keys(possibilities).length - 1 && (
											<DropdownDivider
												className={classNames({
													"is-condensed": condensed
												})}
											/>
										)}
									</Fragment>
							  ))}
					</DropdownContent>
				</DropdownMenu>
			</RoleDropdown>
		);
	}
}

Dropdown.propTypes = {
	handleClick: PropTypes.func.isRequired,
	icon: PropTypes.string.isRequired,
	possibilities: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
		.isRequired,
	color: PropTypes.string,
	fullWidth: PropTypes.bool.isRequired,
	condensed: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired
};

Dropdown.defaultProps = {
	color: "primary",
	icon: "chevron-down",
	fullWidth: false,
	condensed: false,
	loading: false
};

const Container = styled.div`
	margin: 10px 0;
`;

const Label = styled.label`
	margin-left: 0.75em;
	font-weight: 900;
	color: ${props => props.theme.darkPrimary};
	text-transform: uppercase;
	font-size: 12px;
`;

const RoleDropdown = styled(BloomerDropdown)`
	display: flex;
	justify-content: space-between;
	&.full-width .dropdown-menu {
		left: 0;
		right: 0;
	}
`;

const DropdownButton = styled(Button)`
	width: 100%;
	display: flex;
	justify-content: space-between;
	border: 1px solid ${props => props.theme.mainColor};
	color: ${props => props.theme.mainColor};
	&:hover {
		border: 1px solid ${props => props.theme.mainColor};
		color: ${props => props.theme.mainColor};
	}
	&:focus {
		outline: none;
		color: ${props => props.theme.mainColor};
	}
	&.dark {
		color: ${props => props.theme.darkPrimary};
		border-color: ${props => props.theme.darkPrimary};
		&:focus {
			box-shadow: none;
		}
		svg {
			color: ${props => props.theme.darkPrimary};
		}
	}
	&.success {
		color: ${props => props.theme.colorSuccess};
		border-color: ${props => props.theme.colorSuccess};
		&:focus {
			box-shadow: none;
		}
		svg {
			color: ${props => props.theme.colorSuccess};
		}
	}
	&.danger {
		color: ${props => props.theme.colorError};
		border-color: ${props => props.theme.colorError};
		&:focus {
			box-shadow: none;
		}
		svg {
			color: ${props => props.theme.colorError};
		}
	}
	&.mimic-input {
		border-color: ${props => props.theme.lightGray};
		border-width: 2px;
		border-radius: 200px;
		svg {
			color: ${props => props.theme.lightGray};
		}
		&.opened {
			border-color: ${props => props.theme.mainColor};
			color: ${props => props.theme.mainColor};
			svg {
				color: ${props => props.theme.mainColor};
			}
		}
		&:hover {
			border-color: ${props => props.theme.mainColor};
			color: ${props => props.theme.mainColor};
			svg {
				color: ${props => props.theme.mainColor};
			}
		}
	}
	span {
		margin-right: 1em;
	}
	svg {
		color: ${props => props.theme.mainColor};
	}
`;

const DropdownDivider = styled(BloomerDropdownDivider)`
	&.is-condensed {
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
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

export default Dropdown;
