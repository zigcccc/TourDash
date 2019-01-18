import React from "react";
import styled from "styled-components";
import CardBase from "../Card";
import { Columns, Column } from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sortMap = {
	date: "Datum",
	postTitle: "Naslov objave",
	price: "Cena namestitve",
	numOfBeds: "Kapaciteta namestitve"
};

const HandleAccommodations = ({ block }) => {
	return (
		<Card hasBorder={false}>
			<Columns>
				<IconColumn isSize="1/4">
					<FontAwesomeIcon icon="home" size="4x" />
				</IconColumn>
				<Column>
					<h3>Prikaz namestitev</h3>
					<p>
						<strong>Število namestitev za prikaz: </strong>
						{block.data.totalAmount > 0
							? block.data.totalAmount
							: "Vse namestitve"}
					</p>
					<p>
						<strong>Število stolpcev: </strong>
						{block.data.amountPerSlide}
					</p>
					<p>
						<strong>Objave bodo razvrščene glede na: </strong>
						{sortMap[block.data.sortBy]}
					</p>
				</Column>
			</Columns>
		</Card>
	);
};

const Card = styled(CardBase)`
	p {
		font-size: 12px;
		line-height: 1.618;
		margin: 5px 0;
	}
`;

const IconColumn = styled(Column)`
	display: flex;
	justify-content: center;
	align-items: center;
	svg {
		color: ${props => props.theme.mainColor};
	}
`;

export default HandleAccommodations;
