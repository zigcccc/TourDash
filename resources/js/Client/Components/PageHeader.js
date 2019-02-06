import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Hero, HeroBody, Title, Breadcrumb, BreadcrumbItem } from "bloomer";

const PageHeader = props => {
	return (
		<StyledHero isColor="dark" isSize="medium">
			<StyledHeroBody isDisplay="flex">
				<Title tag="h1" isSize={1}>
					{props.title}
				</Title>
				<Breadcrumb isAlign="right">
					<ul>
						<BreadcrumbItem>
							<Link to="/">Domov</Link>
						</BreadcrumbItem>
						<BreadcrumbItem isActive>
							<Link to={props.pageSlug}>{props.title}</Link>
						</BreadcrumbItem>
					</ul>
				</Breadcrumb>
			</StyledHeroBody>
		</StyledHero>
	);
};

PageHeader.propTypes = {
	title: PropTypes.string,
	pageSlug: PropTypes.string
};

const StyledHero = styled(Hero)`
	background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
		url("/images/page-background.jpeg");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
`;

const StyledHeroBody = styled(HeroBody)`
	align-items: center;
	justify-content: space-between;
`;

export default PageHeader;
