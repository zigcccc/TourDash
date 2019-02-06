import React, { Component } from "react";
import _findIndex from "lodash/findIndex";
import styled from "styled-components";
import { connect } from "react-redux";
import { getPage } from "../Store/Actions/PagesActions";
import PageHeader from "../Components/PageHeader";
import HandleContentBlock from "../Components/HandleContentBlock";
import AccommodationsCallout from "../Components/AccommodationsCallout";

class Page extends Component {
	constructor(props) {
		super(props);
		this.redirectToNotFound = this.redirectToNotFound.bind(this);
		this.getPageIfNotInStore = this.getPageIfNotInStore.bind(this);
	}

	getPageIfNotInStore() {
		const { pageId, pages, getPage } = this.props;
		const pageIndex = _findIndex(pages.pages, { id: pageId });
		if (pageIndex < 0) {
			getPage(pageId).then(res => {
				console.log(res);
			});
		}
	}

	componentDidMount() {
		this.getPageIfNotInStore();
	}

	redirectToNotFound() {
		this.props.history.push("/stran-ne-obstaja/");
	}

	componentDidUpdate(prevProps) {
		//console.log(prevProps.location, this.props.location);
		if (prevProps.location !== this.props.location) {
			this.getPageIfNotInStore();
		}
	}

	render() {
		const { pages, pageId } = this.props;
		const pageIndex = _findIndex(pages.pages, { id: pageId });
		const page = pages.pages[pageIndex];
		if (!pages.loading && page) {
			return (
				<main>
					<PageHeader title={page.title} pageSlug={page.slug} />
					<PageContent>
						{page.content.map(block => (
							<HandleContentBlock key={block.uid} block={block} />
						))}
					</PageContent>
					<AccommodationsCallout />
				</main>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = state => ({
	pages: state.pages
});

const mapDispatchToProps = { getPage };

const PageContent = styled.div`
	padding: 45px 0 125px;
	min-height: 45vh;
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page);
