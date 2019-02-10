import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { withRouter } from "react-router";
import { Homepage, Rooms, Page, SingleAccommodation, Favorites } from "./Pages";
import AppHeader from "./Components/Header";
import { PageWrapper } from "./Elements";
import AppFooter from "./Components/Footer";
import slugify from "slugify";

class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}
	render() {
		return this.props.children;
	}
}

const HandleScroll = withRouter(ScrollToTop);

const Router = ({ menu, accommodations }) => (
	<BrowserRouter>
		<Fragment>
			<AppHeader />
			<PageWrapper>
				<HandleScroll>
					<Route path="/" component={Homepage} exact />
					<Route path="/namestitve/" component={Rooms} exact />
					<Route path="/priljubljene/" component={Favorites} exact />
					{accommodations.map(item => (
						<Route
							path={`/namestitve/${slugify(item.title, { lower: true })}/`}
							exact
							key={item.id}
							render={props => (
								<SingleAccommodation {...props} accommodationId={item.id} />
							)}
						/>
					))}
					{menu.map(item => (
						<Route
							key={item.id}
							path={`/${item.slug}/`}
							render={props => <Page {...props} pageId={item.id} />}
							exact
						/>
					))}
				</HandleScroll>
			</PageWrapper>
			<AppFooter />
		</Fragment>
	</BrowserRouter>
);

const mapStateToProps = state => ({
	menu: state.pages.menu,
	accommodations: state.accommodations.data
});

export default connect(
	mapStateToProps,
	null
)(Router);
