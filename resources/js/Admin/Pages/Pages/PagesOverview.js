import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
	getPages,
	deletePage,
	searchPage
} from "../../Store/Actions/PagesActions";
import _times from "lodash/times";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as BloomerButton } from "bloomer";
import { PageWrapper, CenteredItem } from "../../Components/Layout";
import CardBase from "../../Components/Card";
import CardDropdown from "../../Components/CardDropdown";
import Snackbar from "../../../Shared/Components/Snackbar";
import { Spacer } from "../../Components/Helpers";
import Pagination from "../../Components/Pagination";
import {
	StatusGroup,
	StatusIndicator as StatusIndicatorBase
} from "../../Components/SiteStatus";
import OverviewTable from "../../Components/OverviewTable";
import ResultNotFound from "../../Components/ResultNotFound";

class PagesOverview extends Component {
	constructor(props) {
		super(props);
		this.clearLocationSuccess = this.clearLocationSuccess.bind(this);
		this.fetchPages = this.fetchPages.bind(this);
		this.deletePage = this.deletePage.bind(this);
		this.searchPages = this.searchPages.bind(this);
	}

	componentDidMount() {
		this.props.getPages();
	}

	clearLocationSuccess() {
		const { history, location } = this.props;
		history.replace(location.pathname);
	}

	fetchPages(page) {
		this.props.getPages(page);
	}

	deletePage(pageId) {
		const { deletePage } = this.props;
		deletePage(pageId);
	}

	async searchPages(query) {
		if (query.length === 0) {
			this.props.getPages();
		} else {
			this.props.searchPage(query);
		}
	}

	parseDate(date) {
		const dateObj = new Date(date);
		return `${dateObj.getDate()}. ${dateObj.getMonth() +
			1}. ${dateObj.getFullYear()}`;
	}

	render() {
		const { pages, location } = this.props;

		return (
			<PageWrapper
				pageTitle="Vse strani"
				hasSearchForm={true}
				onSearch={this.searchPages}
				searchPlaceholder="Išči med stranmi..."
			>
				<Snackbar
					purpose="success"
					position="top"
					style={{ top: "120px" }}
					isOpen={location.state && location.state.success.length > 0}
					message={location.state ? location.state.success : ""}
				/>
				<Card>
					<CardDropdown minWidth="200px">
						<Link to="/pages/add/">
							Dodaj novo stran
							<Spacer />
							<FontAwesomeIcon icon="file" />
						</Link>
					</CardDropdown>
					{pages.loading ? (
						<CenteredItem>
							<Spinner icon="circle-notch" spin size="2x" />
						</CenteredItem>
					) : pages.pages.data.length > 0 ? (
						<OverviewTable>
							<thead>
								<tr>
									<th>Naslov strani</th>
									<th>URL</th>
									<th>Avtor</th>
									<th>Datum objave</th>
									<th>Stanje strani</th>
									<th />
									<th />
								</tr>
							</thead>
							<tbody>
								{pages.pages.data.map(page => (
									<TableRow key={page.id}>
										<TitleField>
											<Link to={`/pages/edit/${page.id}`}>
												{page.title}
												{page.type === "naslovnica" ? (
													<small> - domača stran</small>
												) : null}
											</Link>
										</TitleField>
										<UrlField>
											<a href={`/${page.slug}`} target="_blank">
												/{page.slug}
											</a>
										</UrlField>
										<NameField>
											{page.author.avatar ? (
												<AvatarContainer>
													<img
														src={"/images/uploads/" + page.author.avatar}
														alt={page.author.name}
													/>
												</AvatarContainer>
											) : (
												<AvatarContainerPlaceholder>
													<FontAwesomeIcon icon="user" size="lg" />
												</AvatarContainerPlaceholder>
											)}
											<PageAuthor>{page.author.name}</PageAuthor>
										</NameField>
										<OnlyDesktopField>
											{this.parseDate(page.created_at)}
										</OnlyDesktopField>
										<td>
											<StatusGroup>
												<StatusIndicator
													status={
														page.status === "published" ? "success" : "error"
													}
												/>
												<PageAuthor>
													{page.status === "published"
														? "objavljena"
														: "skrita"}
												</PageAuthor>
											</StatusGroup>
										</td>
										<ActionField>
											<EditButton
												onClick={() =>
													this.props.history.push(`/pages/edit/${page.id}`)
												}
											>
												<FontAwesomeIcon icon="pencil-alt" size="1x" />
											</EditButton>
										</ActionField>
										<ActionField>
											<DeleteButton onClick={() => this.deletePage(page.id)}>
												{pages.deleteAction.loading &&
												pages.deleteAction.page === page.id ? (
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
							action="/pages/add/"
							actionText="dodaj novo stran"
						/>
					)}
					{pages.pages.totalPages > 1 && (
						<Fragment>
							<Spacer />
							<Pagination
								currentPage={pages.pages.currentPage}
								totalPages={pages.pages.totalPages}
								isFirstPage={pages.pages.isFirstPage}
								isLastPage={pages.pages.isLastPage}
								fetchNewPage={this.fetchPages}
							/>
						</Fragment>
					)}
				</Card>
			</PageWrapper>
		);
	}
}

PagesOverview.propTypes = {
	activeUser: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		email: PropTypes.string,
		avatar: PropTypes.string,
		role: PropTypes.oneOf(["admin", "superadmin"])
	}),
	users: PropTypes.shape({
		data: PropTypes.array,
		isLastPage: PropTypes.bool,
		isFirstPage: PropTypes.bool,
		totalPages: PropTypes.number,
		currentPage: PropTypes.number
	})
};

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

const StatusIndicator = styled(StatusIndicatorBase)`
	@media screen and (max-width: 768px) {
		margin-right: 0;
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

const TitleField = styled.td`
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
	}
`;

const PageAuthor = styled.span`
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const OnlyDesktopField = styled.td`
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const UrlField = styled(OnlyDesktopField)`
	a {
		font-family: monospace;
		color: ${props => props.theme.heavyGray};
		transition: ${props => props.theme.easeTransition};
		&:hover {
			color: ${props => props.theme.mainColor};
		}
	}
`;

const NameField = styled(OnlyDesktopField)`
	clear: both;
`;

const ActionField = styled.td`
	width: 20px;
	text-align: center;
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
	pages: state.pages
});

const mapDispatchToProps = { getPages, deletePage, searchPage };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PagesOverview);
