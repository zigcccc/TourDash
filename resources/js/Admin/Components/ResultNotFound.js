import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import MainCta from "../../Shared/Components/MainCta";

const ResultNotFound = props => (
	<StyledResultsNotFound>
		<p>Za iskalni niz ni najdenih rezultatov...</p>
		<MainCta to={props.action} fontSize={16} text={props.actionText} />
	</StyledResultsNotFound>
);

ResultNotFound.propTypes = {
	action: PropTypes.string.isRequired,
	actionText: PropTypes.string.isRequired
};

ResultNotFound.defaultProps = {
	actionText: "Dodaj novo"
};

const StyledResultsNotFound = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	p {
		font-size: 22px;
		color: ${props => props.theme.heavyGray};
		font-weight: 900;
	}
	@media screen and (max-width: 768px) {
		padding: 0 20px;
		text-align: center;
		p {
			font-size: 18px;
		}
	}
`;

export default ResultNotFound;
