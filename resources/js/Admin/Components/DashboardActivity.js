import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import _reject from "lodash/reject";
import DashboardActivityListItem from "./DashboardActivityListItem";
import MainCtaBase from "../../Shared/Components/MainCta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardDropdown from "../Components/CardDropdown";
import { Spacer } from "../Components/Helpers";

class DashboardActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: [],
			loading: false,
			isLastPage: true,
			currentPage: 1,
			loading_new_page: false
		};
		this.loadMoreActivities = this.loadMoreActivities.bind(this);
		this.getActivities = this.getActivities.bind(this);
	}

	loadMoreActivities() {
		this.setState({
			loading_new_page: true
		});
		axios
			.get(`/api/activities?page=${this.state.currentPage + 1}`)
			.then(res => {
				const { data, meta } = res.data;
				this.setState({
					activities: [...this.state.activities, ...data],
					loading_new_page: false,
					isLastPage: meta.current_page === meta.last_page,
					currentPage: meta.current_page
				});
			});
	}

	getActivities() {
		this.setState({
			loading: true,
			activities: []
		});
		axios.get("/api/activities").then(res => {
			const { data, meta } = res.data;
			this.setState({
				activities: data,
				loading: false,
				isLastPage: meta.current_page === meta.last_page,
				currentPage: meta.current_page
			});
		});
	}

	componentDidMount() {
		this.getActivities();
	}

	render() {
		const { loading, activities, isLastPage, loading_new_page } = this.state;
		return (
			<DashboardActivityContainer hasOptions>
				<CardDropdown>
					<span onClick={this.getActivities}>
						Osveži
						<Spacer />
						<FontAwesomeIcon icon="redo-alt" />
					</span>
				</CardDropdown>
				{activities.length > 0 ? (
					activities.map(activity => (
						<DashboardActivityListItem key={activity.id} activity={activity} />
					))
				) : (
					<Fragment>
						{loading ? (
							<LoadingContainer>
								<FontAwesomeIcon icon="circle-notch" size="3x" spin />
							</LoadingContainer>
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
									handleClick={this.getActivities}
									fontSize={14}
									isLoading={loading}
								/>
							</NoActivitiesContainer>
						)}
					</Fragment>
				)}
				{!isLastPage && (
					<MainCta
						handleClick={this.loadMoreActivities}
						isLoading={loading_new_page}
						fontSize={14}
						text="Več aktivnosti"
					/>
				)}
			</DashboardActivityContainer>
		);
	}
}

const LoadingContainer = styled.div`
	padding: 75px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${props => props.theme.mainColor};
`;

const DashboardActivityContainer = styled(Card)`
	margin-top: 20px;
	padding: 45px 15px 15px;
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

export default DashboardActivity;
