import React, { Component, Fragment } from "react";
import styled from "styled-components";
import classNames from "classnames";
import _findIndex from "lodash/findIndex";
import { connect } from "react-redux";
import { getAccommodations } from "../Store/Actions/AccommodationsActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageHeader from "../Components/PageHeader";
import { Container as ContainerBase, Title, Columns, Column } from "bloomer";
import Swiper from "react-id-swiper";

class SingleAccommodation extends Component {
	componentDidMount() {
		const { accommodations, getAccommodations } = this.props;
		accommodations.data.length <= 0 && getAccommodations();
	}
	render() {
		const { accommodations, accommodationId } = this.props;
		const accommodationIndex = _findIndex(accommodations.data, {
			id: accommodationId
		});
		const accommodation = accommodations.data[accommodationIndex];
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
	accommodations: state.accommodations
});

const mapDispatchToProps = { getAccommodations };

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

const AccommodationType = styled.span`
	padding: 0.5em 1.5em;
	font-size: 0.9rem;
	font-weight: bold;
	border-radius: 200px;
	color: white;
	background-color: ${props => props.theme.mainColor};
	margin-bottom: 20px;
	display: inline-block;
`;

const Card = styled.div`
	box-shadow: ${props => props.theme.fancyShadow};
	padding: 20px;
	border-radius: 5;
	display: flex;
	flex-direction: column;
	align-items: center;
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
