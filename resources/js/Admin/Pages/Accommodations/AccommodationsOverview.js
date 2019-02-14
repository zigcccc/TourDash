import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
	getAccommodations,
	searchAccommodations,
	clearMessages,
	deleteAccommodation
} from "../../Store/Actions/AccommodationsActions";
import _times from "lodash/times";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as BloomerButton } from "bloomer";
import { PageWrapper, CenteredItem } from "../../Components/Layout";
import MainCta from "../../../Shared/Components/MainCta";
import CardBase from "../../Components/Card";
import CardDropdown from "../../Components/CardDropdown";
import Snackbar from "../../../Shared/Components/Snackbar";
import { Spacer } from "../../Components/Helpers";
import { StatusGroup, StatusIndicator } from "../../Components/SiteStatus";
import OverviewTable from "../../Components/OverviewTable";
import ResultNotFound from "../../Components/ResultNotFound";

class AccommodationsOverview extends Component {
	constructor(props) {
		super(props);
		this.clearLocationSuccess = this.clearLocationSuccess.bind(this);
		this.fetchPages = this.fetchPages.bind(this);
		this.deleteAccommodation = this.deleteAccommodation.bind(this);
		this.searchAccommodations = this.searchAccommodations.bind(this);
	}

	componentDidMount() {
		this.props.getAccommodations();
	}

	clearLocationSuccess() {
		const { history, location } = this.props;
		history.replace(location.pathname);
	}

	fetchPages(page) {
		this.props.getAccommodations(page);
	}

	deleteAccommodation(accommodationId) {
		const { deleteAccommodation } = this.props;
		deleteAccommodation(accommodationId);
	}

	searchAccommodations(query) {
		if (query.length === 0) {
			this.props.getAccommodations();
		} else {
			this.props.searchAccommodations(query);
		}
	}

	parseDate(date) {
		const dateObj = new Date(date);
		return `${dateObj.getDate()}. ${dateObj.getMonth() +
			1}. ${dateObj.getFullYear()}`;
	}

	render() {
		const { accommodations, location } = this.props;

		return (
			<PageWrapper
				pageTitle="Vse namestitve"
				hasSearchForm={true}
				onSearch={this.searchAccommodations}
				searchPlaceholder="Išči med namestitvami..."
			>
				<Snackbar
					purpose="success"
					position="top"
					style={{ top: "120px" }}
					isOpen={location.state && location.state.success.length > 0}
					message={location.state ? location.state.success : ""}
				/>
				<Snackbar
					purpose="success"
					position="top"
					style={{ top: "120px" }}
					isOpen={accommodations.hasSuccess}
					message={accommodations.successMessage}
					hasDissmissAction={true}
					dissmissAction={this.props.clearMessages}
				/>
				<Snackbar
					purpose="error"
					position="top"
					style={{ top: "120px" }}
					isOpen={accommodations.hasErrors}
					message={accommodations.errorMessage}
					hasDissmissAction={true}
					dissmissAction={this.props.clearMessages}
				/>
				<Card>
					<CardDropdown minWidth="200px">
						<Link to="/accommodations/add/">
							Dodaj novo namestitev
							<Spacer />
							<FontAwesomeIcon icon="home" />
						</Link>
					</CardDropdown>
					{accommodations.loading ? (
						<CenteredItem>
							<Spinner icon="circle-notch" spin size="2x" />
						</CenteredItem>
					) : accommodations.data.length > 0 ? (
						<OverviewTable>
							<thead>
								<tr>
									<th>Naziv namestitve</th>
									<th>Avtor</th>
									<th>Datum objave</th>
									<th>Stanje nastanitve</th>
									<th />
									<th />
								</tr>
							</thead>
							<tbody>
								{accommodations.data.map(accommodation => (
									<TableRow key={accommodation.id}>
										<TitleField>
											<FeaturedImageContainer>
												<img
													src={accommodation.featured_image.thumbnail}
													alt={accommodation.title}
												/>
											</FeaturedImageContainer>
											<Link to={`/accommodations/edit/${accommodation.id}`}>
												{accommodation.title}
											</Link>
										</TitleField>
										<NameField>
											{accommodation.author.avatar ? (
												<AvatarContainer>
													<img
														src={
															"/images/uploads/" + accommodation.author.avatar
														}
														alt={accommodation.author.name}
													/>
												</AvatarContainer>
											) : (
												<AvatarContainerPlaceholder>
													<FontAwesomeIcon icon="user" size="lg" />
												</AvatarContainerPlaceholder>
											)}
											{accommodation.author.name}
										</NameField>
										<OnlyDesktopField>
											{this.parseDate(accommodation.created_at)}
										</OnlyDesktopField>
										<td>
											<StatusGroup>
												<StatusIndicator
													status={accommodation.visible ? "success" : "error"}
												/>
												{accommodation.visible ? "objavljena" : "skrita"}
											</StatusGroup>
										</td>
										<ActionField className="hidden-mobile">
											<EditButton
												onClick={() =>
													this.props.history.push(
														`/accommodations/edit/${accommodation.id}`
													)
												}
											>
												<FontAwesomeIcon icon="pencil-alt" size="1x" />
											</EditButton>
										</ActionField>
										<ActionField>
											<DeleteButton
												onClick={() =>
													this.deleteAccommodation(accommodation.id)
												}
											>
												{accommodations.deleteAction.loading &&
												accommodations.deleteAction.accommodation ===
													accommodation.id ? (
													<FontAwesomeIcon icon="circle-notch" spin size="1x" />
												) : (
													<FontAwesomeIcon icon="trash-alt" size="1x" />
												)}
											</DeleteButton>
										</ActionField>
									</TableRow>
								))}
							</tbody>
						</OverviewTable>
					) : (
						<ResultNotFound
							action="/accommodations/add/"
							actionText="dodaj novo namestitev"
						/>
					)}
				</Card>
			</PageWrapper>
		);
	}
}

AccommodationsOverview.propTypes = {};

const Card = styled(CardBase)`
	margin-top: 45px;
	min-height: calc(100vh - 200px);
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 768px) {
		margin-top: 30px;
		min-height: calc(100vh - 200px);
		padding: 20px 0;
	}
`;

const Spinner = styled(FontAwesomeIcon)`
	color: ${props => props.theme.mainColor};
`;

const TableRow = styled.tr`
	td {
		padding-top: 15px;
		padding-bottom: 15px;
		vertical-align: middle;
	}
`;

const OnlyDesktopField = styled.td`
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const TitleField = styled.td`
	display: flex;
	align-items: center;
	a {
		font-size: 1.1rem;
		font-weight: 900;
		color: ${props => props.theme.darkPrimary};
		transition: ${props => props.theme.easeTransition};
		&:hover {
			color: ${props => props.theme.mainColor};
		}
		small {
			font-weight: 400;
			font-size: 0.9rem;
		}
		@media screen and (max-width: 768px) {
			font-size: 1rem;
		}
	}
`;

const NameField = styled(OnlyDesktopField)`
	clear: both;
`;

const ActionField = styled.td`
	width: 20px;
	text-align: center;
	&.hidden-mobile {
		@media screen and (max-width: 768px) {
			display: none;
		}
	}
`;

const AvatarContainer = styled.div`
	border-radius: 50%;
	width: 25px;
	height: 25px;
	overflow: hidden;
	display: flex;
	margin-right: 10px;
	float: left;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const FeaturedImageContainer = styled(AvatarContainer)`
	width: 50px;
	height: 50px;
	box-shadow: ${props => props.theme.defaultShadow};
`;

const AvatarContainerPlaceholder = styled(AvatarContainer)`
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.darkGray};
`;

const ActionButton = styled(BloomerButton)`
	margin-right: auto;
  background-color: transparent;
  font-size: 14px;
  transition ${props => props.theme.easeTransition};
  &:focus {
    &:not(:active) {
      box-shadow: ${props => props.theme.fancyShadow};  
    }
    box-shadow: ${props => props.theme.fancyShadow};
  }
  &:active {
    outline: none;
    box-shadow: ${props => props.theme.fancyShadow};
  }
`;

const DeleteButton = styled(ActionButton)`
	color: ${props => props.theme.colorError};
	border-color: ${props => props.theme.colorError};
	&:focus {
		border-color: ${props => props.theme.colorError};
		color: ${props => props.theme.colorError};
	}
	&:active {
		border-color: ${props => props.theme.colorError};
		color: ${props => props.theme.colorError};
	}
	&:hover {
		color: ${props => props.theme.white};
		background-color: ${props => props.theme.colorError};
		border-color: ${props => props.theme.colorError};
	}
`;

const EditButton = styled(ActionButton)`
	color: ${props => props.theme.mainColor};
	border-color: ${props => props.theme.mainColor};
	&:focus {
		border-color: ${props => props.theme.mainColor};
		color: ${props => props.theme.mainColor};
	}
	&:active {
		border-color: ${props => props.theme.mainColor};
		color: ${props => props.theme.mainColor};
	}
	&:hover {
		color: ${props => props.theme.white};
		background-color: ${props => props.theme.mainColor};
		border-color: ${props => props.theme.mainColor};
	}
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const mapStateToProps = state => ({
	activeUser: state.user.user,
	loadingActiveUser: state.user.loading,
	accommodations: state.accommodations
});

const mapDispatchToProps = {
	deleteAccommodation,
	getAccommodations,
	searchAccommodations,
	clearMessages
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccommodationsOverview);
