import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Title = styled.h2`
	font-size: 42px;
	font-weight: 900;
	color: ${props => props.theme.darkPrimary};
	@media screen and (max-width: 768px) {
		font-size: 28px;
	}
`;

const SectionTitle = props => {
	return <Title>{props.text}</Title>;
};

SectionTitle.propTypes = {
	text: PropTypes.string.isRequired
};

export default SectionTitle;
