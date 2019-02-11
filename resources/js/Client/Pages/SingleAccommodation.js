import React, { Component, Fragment } from "react";
import styled from "styled-components";
import classNames from "classnames";
import _findIndex from "lodash/findIndex";
import _isArray from "lodash/isArray";
import { connect } from "react-redux";
import { getAccommodations } from "../Store/Actions/AccommodationsActions";
import { updateSavedItems } from "../Store/Actions/UserActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageHeader from "../Components/PageHeader";
import {
	Container as ContainerBase,
	Title,
	Columns,
	Column,
	Field,
	Label,
	Control,
	Select,
	Input,
	Notification
} from "bloomer";
import Swiper from "react-id-swiper";
import MainCta from "../Components/MainCta";
import Review from "../Components/Review";

class SingleAccommodation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
			newReview: {
				review: "",
				rating: 5
			},
			submiting: false,
			reviewSubmitSuccess: false
		};
		this.setRating = this.setRating.bind(this);
		this.setReview = this.setReview.bind(this);
		this.submitReview = this.submitReview.bind(this);
		this.getAccommodationReviews = this.getAccommodationReviews.bind(this);
	}

	componentDidMount() {
		const { accommodations, getAccommodations } = this.props;
		accommodations.data.length <= 0 && getAccommodations();
		this.getAccommodationReviews();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location !== this.props.location) {
			this.setState(
				{
					...this.state,
					newReview: {
						review: "",
						rating: 5
					},
					reviews: []
				},
				() => {
					this.getAccommodationReviews();
				}
			);
		}
	}

	getAccommodationReviews() {
		const { accommodationId } = this.props;
		axios
			.get(`/api/reviews/${accommodationId}`)
			.then(res => {
				const { data } = res.data;
				this.setState({
					...this.state,
					reviews: data
				});
			})
			.catch(err => console.log(err));
	}

	setRating(e) {
		this.setState({
			newReview: {
				...this.state.newReview,
				rating: e.target.value
			}
		});
	}

	setReview(e) {
		this.setState({
			newReview: {
				...this.state.newReview,
				review: e.target.value
			}
		});
	}

	submitReview() {
		const { user, accommodationId } = this.props;
		this.setState({ submiting: true });
		axios
			.post("/api/reviews", {
				rating: this.state.newReview.rating,
				review: this.state.newReview.review,
				user_id: user.user.id,
				accommodation_id: accommodationId
			})
			.then(res => {
				this.setState({
					...this.state,
					reviewSubmitSuccess: true
				});
			})
			.catch(err => {
				this.setState({ submiting: false });
				console.log(err);
			});
	}

	showLoginPrompt() {
		swal({
			title: "Niste prijavljeni",
			text:
				"Za shranjevanje namestitev morate biti prijavljeni. Prijavite se oziroma ustvarite račun, če računa še nimate.",
			icon: "info",
			buttons: {
				cancel: {
					text: "zapri",
					visible: true
				},
				login: {
					text: "prijavi se"
				},
				register: {
					text: "ustvari račun"
				}
			}
		}).then(value => {
			switch (value) {
				case "login": {
					window.location.href = "/login";
					break;
				}
				case "register": {
					window.location.href = "/register";
					break;
				}
				default: {
					break;
				}
			}
		});
	}

	addToSavedItems(accommodationTitle) {
		const { updateSavedItems, user, accommodationId } = this.props;
		if (!user.user) {
			this.showLoginPrompt();
		}
		const userSavedItems = _isArray(user.user.saved_items)
			? [...user.user.saved_items, accommodationId]
			: [accommodationId];
		updateSavedItems(userSavedItems, user.user.id, accommodationTitle);
	}

	render() {
		const { accommodations, accommodationId, user } = this.props;
		const { reviews, submiting } = this.state;
		const accommodationIndex = _findIndex(accommodations.data, {
			id: accommodationId
		});
		const accommodation = accommodations.data[accommodationIndex];
		let isSaved = false;
		if (user.user) {
			isSaved =
				user.user.saved_items &&
				user.user.saved_items.indexOf(accommodation.id) >= 0;
		}

		return (
			<main>
				<AccommodationContainer
					className={classNames({ loading: accommodations.loading })}
				>
					{accommodations.loading ? (
						<FontAwesomeIcon icon="circle-notch" spin size="2x" />
					) : (
						<Fragment>
							<PageHeader
								title={accommodation.title}
								image={accommodation.featured_image.fullsize}
								pageSlug={accommodation.title}
							/>
							{user && (
								<BookmarkButton
									className={classNames({
										saved: isSaved
									})}
									onClick={this.addToSavedItems.bind(this, accommodation.title)}
								>
									{isSaved ? "Namestitev shranjena" : "Shrani namestitev"}
									<FontAwesomeIcon
										icon={user.saving ? "circle-notch" : "bookmark"}
										spin={user.saving}
									/>
								</BookmarkButton>
							)}
							<Container>
								<section className="section">
									<p className="accommodation-description">
										{accommodation.description}
									</p>
								</section>
								<section className="section">
									<Title tag="h2" isSize={3}>
										Specifikacije
									</Title>
									<Columns>
										<Column isSize="1/3">
											<Card>
												<FontAwesomeIcon icon="users" size="1x" />
												<h3>Število oseb</h3>
												<p className="card-callout">
													{accommodation.num_of_guests}
												</p>
											</Card>
										</Column>
										<Column isSize="1/3">
											<Card>
												<FontAwesomeIcon icon="bed" size="1x" />
												<h3>Število postelj</h3>
												<p className="card-callout">
													{accommodation.num_of_beds}
												</p>
											</Card>
										</Column>
										<Column isSize="1/3">
											<Card>
												<FontAwesomeIcon icon="dollar-sign" size="1x" />
												<h3>Cena na noč</h3>
												<p className="card-callout">{accommodation.price}€</p>
											</Card>
										</Column>
									</Columns>
								</section>
								<section className="section">
									<Title tag="h2" isSize={3}>
										Galerija namestitve
									</Title>
									<Swiper
										pagination={{
											el: ".swiper-pagination",
											dynamicBullets: true,
											clickable: true
										}}
										loop={true}
										autoplay={{
											delay: 5500,
											disableOnInteraction: true
										}}
										slidesPerView={3}
										spaceBetween={20}
										breakPoints={{
											768: {
												slidesPerView: 1,
												spaceBetween: 0
											}
										}}
									>
										{accommodation.gallery.map(item => (
											<GalleryItem key={item.medium}>
												<img
													src={item.medium}
													alt={accommodation.title}
													key={item.medium}
												/>
											</GalleryItem>
										))}
									</Swiper>
								</section>
								<section className="section">
									<Title tag="h2" isSize={3}>
										Kaj namestitev ponuja
									</Title>
									<Columns isMultiline>
										{accommodation.features.map(feature => (
											<Column isSize="1/4" key={feature.name}>
												<FeatureContainer>
													<FontAwesomeIcon icon={feature.icon} size="1x" />
													{feature.name}
												</FeatureContainer>
											</Column>
										))}
									</Columns>
								</section>
								<section className="section">
									<Title tag="h2" isSize={3}>
										Mnenja gostov
									</Title>
									{reviews.length > 0 ? (
										<Swiper
											pagination={{
												el: ".swiper-pagination",
												dynamicBullets: true,
												clickable: true
											}}
											loop={this.state.reviews.length > 1}
											autoplay={{
												delay: 5500,
												disableOnInteraction: true
											}}
											slidesPerView={1}
											spaceBetween={20}
										>
											{reviews.map(review => (
												<Review review={review} key={review.id} />
											))}
										</Swiper>
									) : (
										<p className="centered">Ta namestitev še nima mnenj...</p>
									)}
									{user.user &&
										reviews.filter(review => review.author.id === user.user.id)
											.length === 0 && (
											<Fragment>
												<Title tag="h5" isSize={5}>
													Dodaj mnenje
												</Title>
												{this.state.reviewSubmitSuccess ? (
													<Notification isColor="success">
														Mnenje uspešno oddano! Hvala za vaš čas.
													</Notification>
												) : (
													<Fragment>
														<Columns>
															<Column isSize={2}>
																<Field>
																	<Label>Ocena*</Label>
																	<Control>
																		<Select
																			value={this.state.newReview.rating}
																			onChange={this.setRating}
																		>
																			<option value="1">1</option>
																			<option value="2">2</option>
																			<option value="3">3</option>
																			<option value="4">4</option>
																			<option value="5">5</option>
																		</Select>
																	</Control>
																</Field>
															</Column>
															<Column isSize={10}>
																<Field>
																	<Label>Mnenje</Label>
																	<Control>
																		<Input
																			type="text"
																			placeholder="Vaše mnenje o namestitvi"
																			value={this.state.newReview.review}
																			onChange={this.setReview}
																		/>
																	</Control>
																</Field>
															</Column>
														</Columns>
														<div
															style={{
																display: "flex",
																justifyContent: "center"
															}}
														>
															<MainCta
																text="Dodaj mnenje"
																handleClick={this.submitReview}
																fontSize={14}
																isLoading={submiting}
															/>
														</div>
													</Fragment>
												)}
											</Fragment>
										)}
								</section>
								<section className="section">
									<Title tag="h2" isSize={3}>
										Opis namestitve
									</Title>
									<p className="accommodation-presentation">
										{accommodation.content}
									</p>
								</section>
							</Container>
						</Fragment>
					)}
				</AccommodationContainer>
			</main>
		);
	}
}

const mapStateToProps = state => ({
	accommodations: state.accommodations,
	user: state.user
});

const mapDispatchToProps = { getAccommodations, updateSavedItems };

const AccommodationContainer = styled.div`
	min-height: calc(100vh - 75px);
	color: ${props => props.theme.dark};
	&.loading {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const Container = styled(ContainerBase)`
	padding: 45px 0 45px;
	&.container {
		max-width: 960px;
	}
	.accommodation-description {
		padding: 0 1em;
		font-size: 1.15rem;
		color: ${props => props.theme.dark};
		font-family: ${props => props.theme.textFont};
	}
	.accommodation-presentation {
		padding: 0 1em;
		color: ${props => props.theme.dark};
		font-family: ${props => props.theme.textFont};
		line-height: 1.618;
	}
	h5 {
		margin-top: 35px;
	}
	.title {
		font-family: ${props => props.theme.headingFont};
	}
	.swiper-container {
		padding: 20px 0;
	}
	.swiper-pagination {
		transform: translateX(-50%) translateY(10px) !important;
		.swiper-pagination-bullet {
			background: ${props => props.theme.dark} !important;
		}
	}
`;

const BookmarkButton = styled.div`
	display: flex;
	background-color: ${props => props.theme.dark};
	border-radius: 200px;
	padding: 0.5em 1.25em;
	color: ${props => props.theme.light};
	align-items: center;
	box-shadow: ${props => props.theme.lightShadow};
	position: absolute;
	top: 420px;
	left: 50%;
	transform: translate(-50%, 0);
	transition: ${props => props.theme.easeTransition};
	svg {
		margin-left: 10px;
	}
	font-weight: bold;
	&:hover {
		cursor: pointer;
		background-color: ${props => props.theme.mainColor};
	}
	&.saved {
		background-color: ${props => props.theme.mainColor};
	}
`;

const Card = styled.div`
	box-shadow: ${props => props.theme.fancyShadow};
	padding: 20px;
	border-radius: 5;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	svg {
		color: ${props => props.theme.mainColor};
		font-size: 2rem;
		margin-bottom: 20px;
	}
	h3 {
		color: ${props => props.theme.dark};
	}
	.card-callout {
		font-size: 3rem;
		font-family: ${props => props.theme.headingFont};
		font-weight: bold;
	}
`;

const GalleryItem = styled.div`
	height: 250px;
	display: flex;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

const FeatureContainer = styled.div`
	border: 1px solid ${props => props.theme.dark};
	border-radius: 5px;
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: ${props => props.theme.textFont};
	svg {
		margin-right: 10px;
	}
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleAccommodation);
