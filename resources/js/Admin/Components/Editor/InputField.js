import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputField = ({ value, onChange, name, size }) => {
	return (
		<Input value={value} onChange={onChange} name={name} className={size} />
	);
};

InputField.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	size: PropTypes.oneOf(["small", "normal", "large"])
};

InputField.defaultProps = {
	size: "normal",
	name: "Input field"
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
	}
`;

export default InputField;
