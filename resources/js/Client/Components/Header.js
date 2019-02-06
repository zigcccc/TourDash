import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled, { withTheme } from "styled-components";
import { Spacer } from "../Elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarDropdown from "../Components/AvatarDropdown";

const AppHeader = props => (
	<Header>
		<NavLink to="/">
			{props.settings.data.visual.primary_logo.setting_value ? (
				<Logo
					src={props.settings.data.visual.primary_logo.setting_value}
					alt="Tourdash"
				/>
			) : (
				<Logo src="/images/logo_primary.png" alt="Tourdash" />
			)}
		</NavLink>
		{props.menu && (
			<Fragment>
				<NavLink to="/namestitve/">namestitve</NavLink>
				{props.menu.map(menuItem => (
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
		<Spacer />
		{props.user ? (
			<Fragment>
				<NavLink to="/namestitve/priljubljene/">
					<FontAwesomeIcon icon="bookmark" size="1x" />
					<Favorites>priljubljene</Favorites>
				</NavLink>
				<AvatarDropdown />
			</Fragment>
		) : (
			<LoginContainer className="has-padding" href="/login">
				<FontAwesomeIcon icon="user" size="1x" />
				<span>prijava</span>
			</LoginContainer>
		)}
	</Header>
);

const mapStateToProps = state => ({
	menu: state.pages.menu,
	settings: state.settings,
	user: state.user.user
});

const Header = styled.header`
	background-color: ${props => props.theme.light};
	min-height: 75px;
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	font-family: ${props => props.theme.textFont};
	font-weight: 900;
	z-index: 99999;
	box-shadow: ${props => props.theme.minimalShadow};
	a {
		color: ${props => props.theme.dark};
		padding: 0 1em;
		text-transform: uppercase;
		font-size: 14px;
		transition: ${props => props.theme.easeTransition};
		&:hover {
			color: ${props => props.theme.mainColor};
		}
		&.active {
			color: ${props => props.theme.mainColor};
		}
	}
`;

const Logo = styled.img`
	max-height: 60px;
	margin-top: 5px;
	width: auto;
	margin-right: 30px;
`;

const Favorites = styled.span`
	margin-left: 7px;
	text-transform: lowercase;
`;

const LoginContainer = styled.a`
	background: rgba(0, 0, 0, 0.05);
	&.has-padding {
		padding: 0.75em 1em;
		border-radius: 200px;
	}
	&:hover {
		background: rgba(0, 0, 0, 0.075);
	}
	span {
		margin-left: 10px;
	}
`;

const AvatarContainer = styled(LoginContainer)`
	display: flex;
	align-items: center;
	&.has-padding {
		padding: 5px;
	}
	span {
		margin-right: 10px;
	}
`;

export default withTheme(
	connect(
		mapStateToProps,
		null
	)(AppHeader)
);
