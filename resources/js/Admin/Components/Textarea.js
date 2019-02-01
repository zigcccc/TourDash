import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TextArea } from "bloomer";

const Textarea = props =>
	props.label ? (
		<InputFieldContainer>
			<Label htmlFor={props.name}>{props.label}</Label>
			<StyledTextArea
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				rows={props.rows}
			/>
		</InputFieldContainer>
	) : (
		<StyledTextArea
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
			name={props.name}
			rows={props.rows}
		/>
	);

Textarea.propTypes = {
	value: PropTypes.string,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

Textarea.defaultProps = {
	rows: 4
};

const StyledTextArea = styled(TextArea)`
	border-radius: 15px;
	outline: none;
	border: 2px solid ${props => props.theme.lightGray};
	&:hover {
		border-color: ${props => props.theme.lightGray};
	}
	&.has-errors {
		border-color: ${props => props.theme.errorColor};
	}
	&:focus {
		outline: none;
		border: 2px solid ${props => props.theme.mainColor};
		box-shadow: none;
		&.has-errors {
			border-color: ${props => props.theme.errorColor};
		}
	}
`;

const InputFieldContainer = styled.div`
	margin: 10px 0;
`;

const Label = styled.label`
	margin-left: 0.75em;
	font-weight: 900;
	color: ${props => props.theme.darkPrimary};
	text-transform: uppercase;
	font-size: 12px;
`;

export default Textarea;
