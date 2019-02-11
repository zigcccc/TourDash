import React, { Component, Fragment } from "react";
import Swiper from "react-id-swiper";
import Review from "../Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

class Reviews extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
			loading: true
		};
	}

	componentDidMount() {
		axios
			.get("/api/reviews/approved")
			.then(res => {
				console.log(res.data);
				this.setState({
					loading: false,
					reviews: res.data.data
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		const { reviews, loading } = this.state;
		if (loading) {
			return (
				<LoadingContainer>
					<FontAwesomeIcon icon="circle-notch" spin size="2x" />
				</LoadingContainer>
			);
		} else {
			return (
				<ReviewsContainer>
					{reviews.length > 0 ? (
						<Swiper
							pagination={{
								el: ".swiper-pagination",
								dynamicBullets: true,
								clickable: true
							}}
							loop={reviews.length > 1}
							autoplay={{
								delay: 5500,
								disableOnInteraction: true
							}}
							slidesPerView={1}
							spaceBetween={20}
						>
							{reviews.map(review => (
								<Review review={review} hasTitle key={review.id} />
							))}
						</Swiper>
					) : (
						<p>Trenutno ni na voljo mnenj za prikaz...</p>
					)}
				</ReviewsContainer>
			);
		}
	}
}

const ReviewsContainer = styled.div`
	padding: 20px 0;
`;

const LoadingContainer = styled.div`
	min-height: 350px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.mainColor};
`;

export default Reviews;
