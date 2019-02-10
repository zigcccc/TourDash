import React, { Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
	Hero,
	HeroHeader as HeroHeaderBase,
	HeroBody,
	HeroFooter,
	Container
} from "bloomer";
import { Spacer } from "../Elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppFooter = ({ menu, settings }) => {
	return (
		<Hero isColor="dark" isSize="medium">
			<HeroHeader>
				<Container>
					<NavLink to="/">
						{settings.data.visual.secondary_logo.setting_value ? (
							<Logo
								src={settings.data.visual.secondary_logo.setting_value}
								alt="Tourdash"
							/>
						) : (
							<Logo src="/images/logo_primary.png" alt="Tourdash" />
						)}
					</NavLink>
					<Spacer />
					{menu && (
						<Fragment>
							<NavLink to="/namestitve/">namestitve</NavLink>
							{menu.map(menuItem => (
								<NavLink
									key={menuItem.id}
									to={{
										pathname: `/${menuItem.slug}/`,
										state: { pageId: menuItem.id }
									}}
								>
									{menuItem.title}
								</NavLink>
							))}
						</Fragment>
					)}
				</Container>
			</HeroHeader>
			<HeroBody>
				<ContactContainer>
					{Object.keys(settings.data.contact).map(setting => (
						<div key={setting}>
							{(() => {
								switch (setting) {
									case "phone_num": {
										return <FontAwesomeIcon icon="phone" size="2x" />;
									}
									case "address": {
										return <FontAwesomeIcon icon="map" size="2x" />;
									}
									case "email": {
										return <FontAwesomeIcon icon="envelope" size="2x" />;
									}
									default: {
										return null;
									}
								}
							})()}
							<p>{settings.data.contact[setting].setting_value}</p>
						</div>
					))}
				</ContactContainer>
			</HeroBody>
			<HeroFooter>
				<Container>
					<CopyRights>&copy;2019, Žiga Krašovec</CopyRights>
				</Container>
			</HeroFooter>
		</Hero>
	);
};

const mapStateToProps = state => ({
	menu: state.pages.menu,
	settings: state.settings
});

const CopyRights = styled.small`
	margin: 0 auto;
	display: block;
	padding: 20px;
	text-align: center;
	font-family: ${props => props.theme.textFont};
`;

const Logo = styled.img`
	max-height: 60px;
	margin-top: 5px;
	width: auto;
`;

const HeroHeader = styled(HeroHeaderBase)`
	.container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		@media screen and (max-width: 768px) {
			flex-direction: column;
			a {
				padding: 15px 0;
			}
		}
	}
	padding: 20px;
	font-family: ${props => props.theme.textFont};
	font-weight: 900;
	a {
		color: ${props => props.theme.light};
		padding: 0 1em;
		text-transform: uppercase;
		font-size: 14px;
		transition: ${props => props.theme.easeTransition};
		&:hover {
			color: ${props => props.theme.secondaryColor};
		}
		&.active {
			color: ${props => props.theme.secondaryColor};
		}
	}
`;

const ContactContainer = styled(Container)`
	display: flex;
	font-size: 1.25rem;
	justify-content: space-between;
	align-items: center;
	& > div {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 260px;
		p {
			margin-top: 1em;
			text-align: center;
		}
	}
	@media screen and (max-width: 768px) {
		flex-direction: column;
		& > div {
			margin: 10px 0;
		}
	}
`;

export default connect(
	mapStateToProps,
	null
)(AppFooter);
