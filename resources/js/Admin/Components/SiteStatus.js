import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "./Badge";
import { capitalize } from "../Utils";

class SiteStatus extends Component {
	render() {
		return (
			<SiteStatusContainer>
				<StatusGroupContainer>
					<StatusGroup>
						<StatusIndicator status="success" />
						Stanje strani: <strong>aktivno</strong>
					</StatusGroup>
					<Badge content="2" size={18} horizontalOffset={-3}>
						<StatusGroup>
							<StatusIndicator status="warning" />
							SEO stanje: <strong>prihaja do napak</strong>
						</StatusGroup>
					</Badge>
				</StatusGroupContainer>
				<CustomLink href="/" target="_blank">
					<FontAwesomeIcon icon="sign-out-alt" />
					&nbsp;<span>https://zigakrasovec.com</span>
				</CustomLink>
			</SiteStatusContainer>
		);
	}
}

const SiteStatusContainer = styled.div`
	font-size: 14px;
	display: flex;
	align-items: center;
	color: ${props => props.theme.darkHeavy};
	position: relative;
`;

const StatusGroupContainer = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 1150px) {
		display: none;
	}
`;
export const StatusGroup = styled.div`
	margin-right: 20px;
	display: flex;
	align-items: center;
	strong {
		margin-left: 0.25em;
		font-weight: 900;
	}
`;

export const StatusIndicator = styled.div`
	width: 12px;
	height: 12px;
	margin-right: 5px;
	border-radius: 50%;
	background-color: ${props => props.theme[`color${capitalize(props.status)}`]};
`;

const CustomLink = styled.a`
	display: flex;
	align-items: center;
	line-height: 12px;
	color: ${props => props.theme.darkHeavy};
	transition: ${props => props.theme.easeTransition};
	transform: translate(0, 1px);
	:hover {
		transform: translate(3px, 1px);
	}
	span {
		font-style: italic;
	}
	@media screen and (max-width: 1150px) {
		color: ${props => props.theme.white};
	}
`;

export default SiteStatus;
