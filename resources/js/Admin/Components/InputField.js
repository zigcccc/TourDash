import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

const InputField = ({
	value,
	onChange,
	name,
	size,
	hasErrors,
	type,
	min,
	max,
	label,
	placeholder
}) => {
	const extraProps = type === "number" ? { min: min, max: max } : {};
	if (!label) {
		return (
			<Input
				value={value}
				onChange={onChange}
				name={name}
				type={type}
				placeholder={placeholder || ""}
				{...extraProps}
				className={classNames({
					[size]: true,
					"number-field": type === "number",
					"has-errors": hasErrors
				})}
			/>
		);
	} else {
		return (
			<InputFieldContainer>
				<Label htmlFor={name}>{label}</Label>
				<Input
					value={value}
					onChange={onChange}
					name={name}
					placeholder={placeholder || ""}
					type={type}
					{...extraProps}
					className={classNames({
						[size]: true,
						"number-field": type === "number",
						"has-errors": hasErrors
					})}
				/>
			</InputFieldContainer>
		);
	}
};

InputField.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	size: PropTypes.oneOf(["small", "normal", "large"]),
	hasErros: PropTypes.bool,
	type: PropTypes.string.isRequired
};

InputField.defaultProps = {
	size: "normal",
	name: "Input field",
	type: "text"
};

const InputFieldContainer = styled.div`
	margin: 10px 0;
`;

const Input = styled.input`
	font-size: 14px;
	outline: none;
	display: block;
	background: ${props => props.theme.white};
	border-radius: 200px;
	padding: 0.5em 0.75em;
	border: 2px solid ${props => props.theme.lightGray};
	width: 100%;
	&.number-field {
		text-align: right;
	}
	&.has-errors {
		border-color: ${props => props.theme.errorColor};
	}
	&.large {
		font-size: 22px;
	}
	&.small {
		font-size: 11px;
	}
	&:hover {
		cursor: pointer;
	}
	&:focus {
		outline: none;
		border: 2px solid ${props => props.theme.mainColor};
		&.has-errors {
			border-color: ${props => props.theme.errorColor};
		}
	}
`;

const Label = styled.label`
	margin-left: 0.75em;
	font-weight: 900;
	color: ${props => props.theme.darkPrimary};
	text-transform: uppercase;
	font-size: 12px;
`;

export default InputField;
