import React, { Component, Fragment } from "react";
import styled from "styled-components";
import _times from "lodash/times";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as BloomerButton } from "bloomer";
import { PageWrapper, CenteredItem } from "../../Components/Layout";
import CardBase from "../../Components/Card";
import { StatusGroup, StatusIndicator } from "../../Components/SiteStatus";
import OverviewTable from "../../Components/OverviewTable";
import ResultNotFound from "../../Components/ResultNotFound";
import Pagination from "../../Components/Pagination";
import MainCtaBase from "../../../Shared/Components/MainCta";
import { Spacer } from "../../Components/Helpers";

class ReviewsOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
			isLastPage: true,
			isFirstPage: true,
			totalPages: 1,
			currentPage: 1,
			loading: true,
			deleteAction: {
				loading: false,
				reviewId: null
			}
		};
		this.getReviews = this.getReviews.bind(this);
		this.deleteReview = this.deleteReview.bind(this);
		this.approveReview = this.approveReview.bind(this);
	}

	getReviews(page) {
		axios.get(`/api/reviews?page=${page}`).then(res => {
			const { data, meta } = res.data;
			this.setState({
				...this.state,
				isLastPage: meta.last_page === meta.currentPage,
				isFirstPage: meta.first_page === 1,
				reviews: data,
				totalPages: meta.last_page,
				loading: false,
				currentPage: meta.current_page
			});
		});
	}

	componentDidMount() {
		this.getReviews(1);
	}

	fetchReviews(page) {
		this.getReviews(page);
	}

	deleteReview(reviewId) {
		this.setState({
			...this.state,
			deleteAction: {
				loading: true,
				reviedId: reviewId
			}
		});
		axios
			.delete(`/api/reviews/${reviewId}`)
			.then(() => {
				this.getReviews();
				this.setState({
					...this.state,
					deleteAction: {
						loading: false,
						reviewId: null
					}
				});
			})
			.catch(err => console.log(err));
	}

	approveReview(reviewId) {
		axios
			.put(`/api/reviews/${reviewId}`)
			.then(() => {
				this.getReviews();
			})
			.catch(err => console.log(err));
	}

	render() {
		const {
			reviews,
			loading,
			deleteAction,
			totalPages,
			isLastPage,
			isFirstPage,
			currentPage
		} = this.state;
		return (
			<PageWrapper pageTitle="Mnenja gostov">
				<Card>
					{loading ? (
						<CenteredItem>
							<Spinner icon="circle-notch" spin size="2x" />
						</CenteredItem>
					) : reviews.length > 0 ? (
						<OverviewTable className="no-margin-mobile">
							<thead>
								<tr>
									<th>Avtor</th>
									<th>Ocena</th>
									<th>Mnenje</th>
									<th>Odobreno?</th>
									<th />
								</tr>
							</thead>
							<tbody>
								{reviews.map(review => (
									<TableRow key={review.id}>
										<NameField>
											{review.author.avatar ? (
												<AvatarContainer>
													<img
														src={"/images/uploads/" + review.author.avatar}
														alt={review.author.name}
													/>
												</AvatarContainer>
											) : (
												<AvatarContainerPlaceholder>
													<FontAwesomeIcon icon="user" size="lg" />
												</AvatarContainerPlaceholder>
											)}
											{review.author.name}
										</NameField>
										<td>
											<StarsContainer>
												{_times(Math.floor(review.rating)).map((v, i) => {
													return <FontAwesomeIcon key={i} icon="star" />;
												})}
												{review.rating - Math.floor(review.rating) !== 0 ? (
													<FontAwesomeIcon icon="star-half-alt" />
												) : null}
												{_times(5 - Math.ceil(review.rating)).map((v, i) => {
													return (
														<FontAwesomeIcon
															key={i}
															icon="star"
															className="disabled"
														/>
													);
												})}
											</StarsContainer>
										</td>
										<OnlyDesktopField>{review.review}</OnlyDesktopField>
										<td>
											{review.approved ? (
												<StatusGroup>
													<StatusIndicator status="success" />
													odobreno
												</StatusGroup>
											) : (
												<MainCta
													handleClick={() => this.approveReview(review.id)}
													text="odobri"
													fontSize={12}
												/>
											)}
										</td>
										<ActionField>
											<DeleteButton
												onClick={() => this.deleteReview(review.id)}
											>
												{deleteAction.loading &&
												deleteAction.reviewId === review.id ? (
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
						<ResultNotFound heading="Nobeno mnenje še ni bilo zabeleženo..." />
					)}
					{totalPages > 1 && (
						<Fragment>
							<Spacer />
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								isFirstPage={isFirstPage}
								isLastPage={isLastPage}
								fetchNewPage={this.fetchReviews}
							/>
						</Fragment>
					)}
				</Card>
			</PageWrapper>
		);
	}
}

const MainCta = styled(MainCtaBase)`
	margin: 0;
	min-width: unset;
`;

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
	@media screen and (max-width: 768px) {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid ${props => props.theme.lightGray};
		margin: 20px 0;
		padding-bottom: 20px;
		&:last-of-type {
			border-bottom: 0;
		}
	}
	td {
		padding-top: 15px;
		padding-bottom: 15px;
		vertical-align: middle;
		@media screen and (max-width: 768px) {
			width: 100%;
			text-align: center;
			border: none;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;

const OnlyDesktopField = styled.td`
	@media screen and (max-width: 768px) {
		display: none;
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
	justify-content: center;
	align-items: center;
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
	@media screen and (max-width: 768px) {
		margin-right: 0;
	}
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
`;

const StarsContainer = styled.div`
	svg {
		color: ${props => props.theme.colorWarning};
		&.disabled {
			opacity: 0.25;
			color: ${props => props.theme.darkGray};
		}
	}
	@media screen and (max-width: 768px) {
		margin-top: 7px;
	}
`;

export default ReviewsOverview;
