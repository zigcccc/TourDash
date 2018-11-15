import React, { Component } from "react";
import styled from "styled-components";
import { Field as BloomerField, Control, Input, Icon } from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

const Field = styled(BloomerField)`
	min-width: 275px;
	margin-bottom: 0 !important;
	&.has-errors {
		input {
			border-color: ${props => props.theme.colorError} !important;
			border-width: 2px;
			:hover {
				border-color: ${props => props.theme.colorError} !important;
			}
		}
	}
	input {
		border-radius: 200px;
		background-color: ${props => props.theme.lightGray};
		box-shadow: none;
		color: ${props => props.theme.heavyGray} !important;
		font-size: 12px;
		font-weight: 900;
		padding: 15px 20px;
		border-color: transparent !important;
		:hover {
			border-color: transparent !important;
		}
		:focus {
			box-shadow: none !important;
			border-color: ${props => props.theme.mainColor} !important;
			border-width: 2px !important;
			color: ${props => props.theme.darkHeavy} !important;
		}
		:-webkit-autofill {
			background-color: ${props => props.theme.mainColor} !important;
		}
	}
	.icon {
		color: ${props => props.theme.darkGray} !important;
		font-size: 14px;
	}
`;

class ActionbarSearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ""
		};
	}

	_handleSearchQuery(e) {
		this.setState({
			query: e.target.value
		});
		_.throttle(() => console.log(this.state.query), 500);
	}

	render() {
		return (
			<Field>
				<Control hasIcons="right">
					<Input
						type="text"
						placeholder="What are you looking for?"
						value={this.state.query}
						onChange={this._handleSearchQuery.bind(this)}
					/>
					<Icon isSize="large" isAlign="right">
						<FontAwesomeIcon icon="search" />
					</Icon>
				</Control>
			</Field>
		);
	}
}

export default ActionbarSearchForm;
