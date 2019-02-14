import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { updateSavedItems } from "../Store/Actions/UserActions";
import styled from "styled-components";
import classNames from "classnames";
import MainCta from "./MainCta";
import slugify from "slugify";
import { Title } from "bloomer";
import { Spacer } from "../Elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

class AccommodationCard extends Component {
	constructor(props) {
		super(props);
		this.handleSave = this.handleSave.bind(this);
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

	handleSave() {
		const { user, updateSavedItems, accommodation, isSaved } = this.props;
		if (!user.user) {
			this.showLoginPrompt();
		}
		if (isSaved) {
			const savedItems = user.user.saved_items.filter(
				item => item !== accommodation.id
			);
			updateSavedItems(savedItems, user.user.id, accommodation.title);
		} else {
			const savedItems = user.user.saved_items
				? [...user.user.saved_items, accommodation.id]
				: [accommodation.id];
			updateSavedItems(savedItems, user.user.id, accommodation.title);
		}
	}

	render() {
		const {
			flexibleHeight,
			isSlide,
			className,
			accommodation,
			isSaved,
			noTags,
			hasSaveAction
		} = this.props;
		return (
			<CardContainer
				className={classNames({
					[className]: true,
					"flexible-height": flexibleHeight,
					"swiper-slide": isSlide
				})}
			>
				<ImageContainer>
					<img
						alt={accommodation.title}
						src={accommodation.featured_image.medium}
					/>
					{(accommodation.bestSeller || accommodation.trending) && !noTags && (
						<CardTags>
							{accommodation.bestSeller && <span>Najbolje prodajano</span>}
							{accommodation.trending && <span>Veliko zanimanja</span>}
						</CardTags>
					)}
					{hasSaveAction && (
						<SaveActionContainer
							onClick={this.handleSave}
							className={classNames({
								saved: isSaved
							})}
						>
							<FontAwesomeIcon icon="bookmark" size="1x" />
						</SaveActionContainer>
					)}
				</ImageContainer>
				<CardContent>
					<TitleContainer>
						<Title tag="h4" isSize={4}>
							{accommodation.title}
						</Title>
						<Price>
							{accommodation.price}
							<small>€</small>
						</Price>
					</TitleContainer>
					<AccommodationDescription>
						{accommodation.description}
					</AccommodationDescription>
					<Spacer />
					<CardButton>
						<MainCta
							to={{
								pathname: `/namestitve/${slugify(accommodation.title, {
									lower: true
								})}/`,
								state: { accommodationId: accommodation.id }
							}}
							text="Podrobnosti"
							fontSize={14}
						/>
					</CardButton>
				</CardContent>
			</CardContainer>
		);
	}
}

const mapStateToProps = state => ({
	accommodations: state.accomodations,
	user: state.user
});

const mapDispatchToProps = { updateSavedItems };

const CardContainer = styled.div`
	background-color: white;
	box-shadow: ${props => props.theme.fancyShadow};
	height: 550px;
	border-radius: 5px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	&.flexible-height {
		height: auto;
	}
	@media screen and (max-width: 768px) {
		height: auto;
		&:not(.swiper-slide) {
			max-width: 90%;
			margin: 0 auto;
		}
	}
`;

const CardContent = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	flex: 1;
	p {
		font-family: ${props => props.theme.textFont};
	}
`;

const AccommodationDescription = styled.p`
	@media screen and (max-width: 768px) {
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
`;

const ImageContainer = styled.div`
	display: flex;
	height: 300px;
	overflow: hidden;
	position: relative;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
	@media screen and (max-width: 768px) {
		height: 175px;
	}
`;

const SaveActionContainer = styled.div`
	position: absolute;
	top: 25px;
	right: 20px;
	background: rgba(0, 0, 0, 0.15);
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	transition: ${props => props.theme.easeTransition};
	svg {
		color: white;
		transition: ${props => props.theme.easeTransition};
	}
	&:hover {
		background: rgba(0, 0, 0, 0.25);
		cursor: pointer;
		svg {
			color: ${props => props.theme.mainColor};
		}
	}
	&.saved {
		svg {
			color: ${props => props.theme.mainColor};
		}
	}
`;

const CardTags = styled.div`
	display: flex;
	position: absolute;
	top: 20px;
	left: 20px;
	span {
		font-size: 0.8rem;
		padding: 0.75em 1em;
		box-shadow: ${props => props.theme.minimalShadow};
		background-color: ${props => props.theme.light};
		text-transform: uppercase;
		font-weight: 900;
		color: ${props => props.theme.dark};
		font-family: ${props => props.theme.textFont};
		border-radius: 200px;
		&:not(:first-of-type) {
			margin-left: 10px;
		}
	}
`;

const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const Price = styled.p`
	font-size: 2.5rem;
	color: ${props => props.theme.dark};
	font-family: ${props => props.theme.headingFont};
	font-weight: 900;
	line-height: 1;
	margin-top: 0;
	small {
		font-size: 0.75em;
	}
`;

const CardButton = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
	align-items: center;
	@media screen and (max-width: 768px) {
		justify-content: center;
	}
	a {
		margin: 10px 0;
		min-width: unset;
	}
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccommodationCard);
