import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { OutsideHandler } from "./Helpers";

class CardDropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
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
	render() {
		return (
			<OutsideHandler handleClickOutside={this._closeDropdown.bind(this)}>
				<CardDropdownContainer>
					<DropdownTrigger
						className={classNames({
							"is-active": this.state.open
						})}
						onClick={this._toggleState.bind(this)}
					>
						<FontAwesomeIcon icon="ellipsis-v" />
					</DropdownTrigger>
					<DropdownContent
						minWidth={this.props.minWidth}
						className={classNames({
							"is-active": this.state.open
						})}
					>
						{this.props.children}
					</DropdownContent>
				</CardDropdownContainer>
			</OutsideHandler>
		);
	}
}

const CardDropdownContainer = styled.div`
	position: absolute;
	top: 20px;
	right: 10px;
`;

const DropdownTrigger = styled.div`
	border-radius: 200px;
	background: transparent;
	display: flex;
	width: 30px;
	height: 30px;
	justify-content: center;
	align-items: center;
	align-items: center;
	font-size: 18px;
	&.is-active {
		background-color: ${props => props.theme.whiteShade3};
	}
	:hover {
		background: ${props => props.theme.lightGray};
		cursor: pointer;
	}
	position: relative;
	z-index: 10;
`;

const DropdownContent = styled.div`
	position: absolute;
	top: 30px;
	right: 0;
	width: auto;
	min-width: ${props => props.minWidth || "150px"};
	height: auto;
	background: ${props => props.theme.white};
	color: ${props => props.theme.darkHeavy};
	box-shadow: ${props => props.theme.lightShadow};
	border-radius: 5px;
	max-height: 0;
	overflow: hidden;
	&.is-active {
		max-height: unset;
		padding-bottom: 5px;
		padding-top: 5px;
		z-index: 1;
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

export default CardDropdown;
