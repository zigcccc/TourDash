import React, { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { Homepage, Rooms, Page } from "./Pages";
import AppHeader from "./Components/Header";
import { PageWrapper } from "./Elements";
import AppFooter from "./Components/Footer";

const Router = ({ match, menu }) => (
	<BrowserRouter>
		<Fragment>
			<AppHeader />
			<PageWrapper>
				<Route path="/" component={Homepage} exact />
				<Route path="/namestitve/" component={Rooms} exact />
				{menu.map(item => (
					<Route
						key={item.id}
						path={`/${item.slug}/`}
						render={props => <Page {...props} pageId={item.id} />}
						exact
					/>
				))}
			</PageWrapper>
			<AppFooter />
		</Fragment>
	</BrowserRouter>
);

const mapStateToProps = state => ({
	menu: state.pages.menu
});

export default connect(
	mapStateToProps,
	null
)(Router);
