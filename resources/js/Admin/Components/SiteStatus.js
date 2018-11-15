import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "./Badge";
import { capitalize } from "../Utils";

const SiteStatusContainer = styled.div`
	margin-left: 25px;
	font-size: 14px;
	display: flex;
	align-items: center;
	color: ${props => props.theme.darkHeavy};
	position: relative;
`;

const StatusGroup = styled.div`
	margin-right: 20px;
	display: flex;
	align-items: center;
	strong {
		margin-left: 0.25em;
		font-weight: 900;
	}
`;

const StatusIndicator = styled.div`
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
`;

class SiteStatus extends Component {
	render() {
		return (
			<SiteStatusContainer>
				<StatusGroup>
					<StatusIndicator status="success" />
					Site Status: <strong>active</strong>
				</StatusGroup>
				<Badge content="2" size={18} horizontalOffset={-3}>
					<StatusGroup>
						<StatusIndicator status="warning" />
						SEO Status: <strong>moderate</strong>
					</StatusGroup>
				</Badge>
				<CustomLink href="/" target="_blank">
					<FontAwesomeIcon icon="sign-out-alt" />
					&nbsp;<span>https://tourdash.app</span>
				</CustomLink>
			</SiteStatusContainer>
		);
	}
}

export default SiteStatus;
