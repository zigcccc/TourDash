import React, { Fragment, Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled, { withTheme } from "styled-components";
import { Spacer } from "../Elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarDropdown from "../Components/AvatarDropdown";

class AppHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileMenuOpen: false
		};
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		this.setState({
			mobileMenuOpen: !this.state.mobileMenuOpen
		});
	}

	render() {
		const { settings, menu, user } = this.props;
		const { mobileMenuOpen } = this.state;
		return (
			<Header>
				<NavLink to="/">
					{settings.data.visual.primary_logo.setting_value ? (
						<Logo
							src={settings.data.visual.primary_logo.setting_value}
							alt="Tourdash"
						/>
					) : (
						<Logo src="/images/logo_primary.png" alt="Tourdash" />
					)}
				</NavLink>
				<DesktopMenu>
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
				</DesktopMenu>
				<Spacer />
				{user ? (
					<Fragment>
						<NavLink to="/priljubljene/">
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
				<MobileMenuIcon onClick={this.toggleMenu}>
					<FontAwesomeIcon icon={mobileMenuOpen ? "times" : "bars"} />
				</MobileMenuIcon>
				<MobileMenu className={classNames({ open: mobileMenuOpen })}>
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
				</MobileMenu>
			</Header>
		);
	}
}

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

const DesktopMenu = styled.div`
	@media screen and (max-width: 768px) {
		display: none;
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
	@media screen and (max-width: 1130px) {
		display: none;
	}
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

const MobileMenuIcon = styled.div`
	display: none;
	@media screen and (max-width: 768px) {
		display: block;
		margin-left: 5px;
		&:hover {
			cursor: pointer;
		}
	}
`;

const MobileMenu = styled.div`
	position: fixed;
	right: -100%;
	width: 50vw;
	min-width: 300px;
	background: ${props => props.theme.light};
	top: 75px;
	bottom: 0;
	display: flex;
	flex-direction: column;
	box-shadow: ${props => props.theme.hoverShadow};
	align-items: center;
	padding: 20px;
	transition: ${props => props.theme.easeTransition};
	&.open {
		right: 0;
	}
	a {
		margin: 20px 0;
	}
`;

export default withTheme(
	connect(
		mapStateToProps,
		null
	)(AppHeader)
);
