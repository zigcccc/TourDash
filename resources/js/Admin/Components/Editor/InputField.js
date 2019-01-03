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
	max
}) => {
	const extraProps = type === "number" ? { min: min, max: max } : {};
	return (
		<Input
			value={value}
			onChange={onChange}
			name={name}
			type={type}
			{...extraProps}
			className={classNames({
				[size]: true,
				"has-errors": hasErrors
			})}
		/>
	);
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

const Input = styled.input`
	font-size: 14px;
	border: none;
	outline: none;
	display: block;
	background: ${props => props.theme.white};
	border-radius: 200px;
	padding: 0.5em 0.75em;
	border: 2px solid ${props => props.theme.lightGray};
	width: 100%;
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

export default InputField;
