import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getHomepage } from "../Store/Actions/PagesActions";
import _isEmpty from "lodash/isEmpty";
import { PageLoadingContainer } from "../Elements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HandleContentBlock from "../Components/HandleContentBlock";
import HomepageSlider from "../Components/HomepageSlider";

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		const { homepage, getHomepage } = this.props;
		if (_isEmpty(homepage)) {
			getHomepage();
		}
	}
	render() {
		const { homepage } = this.props;
		return (
			<Fragment>
				{_isEmpty(homepage) ? (
					<PageLoadingContainer>
						<FontAwesomeIcon icon="circle-notch" spin size="2x" />
					</PageLoadingContainer>
				) : (
					<Main>
						<HomepageSlider />
						{homepage.content.map(block => (
							<HandleContentBlock key={block.uid} block={block} />
						))}
					</Main>
				)}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	pages: state.pages,
	homepage: state.pages.homepage
});

const mapDispatchToProps = { getHomepage };

const Main = styled.div`
	@media screen and (max-width: 768px) {
		.container {
			padding: 0 20px;
			&.is-fluid {
				padding: 0;
			}
		}
	}
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Homepage);
