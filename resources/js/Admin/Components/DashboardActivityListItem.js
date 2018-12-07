import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import times from "lodash/times";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { truncate } from "../Utils/";
import InvertedCta from "../../Shared/Components/InvertedCta";
import FlatCta from "../../Shared/Components/FlatCta";

const ActivityListItemContainer = styled.div`
	margin: 15px 0 0;
	padding-bottom: 15px;
	position: relative;
	:after {
		content: "";
		display: block;
		width: 50%;
		height: 1px;
		background-color: ${props => props.theme.lightGray};
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
	}
	:first-of-type {
		margin-top: 0;
	}
	:last-of-type {
		margin-bottom: 0;
		:after {
			display: none;
		}
	}
`;

const ActivityListItemHeader = styled.div`
	display: flex;
	align-items: center;
`;

const ActivityListItemAvatar = styled.div`
	display: flex;
	position: relative;
	width: 50px;
	height: 50px;
	margin-right: 20px;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

const Badge = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	background: ${props => props.theme.mainColor};
	width: 17px;
	height: 17px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: ${props => props.theme.lightShadow};
	svg {
		color: ${props => props.theme.white};
		font-size: 8px;
		line-height: 1;
		width: 100%;
	}
`;

const ActivityListItemAuthorInfo = styled.div`
	flex: 1;
	padding-right: 10px;
	h4 {
		font-size: 14px;
		font-weight: 200;
		line-height: 1.1;
		span {
			font-weight: 900;
		}
	}
	p {
		font-size: 11px;
		font-weight: 200;
		span {
			font-type: italic;
		}
	}
`;

const ActivityListItemMeta = styled.p`
	font-size: 10px;
	padding-right: 20px;
	font-weight: 400;
`;

const DeleteActivityContainer = styled.a`
	color: ${props => props.theme.lightGray};
	transition: ${props => props.theme.easeTransition};
	:hover {
		color: ${props => props.theme.colorError};
	}
`;

const ActivityListItemBody = styled.div`
	padding-left: 70px;
	p {
		margin-top: 10px;
		font-size: 14px;
		&.little-margin {
			margin-top: 5px;
		}
	}
	h4 {
		font-weight: 700;
		font-size: 14px;
	}
`;

const StarsContainer = styled.div`
	svg {
		color: ${props => props.theme.colorWarning};
		&.disabled {
			opacity: 0.25;
			color: ${props => props.theme.darkGray};
		}
	}
`;

const ActivityCta = styled(InvertedCta)`
	margin: 15px auto 5px;
	text-transform: uppercase;
	min-width: 300px;
`;

const ActivityFlatCta = styled(FlatCta)`
	text-transform: uppercase;
	color: ${props => props.theme.colorError};
	margin: 0 auto;
	padding: 5px;
	min-width: 300px;
`;

class DashboardActivityListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			iconsMap: {
				review: "star",
				favorite: "heart",
				contact: "envelope"
			},
			headingMap: {
				review: "written a review",
				favorite: "favorited an accommodation",
				contact: "contacted you"
			}
		};
	}

	render() {
		const {
			activity,
			deleteActivity,
			deleteMessage,
			replyToMessage,
			dennyReview,
			approveReview
		} = this.props;
		return (
			<ActivityListItemContainer key={activity.id}>
				<ActivityListItemHeader>
					<ActivityListItemAvatar>
						<Badge>
							<FontAwesomeIcon icon={this.state.iconsMap[activity.type]} />
						</Badge>
						<img src={activity.author.avatar} alt={activity.author.name} />
					</ActivityListItemAvatar>
					<ActivityListItemAuthorInfo>
						<h4>
							<span>{activity.author.name}</span> has{" "}
							{this.state.headingMap[activity.type]}
						</h4>
						{activity.type === "review" && (
							<p>
								Review for accommodation: <span>{activity.refersTo}</span>
							</p>
						)}
						{activity.type === "favorite" && (
							<p>
								Accommodation: <span>{activity.refersTo}</span>
							</p>
						)}
					</ActivityListItemAuthorInfo>
					<ActivityListItemMeta>{activity.date}</ActivityListItemMeta>
					<DeleteActivityContainer href="#" onClick={deleteActivity}>
						<FontAwesomeIcon icon="eye-slash" />
					</DeleteActivityContainer>
				</ActivityListItemHeader>
				<ActivityListItemBody>
					{activity.type === "review" && (
						<StarsContainer>
							{times(Math.floor(activity.content.rating)).map((v, i) => {
								return <FontAwesomeIcon key={i} icon="star" />;
							})}
							{activity.content.rating - Math.floor(activity.content.rating) !==
							0 ? (
								<FontAwesomeIcon icon="star-half-alt" />
							) : null}
							{times(5 - Math.ceil(activity.content.rating)).map((v, i) => {
								return (
									<FontAwesomeIcon key={i} icon="star" className="disabled" />
								);
							})}
						</StarsContainer>
					)}
					{activity.type === "contact" && (
						<h4>Subject: {activity.content.subject}</h4>
					)}
					{!isEmpty(activity.content) && (
						<p
							className={classNames({
								"little-margin": activity.type === "contact"
							})}
						>
							{truncate(activity.content.message, 140)}
						</p>
					)}
					{activity.type === "review" && (
						<React.Fragment>
							<ActivityCta
								fontSize={12}
								handleClick={approveReview}
								text="approve"
							/>
							<ActivityFlatCta
								handleClick={dennyReview}
								fontSize={12}
								text="denny"
							/>
						</React.Fragment>
					)}
					{activity.type === "contact" && (
						<React.Fragment>
							<ActivityCta
								fontSize={12}
								handleClick={replyToMessage}
								text={`Reply to ${activity.author.name.split(" ")[0]}`}
							/>
							<ActivityFlatCta
								handleClick={deleteMessage}
								fontSize={12}
								text="delete"
							/>
						</React.Fragment>
					)}
				</ActivityListItemBody>
			</ActivityListItemContainer>
		);
	}
}

DashboardActivityListItem.propTypes = {
	activity: PropTypes.shape({
		id: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired
	})
};

export default DashboardActivityListItem;
