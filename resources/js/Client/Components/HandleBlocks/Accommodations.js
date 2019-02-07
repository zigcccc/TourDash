import React, { Component } from "react";
import { connect } from "react-redux";
import { getAccommodations } from "../../Store/Actions/AccommodationsActions";
import styled from "styled-components";
import Swiper from "react-id-swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccommodationCard from "../AccommodationCard";

const params = {
	pagination: {
		el: ".swiper-pagination",
		dynamicBullets: true,
		clickable: true
	},
	loop: true,
	autoplay: {
		delay: 5500,
		disableOnInteraction: true
	},
	spaceBetween: 20
};

class Accommodations extends Component {
	componentDidMount() {
		const { accommodations, getAccommodations } = this.props;
		if (accommodations.data.length === 0) {
			getAccommodations(this.props.data.sortBy);
		}
	}
	render() {
		const { accommodations } = this.props;
		if (accommodations.loading || accommodations.data.length === 0) {
			return (
				<LoadingContainer>
					<FontAwesomeIcon icon="circle-notch" spin size="2x" />
				</LoadingContainer>
			);
		} else {
			return (
				<AccommodationsContainer>
					<Swiper
						containerClass="swiper-container-padding"
						{...params}
						slidesPerView={this.props.data.amountPerSlide}
						spaceBetween={20}
						breakPoints={{
							768: {
								slidesPerView: 1,
								spaceBetween: 0
							}
						}}
					>
						{accommodations.data.map(accommodation => (
							<AccommodationCard
								key={accommodation.id}
								accommodation={accommodation}
								isSlide
							/>
						))}
					</Swiper>
				</AccommodationsContainer>
			);
		}
	}
}

const mapStateToProps = state => ({
	accommodations: state.accommodations
});

const mapDispatchToProps = { getAccommodations };

const LoadingContainer = styled.div`
	width: 100%;
	height: 550px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const AccommodationsContainer = styled.div`
	margin: 45px 0;
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Accommodations);
