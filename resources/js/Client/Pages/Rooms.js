import React, { Component } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { connect } from "react-redux";
import { getAccommodations } from "../Store/Actions/AccommodationsActions";
import PageHeader from "../Components/PageHeader";
import AccommodationCard from "../Components/AccommodationCard";
import { Container as ContainerBase, Title, Columns, Column } from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Rooms extends Component {
	componentDidMount() {
		const { accommodations, getAccommodations } = this.props;
		accommodations.data.length === 0 && getAccommodations();
	}
	render() {
		const { accommodations } = this.props;
		return (
			<main>
				<PageHeader title="Namestitve" pageSlug="namestitve" />
				<Container>
					<Title tag="h2" isSize={2}>
						Naše namestitve
					</Title>
					<AccommodationsContainer>
						{accommodations.loading ? (
							<FontAwesomeIcon icon="circle-notch" spin size="2x" />
						) : (
							<Columns isMultiline>
								{accommodations.data.map(accommodation => (
									<Column key={accommodation.id} isSize="1/3" isDisplay="flex">
										<AccommodationCard
											accommodation={accommodation}
											flexibleHeight={true}
										/>
									</Column>
								))}
							</Columns>
						)}
					</AccommodationsContainer>
				</Container>
			</main>
		);
	}
}

const mapStateToProps = state => ({
	accommodations: state.accommodations
});

const mapDispatchToProps = { getAccommodations };

const Container = styled(ContainerBase)`
	padding: 45px 0;
	h2.title {
		font-family: ${props => props.theme.headingFont};
		text-align: center;
		color: ${props => props.theme.mainColor};
		margin-bottom: 45px;
	}
`;

const AccommodationsContainer = styled.div`
	min-height: 40vh;
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Rooms);
