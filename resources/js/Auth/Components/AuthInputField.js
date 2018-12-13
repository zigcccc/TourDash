import React from "react";
import styled, { withTheme } from "styled-components";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Field as BloomerField, Control, Input, Icon } from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Field = styled(BloomerField)`
	min-width: 650px;
	&.is-small {
		min-width: unset;
	}
	&.has-errors {
		input {
			border-color: ${props => props.theme.colorError} !important;
			border-width: 3px;
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
		font-size: 22px;
		font-weight: 900;
		padding: 12px 20px;
		border-color: transparent !important;
		:hover {
			border-color: transparent !important;
		}
		:focus {
			box-shadow: none !important;
			border-color: ${props => props.theme.mainColor} !important;
			border-width: 3px !important;
			color: ${props => props.theme.darkHeavy} !important;
		}
		:-webkit-autofill {
			background-color: ${props => props.theme.mainColor} !important;
		}
	}
	.icon {
		color: ${props => props.theme.darkGray} !important;
		font-size: 24px;
		transform: translate(0, -1px);
	}
`;

const AuthInputField = props => (
	<Field
		className={classNames({
			"has-errors": props.hasError,
			"is-small": props.isSmall
		})}
	>
		<Control hasIcons="right">
			<Input
				type={props.hiddenCharacters ? "password" : "text"}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.handleChange}
			/>
			<Icon isSize="large" isAlign="right">
				<FontAwesomeIcon icon={props.icon} />
			</Icon>
		</Control>
	</Field>
);

AuthInputField.propTypes = {
	hasError: PropTypes.bool,
	hiddenCharacters: PropTypes.bool,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	isSmall: PropTypes.bool
};

export default withTheme(AuthInputField);
