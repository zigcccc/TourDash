import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Switch = ({ checked, name, handleChange, label }) => {
	return (
		<SwitchContainer>
			<Label>{label}</Label>
			<SwitchElement
				type="checkbox"
				name={name}
				onChange={handleChange}
				checked={checked}
			/>
		</SwitchContainer>
	);
};

Switch.propTypes = {
	checked: PropTypes.bool,
	handleChange: PropTypes.func.isRequired
};

const SwitchContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const SwitchElement = styled.input`
	position: relative;
	appearance: none;
	outline: none;
	width: 50px;
	height: 30px;
	background-color: ${props => props.theme.white};
	border: 1px solid ${props => props.theme.darkGray};
	border-radius: 50px;
	box-shadow: inset -20px 0 0 0 ${props => props.theme.lightGray};
	transition-duration: 200ms;
	&:hover {
		cursor: pointer;
	}
	&::after {
		content: "";
		position: absolute;
		top: 1px;
		left: 1px;
		width: 26px;
		height: 26px;
		background-color: transparent;
		border-radius: 50%;
	}
	&:checked {
		border-color: ${props => props.theme.mainColor};
		box-shadow: inset 20px 0 0 0 ${props => props.theme.mainColor};
	}
	&:checked::after {
		left: 20px;
		box-shadow: -2px 4px 3px rgba(0, 0, 0, 0.05);
	}
`;

const Label = styled.p`
	font-size: 12px;
	color: ${props => props.theme.heavyGray};
	font-weight: bold;
	margin: 0 0 5px;
`;

export default Switch;
