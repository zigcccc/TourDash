import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Field as BloomerField, Control, Input, Icon } from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchForm = props => {
	const controlProps = props.hasIcon ? { hasIcons: "right" } : null;
	return (
		<Field>
			<Control {...controlProps}>
				<Input
					type="text"
					placeholder={props.placeholder}
					onChange={props.onChange}
					className={classNames({
						active: !props.empty
					})}
				/>
				{props.hasIcon && (
					<Icon isSize="large" isAlign="right">
						<FontAwesomeIcon icon="search" />
					</Icon>
				)}
			</Control>
		</Field>
	);
};

SearchForm.propTypes = {
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	hasIcon: PropTypes.bool.isRequired,
	loading: PropTypes.bool,
	empty: PropTypes.bool.isRequired
};

SearchForm.defaultProps = {
	hasIcon: true
};

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
		background-color: ${props => props.theme.whiteShade3};
		box-shadow: none;
		color: ${props => props.theme.heavyGray} !important;
		font-size: 12px;
		font-weight: 900;
		padding: 15px 20px;
		border-color: transparent !important;
		border-width: 2px !important;
		:hover {
			border-color: transparent !important;
		}
		:focus {
			box-shadow: none !important;
			border-color: ${props => props.theme.mainColor} !important;
			border-width: 2px !important;
			color: ${props => props.theme.darkHeavy} !important;
		}
		&.active {
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

export default SearchForm;
