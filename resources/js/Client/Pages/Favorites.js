import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { updateSavedItems } from "../Store/Actions/UserActions";
import PageHeader from "../Components/PageHeader";
import AccommodationCard from "../Components/AccommodationCard";
import { Container, Columns, Column } from "bloomer";
import MainCta from "../Components/MainCta";

class Favorites extends Component {
	removeFromFavorites(id, e) {
		const { user, updateSavedItems } = this.props;
		e.preventDefault();
		updateSavedItems(
			user.user.saved_items.filter(item => item !== id),
			user.user.id
		);
	}

	render() {
		const { accommodations, user } = this.props;
		return (
			<Main>
				<PageHeader title="Priljubljene namestitve" pageSlug="priljubljene" />
				<Container>
					{user.user.saved_items ? (
						<Columns isMultiline>
							{accommodations.data
								.filter(
									accommodation =>
										user.user.saved_items.indexOf(accommodation.id) >= 0
								)
								.map(accommodation => (
									<Column isSize="1/3" key={accommodation.id}>
										<AccommodationCard
											flexibleHeight
											noTags
											accommodation={accommodation}
											hasSaveAction
											isSaved={
												user.user &&
												user.user.saved_items &&
												user.user.saved_items.indexOf(accommodation.id) >= 0
											}
										/>
									</Column>
								))}
						</Columns>
					) : (
						<EmptyFavoritesContainer>
							Med priljubljene niste dodali še nobene namestitve...
							<MainCta
								to="/namestitve/"
								text="Poglej vse namestitve"
								fontSize={16}
							/>
						</EmptyFavoritesContainer>
					)}
				</Container>
			</Main>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	accommodations: state.accommodations
});

const mapDispatchToProps = { updateSavedItems };

const Main = styled.main`
	.container {
		padding: 45px 0;
	}
`;

const EmptyFavoritesContainer = styled.div`
	min-height: 45vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Favorites);
