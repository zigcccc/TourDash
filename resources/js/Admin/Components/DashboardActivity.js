import React, { Component } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import _reject from "lodash/reject";
import DashboardActivityListItem from "./DashboardActivityListItem";
import MainCtaBase from "../../Shared/Components/MainCta";

const DashboardActivityContainer = styled(Card)`
	margin-top: 20px;
	padding: 20px 15px 15px;
`;

const NoActivitiesContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	img {
		width: 50px;
		height: 50px;
	}
	h3 {
		font-weight: bold;
		font-size: 22px;
		margin-top: 10px;
	}
	p {
		font-size: 14px;
	}
`;

const MainCta = styled(MainCtaBase)`
	min-width: 150px;
	margin-top: 20px;
	margin-bottom: 10px;
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
			activities: [...dummyActivities],
			loading: false
		};
	}

	_deleteActivity(activity, e) {
		e.preventDefault();

		this.setState({
			activities: _reject(this.state.activities, activity)
		});
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

	_refreshActivities() {
		this.setState({ loading: true });
		setTimeout(() => {
			this.setState({
				activities: dummyActivities,
				loading: false
			});
		}, 1000);
	}

	render() {
		const { loading } = this.state;
		return (
			<DashboardActivityContainer>
				{this.state.activities.length > 0 ? (
					this.state.activities.map(activity => (
						<DashboardActivityListItem
							key={activity.id}
							activity={activity}
							deleteActivity={this._deleteActivity.bind(this, activity)}
							approveReview={this._approveReview.bind(this, activity.id)}
							dennyReview={this._dennyReview.bind(this, activity.id)}
							replyToMessage={this._replyToMessage.bind(this, activity.id)}
							deleteMessage={this._deleteMessage.bind(this, activity.id)}
						/>
					))
				) : (
					<NoActivitiesContainer>
						<img
							src="/images/wink.svg"
							alt="You are up to date with activities"
						/>
						<h3>Ni novih aktivnosti.</h3>
						<p>Super, si na tekočem z dogajanjem na strani!</p>
						<MainCta
							text="osveži"
							handleClick={this._refreshActivities.bind(this)}
							fontSize={14}
							isLoading={loading}
						/>
					</NoActivitiesContainer>
				)}
			</DashboardActivityContainer>
		);
	}
}

export default DashboardActivity;
