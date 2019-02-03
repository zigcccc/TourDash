import React, { Fragment } from "react";
import classNames from "classnames";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer } from "./Helpers";

const ListItemContainer = props => {
	return props.link ? (
		<DashboardLinkItemContainer to={props.link}>
			{props.children}
		</DashboardLinkItemContainer>
	) : (
		<DashboardListItemContainer>{props.children}</DashboardListItemContainer>
	);
};

const DashboardListItem = props => {
	return (
		<ListItemContainer link={props.link}>
			<IconContainer>
				{(() => {
					if (props.icon.indexOf("/images/") > -1) {
						return <ImageIcon src={props.icon} alt={props.title} />;
					}
					if (props.icon.indexOf("image/") > -1) {
						return (
							<ImageIcon
								src={`/images/uploads/${props.icon}`}
								alt={props.title}
							/>
						);
					}
					return <FontAwesomeIcon icon={props.icon} />;
				})()}
			</IconContainer>
			<h4 className={classNames({ "full-width": !props.link })}>
				{props.title}
			</h4>
			<div className="author-container">
				<span>{props.author}</span>
				{props.authorAvatar && (
					<Avatar src={props.authorAvatar} alt={props.author} />
				)}
			</div>
			{props.link && (
				<Fragment>
					<Spacer />
					<Link to={props.link}>
						<FontAwesomeIcon icon="long-arrow-alt-right" />
					</Link>
				</Fragment>
			)}
		</ListItemContainer>
	);
};

DashboardListItem.propTypes = {
	icon: PropTypes.string.isRequired,
	link: PropTypes.string,
	title: PropTypes.string.isRequired,
	author: PropTypes.string,
	authorAvatar: PropTypes.string
};

DashboardListItem.defaultProps = {
	icon: "file"
};

const Avatar = styled.img`
	border-radius: 50%;
`;

const ImageIcon = styled.img`
	border-radius: 50%;
`;

const DashboardLinkItemContainer = styled(RouterLink)`
	border-radius: 200px;
	background-color: ${props => props.theme.whiteShade2};
	margin: 5px 0;
	padding: 3px 4px;
	display: flex;
	align-items: center;
	color: ${props => props.theme.darkPrimary};
	:first-of-type {
		margin-top: 15px;
	}
	h4 {
		font-size: 14px;
		font-weight: 900;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		@media screen and (max-width: 1300px) {
			width: 125px;
		}
	}
	.author-container {
		display: flex;
		align-items: center;
		font-size: 10px;
		margin-left: 20px;
		span {
			font-weight: 700;
			width: 75px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			@media screen and (max-width: 1300px) {
				display: none;
			}
		}
		img {
			width: 18px;
			height: 18px;
			object-fit: cover;
			margin-left: 3px;
		}
	}
`;

const DashboardListItemContainer = styled.div`
	border-radius: 200px;
	background-color: ${props => props.theme.whiteShade2};
	margin: 5px 0;
	padding: 3px 4px;
	display: flex;
	align-items: center;
	color: ${props => props.theme.darkPrimary};
	:first-of-type {
		margin-top: 15px;
	}
	h4 {
		font-size: 14px;
		font-weight: 900;
		width: 150px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		&.full-width {
			width: 250px;
			@media screen and (max-width: 1300px) {
				width: 150px;
			}
		}
		@media screen and (max-width: 1300px) {
			width: 125px;
		}
	}
	.author-container {
		display: flex;
		align-items: center;
		font-size: 10px;
		margin-left: 20px;
		span {
			font-weight: 700;
			width: 75px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		img {
			width: 18px;
			height: 18px;
			object-fit: cover;
			margin-left: 3px;
		}
	}
`;

const IconContainer = styled.div`
	width: 35px;
	height: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.lightGray};
	border-radius: 50%;
	overflow: hidden;
	margin-right: 10px;
	svg {
		font-size: 16px;
		color: ${props => props.theme.whiteShade2};
	}
`;

const Link = styled.span`
	color: ${props => props.theme.darkGray};
	font-size: 18px;
	transition: ${props => props.theme.easeTransition};
	margin-right: 10px;
	${DashboardListItemContainer}:hover & {
		color: ${props => props.theme.darkPrimary};
		transform: translate(3px, 0);
	}
`;

export default DashboardListItem;
