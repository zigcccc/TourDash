import React from "react";
import styled from "styled-components";
import {
	Hero as HeroBase,
	HeroBody,
	Container,
	Title as TitleBase
} from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const AccommodationsCallout = () => (
	<Hero isSize="medium" isColor="primary">
		<HeroBody>
			<Container hasTextAlign="centered">
				<Title tag="h3" isSize={3}>
					<Link to="/namestitve/">
						Rezervirajte namestitev
						<FontAwesomeIcon icon="long-arrow-alt-right" />
					</Link>
				</Title>
			</Container>
		</HeroBody>
	</Hero>
);

const Hero = styled(HeroBase)`
	&.hero.is-primary {
		background-color: ${props => props.theme.secondaryColor};
	}
`;

const Title = styled(TitleBase)`
	a {
		svg {
			margin-left: 1em;
			transition: ${props => props.theme.easeTransition};
		}
		&:hover {
			svg {
				transform: translateX(5px);
			}
		}
	}
`;

export default AccommodationsCallout;
