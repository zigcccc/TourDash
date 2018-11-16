import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import PropTypes from "prop-types";
import MainCta from "../Components/MainCta";

const CardContainer = styled.div`
	flex: 1;
	border-radius: 5px;
	box-shadow: ${props => props.theme.lightShadow};
	background: ${props => props.theme.white};
	position: relative;
	padding: 20px;
	height: auto;
	:before {
		content: "";
		position: absolute;
		display: ${props => (props["data-border"] ? "block" : "none")};
		top: 0;
		left: 0;
		right: 0;
		background: ${props => props.theme.mainColor};
		height: 5px;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
	}
`;

const CardHeading = styled.div`
	display: flex;
	margin-bottom: 10px;
	h3 {
		font-size: 18px;
		font-weight: 900;
		color: ${props => props.theme.darkPrimary};
	}
	h5 {
		margin-left: 0.25em;
		font-size: 14px;
		font-weight: 200;
		color: ${props => props.theme.darkPrimary};
		span {
			font-size: 18px;
		}
	}
`;

const CardCta = styled(MainCta)`
	min-width: 150px;
	display: inline-block;
	position: absolute;
	bottom: 0;
	left: 50%;
	margin-bottom: 0;
	transform: translate(-50%, 50%);
	:hover {
		transform: translate(-50%, 47%);
	}
	:active {
		transform: translate(-50%, 47%) scale(0.8);
	}
`;

const Card = props => {
	return (
		<CardContainer
			className={classNames([props.className])}
			data-border={props.hasBorder}
		>
			{props.title ? (
				<CardHeading>
					<h3>{props.title}</h3>
					{props.subtitle ? (
						<h5>
							<span>-</span> {props.subtitle}
						</h5>
					) : null}
				</CardHeading>
			) : null}
			{props.children}
			{props.ctaAction ? (
				typeof props.ctaAction === "function" ? (
					<CardCta
						handleClick={props.ctaAction}
						text={props.ctaText}
						isLoading={props.ctaLoading}
						fontSize={props.ctaFontSize}
					/>
				) : (
					<CardCta
						to={props.ctaAction}
						text={props.ctaText}
						isLoading={props.ctaLoading}
						fontSize={props.ctaFontSize}
					/>
				)
			) : null}
		</CardContainer>
	);
};

Card.propTypes = {
	hasBorder: PropTypes.bool,
	title: PropTypes.string,
	hasOptions: PropTypes.bool,
	ctaAction: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	ctaText: PropTypes.string,
	ctaLoading: PropTypes.bool,
	ctaFontSize: PropTypes.number
};

Card.defaultProps = {
	hasBorder: true,
	hasOptions: false,
	ctaFontSize: 16
};

export default Card;
