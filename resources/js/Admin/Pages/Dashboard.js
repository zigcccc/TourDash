import React, { Component } from "react";
import { withRouter, Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { PageWrapper } from "../Components/Layout";
import {
	Columns as BloomerColumns,
	Column as BloomerColumn,
	Tile
} from "bloomer";
import Card from "../Components/Card";
import CardDropdown from "../Components/CardDropdown";
import { Spacer } from "../Components/Helpers";
import DashboardListItem from "../Components/DashboardListItem";
import DashboardActivity from "../Components/DashboardActivity";
import DashboardAnalytics from "../Components/DashboardAnalytics";
import InvertedCtaBase from "../../Shared/Components/InvertedCta";
import { SectionTitle } from "../Components/Typography";

const DashboardOverviewColumns = styled(BloomerColumns)`
	margin-top: 30px;
`;

const DashboardOverviewColumn = styled(BloomerColumn)`
	display: flex;
`;

const DashboardDetailsColumns = styled(BloomerColumns)`
	margin-top: 50px;
`;

const ActivityColumn = styled(BloomerColumn)``;

const AnalyticsColumn = styled(BloomerColumn)``;

const AnalyticsTile = styled(Tile)`
	&.is-ancestor {
		margin-left: 0;
		margin-right: 0;
		margin-top: 20px;
	}
	.tile.is-parent {
		padding: 0 8px 0;
		:first-of-type {
			padding-left: 0;
		}
		:last-of-type {
			padding-right: 0;
		}
	}
`;

const Link = styled(RouterLink)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 200;
	color: ${props => props.theme.darkPrimary};
	margin: 20px 0;
	:hover {
		svg {
			transform: translate(5px, 1px);
		}
	}
	svg {
		margin-left: 0.45em;
		transform: translate(0, 1px);
		transition: ${props => props.theme.easeTransition};
	}
`;

const InvertedCta = styled(InvertedCtaBase)`
	text-transform: uppercase;
`;

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			today: moment()
				.locale("sl")
				.format("Do MM."),
			oneWeekFromNow: moment()
				.add(7, "days")
				.locale("sl")
				.format("Do MM.")
		};
		this.pagesPane = React.createRef();
		this.accommodationsPane = React.createRef();
		this.postsPane = React.createRef();
	}

	_refreshDashboardItem(type, e) {
		e.preventDefault();
		console.log(`Refreshing ${type}...`);
	}

	_goToSubpage(page, e) {
		const { history } = this.props;
		e.preventDefault();
		history.push(page + "/");
	}

	_goToAnalytics() {
		console.log("Going to analytics...");
	}

	render() {
		return (
			<PageWrapper pageTitle="Dashboard">
				<DashboardOverviewColumns>
					<DashboardOverviewColumn>
						<Card
							title="Pages"
							subtitle="6"
							ctaText="add new"
							ctaAction="pages/add/"
						>
							<CardDropdown>
								<a
									href="#"
									onClick={this._refreshDashboardItem.bind(this, "pages")}
								>
									Refresh
									<Spacer />
									<FontAwesomeIcon icon="redo-alt" />
								</a>
								<a href="#" onClick={this._goToSubpage.bind(this, "pages")}>
									Manage
									<Spacer />
									<FontAwesomeIcon icon="pencil-alt" />
								</a>
							</CardDropdown>
							<DashboardListItem
								title="Home"
								icon="file"
								author="Peter Finch"
								authorAvatar="/images/avatar_alt.png"
								link="/pages/home"
							/>
							<DashboardListItem
								title="About Us"
								icon="file"
								author="Žiga Krašovec"
								authorAvatar="/images/avatar.png"
								link="/pages/about-us"
							/>
							<DashboardListItem
								title="Book a room"
								icon="file"
								author="Peter Finch"
								authorAvatar="/images/avatar_alt.png"
								link="/pages/book-a-room"
							/>
							<Link className="minimal-cta" to="/pages/">
								manage pages <FontAwesomeIcon icon="long-arrow-alt-right" />
							</Link>
						</Card>
					</DashboardOverviewColumn>
					<DashboardOverviewColumn>
						<Card
							title="Accommodations"
							subtitle="9"
							ctaText="add new"
							ctaAction="accommodations/add/"
						>
							<CardDropdown>
								<a
									href="#"
									onClick={this._refreshDashboardItem.bind(
										this,
										"accommodations"
									)}
								>
									Refresh
									<Spacer />
									<FontAwesomeIcon icon="redo-alt" />
								</a>
								<a
									href="#"
									onClick={this._goToSubpage.bind(this, "accommodations")}
								>
									Manage
									<Spacer />
									<FontAwesomeIcon icon="pencil-alt" />
								</a>
							</CardDropdown>
							<DashboardListItem
								title="King Bed"
								icon="home"
								author="Peter Finch"
								authorAvatar="/images/avatar_alt.png"
								link="/accommodations/king-bed/"
							/>
							<DashboardListItem
								title="Elite Suite"
								icon="home"
								author="Žiga Krašovec"
								authorAvatar="/images/avatar.png"
								link="/accommodations/elite-suite/"
							/>
							<DashboardListItem
								title="Suite with Balcony"
								icon="home"
								author="Peter Finch"
								authorAvatar="/images/avatar_alt.png"
								link="/accommodations/suite-with-balcony/"
							/>
							<Link className="minimal-cta" to="/accommodations/">
								manage accommodations{" "}
								<FontAwesomeIcon icon="long-arrow-alt-right" />
							</Link>
						</Card>
					</DashboardOverviewColumn>
					<DashboardOverviewColumn>
						<Card
							title="Posts"
							subtitle="12"
							ctaText="add new"
							ctaAction="posts/add/"
						>
							<CardDropdown>
								<a
									href="#"
									onClick={this._refreshDashboardItem.bind(this, "posts")}
								>
									Refresh
									<Spacer />
									<FontAwesomeIcon icon="redo-alt" />
								</a>
								<a href="#" onClick={this._goToSubpage.bind(this, "posts")}>
									Manage
									<Spacer />
									<FontAwesomeIcon icon="pencil-alt" />
								</a>
							</CardDropdown>
							<DashboardListItem
								title="Novoletna zabava"
								icon="calendar-alt"
								author="Peter Finch"
								authorAvatar="/images/avatar_alt.png"
								link="/posts/novoletna-zabava"
							/>
							<DashboardListItem
								title="Nasveti za izlete"
								icon="thumbtack"
								author="Žiga Krašovec"
								authorAvatar="/images/avatar.png"
								link="/posts/nasveti-za-izlete"
							/>
							<DashboardListItem
								title="Koncert Siddharta"
								icon="calendar-alt"
								author="Peter Finch"
								authorAvatar="/images/avatar_alt.png"
								link="/posts/koncert-siddharta"
							/>
							<Link className="minimal-cta" to="/posts/">
								manage posts <FontAwesomeIcon icon="long-arrow-alt-right" />
							</Link>
						</Card>
					</DashboardOverviewColumn>
				</DashboardOverviewColumns>
				<DashboardDetailsColumns>
					<ActivityColumn isSize="1/2">
						<SectionTitle text="Activity" />
						<DashboardActivity />
					</ActivityColumn>
					<AnalyticsColumn isSize="1/2">
						<SectionTitle text="Analytics" />
						<AnalyticsTile isAncestor>
							<Tile isParent isVertical isSize="1/2">
								<Tile
									isChild
									render={props => (
										<DashboardAnalytics
											type="pageviews"
											title="Page views"
											subtitle="2.309"
											date={{
												from: this.state.today,
												to: this.state.oneWeekFromNow
											}}
											{...props}
										/>
									)}
								/>
								<Tile
									isChild
									render={props => (
										<DashboardAnalytics
											hasMarginTop={true}
											type="devices"
											title="Devices"
											subtitle="dekstop vs mobile"
											date={{
												from: this.state.today,
												to: this.state.oneWeekFromNow
											}}
											{...props}
										/>
									)}
								/>
							</Tile>
							<Tile isParent isVertical isSize="1/2">
								<Tile
									isChild
									render={props => (
										<DashboardAnalytics
											type="visitors"
											title="Visitors"
											subtitle="returning vs new"
											date={{
												from: this.state.today,
												to: this.state.oneWeekFromNow
											}}
											{...props}
										/>
									)}
								/>
								<Tile
									isChild
									render={props => (
										<DashboardAnalytics
											hasMarginTop={true}
											type="countries"
											title="Page views"
											subtitle="by countries"
											date={{
												from: this.state.today,
												to: this.state.oneWeekFromNow
											}}
											{...props}
										/>
									)}
								/>
							</Tile>
						</AnalyticsTile>
						<InvertedCta
							handleClick={this._goToAnalytics.bind(this)}
							text="VISIT ANALYTICS"
							fontSize={14}
						/>
					</AnalyticsColumn>
				</DashboardDetailsColumns>
			</PageWrapper>
		);
	}
}
export default withRouter(Dashboard);
