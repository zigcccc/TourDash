import React, { Component } from "react";
import styled from "styled-components";
import Card from "../Components/Card";
import _reject from "lodash/reject";
import { Spacer } from "../Components/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardDropdown from "../Components/CardDropdown";

class DashboardActivity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accommodations: [],
			loading: true
		};
		this.getMostFavorited = this.getMostFavorited.bind(this);
	}

	getMostFavorited() {
		this.setState({
			loading: true,
			accommodations: []
		});
		axios.get("/api/accommodations-most-favorited").then(res => {
			const { data } = res.data;
			this.setState({
				accommodations: data,
				loading: false
			});
		});
	}

	componentDidMount() {
		this.getMostFavorited();
	}

	render() {
		const { loading, accommodations } = this.state;
		return (
			<DashboardActivityContainer>
				<CardDropdown>
					<span onClick={this.getMostFavorited}>
						Osveži
						<Spacer />
						<FontAwesomeIcon icon="redo-alt" />
					</span>
				</CardDropdown>
				{loading && (
					<LoadingContainer>
						<FontAwesomeIcon icon="circle-notch" spin size="3x" />
					</LoadingContainer>
				)}
				{!loading &&
					accommodations.map(accommodation => (
						<DashboardAccommodationItem key={accommodation.id}>
							<ImageContainer>
								<img
									src={accommodation.image.split('"').join("")}
									alt={accommodation.title}
								/>
							</ImageContainer>
							<p>{accommodation.title}</p>
							<Spacer />
							<p className="amount">Shranjeno: {accommodation.num_of_saves}x</p>
						</DashboardAccommodationItem>
					))}
			</DashboardActivityContainer>
		);
	}
}

const DashboardActivityContainer = styled(Card)`
	margin-top: 20px;
	padding: 45px 15px 15px;
`;

const LoadingContainer = styled.div`
	padding: 75px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${props => props.theme.mainColor};
`;

const DashboardAccommodationItem = styled.div`
	display: flex;
	align-items: center;
	margin: 15px 0 0;
	padding: 0 0 15px;
	position: relative;
	&:after {
		content: "";
		display: block;
		width: 90%;
		height: 1px;
		background-color: ${props => props.theme.lightGray};
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 0);
	}
	&:first-of-type {
		margin-top: 0;
	}
	&:last-of-type {
		margin-bottom: 0;
		&:after {
			display: none;
		}
	}
	p {
		font-weight: 400;
		font-size: 14px;
		color: ${props => props.theme.darkPrimary};
		&.amount {
			font-weight: 900;
		}
	}
`;

const ImageContainer = styled.div`
	width: 50px;
	height: 50px;
	overflow: hidden;
	border-radius: 50%;
	margin-right: 20px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export default DashboardActivity;
