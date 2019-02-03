import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
	getPagesPreview,
	getUsersPreview,
	getAccommodationsPreview
} from "../Store/Actions/DashboardActions";
import { Link as RouterLink } from "react-router-dom";
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
		switch (type) {
			case "pages": {
				this.props.getPagesPreview();
				break;
			}
			case "users": {
				this.props.getUsersPreview(4);
				break;
			}
			case "accommodations": {
				this.props.getAccommodationsPreview();
				break;
			}
			default: {
				return null;
			}
		}
	}

	_goToAnalytics() {
		console.log("Going to analytics...");
	}

	componentDidMount() {
		this.props.pages.data.length === 0 && this.props.getPagesPreview();
		this.props.users.data.length === 0 && this.props.getUsersPreview(4);
		this.props.accommodations.data.length === 0 &&
			this.props.getAccommodationsPreview();
	}

	render() {
		const {
			pages,
			users,
			accommodations,
			pagesLoading,
			usersLoading,
			accommodationsLoading
		} = this.props;
		return (
			<PageWrapper pageTitle="Nadzorna plošča">
				<DashboardOverviewColumns>
					<DashboardOverviewColumn>
						<Card
							title="Strani"
							subtitle={pages.count}
							ctaText="dodaj stran"
							ctaAction="pages/add/"
						>
							<CardDropdown>
								<a
									href="#"
									onClick={this._refreshDashboardItem.bind(this, "pages")}
								>
									Osveži
									<Spacer />
									<FontAwesomeIcon icon="redo-alt" />
								</a>
								<RouterLink to="pages/">
									Uredi
									<Spacer />
									<FontAwesomeIcon icon="pencil-alt" />
								</RouterLink>
							</CardDropdown>
							{pagesLoading
								? null
								: pages.data.map((page, i) => (
										<DashboardListItem
											key={page.id}
											title={page.title}
											icon="file"
											author={page.author_name}
											authorAvatar={`/images/uploads/${page.author_avatar}`}
											link={`/pages/edit/${page.id}`}
										/>
								  ))}
							<Link className="minimal-cta" to="/pages/">
								urejanje strani <FontAwesomeIcon icon="long-arrow-alt-right" />
							</Link>
						</Card>
					</DashboardOverviewColumn>
					<DashboardOverviewColumn>
						<Card
							title="Nastanitve"
							subtitle={accommodations.count}
							ctaText="dodaj nastanitev"
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
									Osveži
									<Spacer />
									<FontAwesomeIcon icon="redo-alt" />
								</a>
								<RouterLink to="accommodations/">
									Uredi
									<Spacer />
									<FontAwesomeIcon icon="pencil-alt" />
								</RouterLink>
							</CardDropdown>
							{accommodationsLoading
								? null
								: accommodations.data.map(accommodation => (
										<DashboardListItem
											key={accommodation.id}
											title={accommodation.title}
											icon={accommodation.featured_image || "home"}
											author={accommodation.author_name}
											authorAvatar={
												"/images/uploads/" + accommodation.author_avatar
											}
											link={`/accommodations/edit/${accommodation.id}/`}
										/>
								  ))}
							<Link className="minimal-cta" to="/accommodations/">
								urejanje namestitev{" "}
								<FontAwesomeIcon icon="long-arrow-alt-right" />
							</Link>
						</Card>
					</DashboardOverviewColumn>
					<DashboardOverviewColumn>
						<Card
							title="Uporabniki"
							subtitle={users.count}
							ctaText="vsi uporabniki"
							ctaAction="users/"
						>
							<CardDropdown>
								<a
									href="#"
									onClick={this._refreshDashboardItem.bind(this, "users")}
								>
									Osveži
									<Spacer />
									<FontAwesomeIcon icon="redo-alt" />
								</a>
								<RouterLink to="users/">
									Uredi
									<Spacer />
									<FontAwesomeIcon icon="pencil-alt" />
								</RouterLink>
							</CardDropdown>
							{usersLoading
								? null
								: users.data.map(user => (
										<DashboardListItem
											key={user.id}
											title={user.name}
											icon={user.avatar || "user"}
											author={user.roles[0].name}
										/>
								  ))}
						</Card>
					</DashboardOverviewColumn>
				</DashboardOverviewColumns>
				<DashboardDetailsColumns>
					<ActivityColumn isSize="1/2">
						<SectionTitle text="Aktivnosti" />
						<DashboardActivity />
					</ActivityColumn>
					<AnalyticsColumn isSize="1/2">
						<SectionTitle text="Analitika" />
						<AnalyticsTile isAncestor>
							<Tile isParent isVertical isSize="1/2">
								<Tile
									isChild
									render={props => (
										<DashboardAnalytics
											type="pageviews"
											title="Ogledi strani"
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
											title="Naprave"
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
											title="Obiskovalci"
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
											title="Ogledi strani"
											subtitle="po državah"
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
							text="VSA ANALITIKA"
							fontSize={14}
						/>
					</AnalyticsColumn>
				</DashboardDetailsColumns>
			</PageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	pages: state.dashboard.pages,
	users: state.dashboard.users,
	accommodations: state.dashboard.accommodations,
	pagesLoading: state.dashboard.pagesLoading,
	usersLoading: state.dashboard.usersLoading,
	accommodationsLoading: state.dashboard.accommodationsLoading
});

const mapDispatchToProps = {
	getPagesPreview,
	getUsersPreview,
	getAccommodationsPreview
};

const DashboardOverviewColumns = styled(BloomerColumns)`
	margin-top: 30px;
`;

const DashboardOverviewColumn = styled(BloomerColumn)`
	display: flex;
	@media screen and (max-width: 1150px) {
		margin-bottom: 20px;
	}
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
			@media screen and (max-width: 768px) {
				padding-right: 0;
			}
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
