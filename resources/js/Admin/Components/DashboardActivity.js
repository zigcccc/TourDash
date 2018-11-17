import React, { Component } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../Components/Card";
import isEmpty from "lodash/isEmpty";
import { truncate } from "../Utils/";
import InvertedCta from "../Components/InvertedCta";
import FlatCta from "../Components/FlatCta";

const DashboardActivityContainer = styled(Card)`
	margin-top: 20px;
	padding: 20px 15px 15px;
`;

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

const date = new Date().toLocaleString("sl-SI", {
	day: "numeric",
	month: "numeric",
	year: "numeric",
	hour: "numeric",
	minute: "numeric"
});

const dummyActivities = [
	{
		id: 1,
		type: "review",
		date: date,
		refersTo: "Suite with balcony",
		author: {
			name: "Elizabeth Keen",
			avatar: "/images/avatar_women@2x.png"
		},
		content: {
			rating: 3.5,
			message:
				"A great stay for my wife, two 9 year old kids and me. Pre-arrival communication was good. Welcome was wonderful."
		}
	},
	{
		id: 2,
		type: "favorite",
		date: date,
		refersTo: "Elite Suite",
		author: {
			name: "Mark Nielsen",
			avatar: "/images/avatar_alt@2x.png"
		},
		content: {}
	},
	{
		id: 3,
		type: "contact",
		date: date,
		refersTo: "",
		author: {
			name: "Harold Cooper",
			avatar: "/images/avatar@2x.png"
		},
		content: {
			subject: "Can we bring our pets?",
			message:
				"Hi, my family and I are amazed over your apartments, and we are seriously cosidering staying here during our holidays. We were wondering, if we can bring our pets (small dog) with us? Thanks for the reply."
		}
	},
	{
		id: 4,
		type: "favorite",
		date: date,
		refersTo: "Suite with Balcony",
		author: {
			name: "Harold Cooper",
			avatar: "/images/avatar@2x.png"
		},
		content: {}
	},
	{
		id: 5,
		type: "favorite",
		date: date,
		refersTo: "King Bed",
		author: {
			name: "Raymond Reddington",
			avatar: "/images/avatar_alt@2x.png"
		},
		content: {}
	}
];

class DashboardActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: dummyActivities,
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

	_deleteActivity(activity, e) {
		e.preventDefault();
		console.log("Deleting ", activity);
	}

	_approveReview(review) {
		console.log("Approving ", review);
	}

	_dennyReview(review) {
		console.log("Dennying ", review);
	}

	_replyToMessage(message) {
		console.log("Replying to ", message);
	}

	_deleteMessage(message) {
		console.log("Deleting", message);
	}

	render() {
		return (
			<DashboardActivityContainer>
				{this.state.activities.map(activity => {
					return (
						<ActivityListItemContainer key={activity.id}>
							<ActivityListItemHeader>
								<ActivityListItemAvatar>
									<Badge>
										<FontAwesomeIcon
											icon={this.state.iconsMap[activity.type]}
										/>
									</Badge>
									<img
										src={activity.author.avatar}
										alt={activity.author.name}
									/>
								</ActivityListItemAvatar>
								<ActivityListItemAuthorInfo>
									<h4>
										<span>{activity.author.name}</span> has{" "}
										{this.state.headingMap[activity.type]}
									</h4>
									{activity.type === "review" ? (
										<p>
											Review for accommodation: <span>{activity.refersTo}</span>
										</p>
									) : null}
									{activity.type === "favorite" ? (
										<p>
											Accommodation: <span>{activity.refersTo}</span>
										</p>
									) : null}
								</ActivityListItemAuthorInfo>
								<ActivityListItemMeta>{activity.date}</ActivityListItemMeta>
								<DeleteActivityContainer
									href="#"
									onClick={this._deleteActivity.bind(this, activity.id)}
								>
									<FontAwesomeIcon icon="trash-alt" />
								</DeleteActivityContainer>
							</ActivityListItemHeader>
							<ActivityListItemBody>
								{activity.type === "review" ? (
									<StarsContainer>
										{new Array(Math.floor(activity.content.rating) + 1)
											.join("0")
											.split("")
											.map((v, i) => {
												return <FontAwesomeIcon key={i} icon="star" />;
											})}
										{activity.content.rating -
											Math.floor(activity.content.rating) !==
										0 ? (
											<FontAwesomeIcon icon="star-half-alt" />
										) : null}
										{new Array(5 - Math.ceil(activity.content.rating) + 1)
											.join("0")
											.split("")
											.map((v, i) => {
												return (
													<FontAwesomeIcon
														key={i}
														icon="star"
														className="disabled"
													/>
												);
											})}
									</StarsContainer>
								) : null}
								{activity.type === "contact" ? (
									<h4>Subject: {activity.content.subject}</h4>
								) : null}
								{!isEmpty(activity.content) ? (
									<p
										className={classNames({
											"little-margin": activity.type === "contact"
										})}
									>
										{truncate(activity.content.message, 140)}
									</p>
								) : null}
								{activity.type === "review" ? (
									<React.Fragment>
										<ActivityCta
											fontSize={12}
											handleClick={this._approveReview.bind(this, activity.id)}
											text="approve"
										/>
										<ActivityFlatCta
											handleClick={this._dennyReview.bind(this, activity.id)}
											fontSize={12}
											text="denny"
										/>
									</React.Fragment>
								) : null}
								{activity.type === "contact" ? (
									<React.Fragment>
										<ActivityCta
											fontSize={12}
											handleClick={this._replyToMessage.bind(this, activity.id)}
											text={`Reply to ${activity.author.name.split(" ")[0]}`}
										/>
										<ActivityFlatCta
											handleClick={this._deleteMessage.bind(this, activity.id)}
											fontSize={12}
											text="delete"
										/>
									</React.Fragment>
								) : null}
							</ActivityListItemBody>
						</ActivityListItemContainer>
					);
				})}
			</DashboardActivityContainer>
		);
	}
}

export default DashboardActivity;
