import React, { Component, Fragment } from "react";
import classNames from "classnames";
import styled from "styled-components";
import PropTypes from "prop-types";
import SearchForm from "../SearchForm";
import _debounce from "lodash/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PageWrapper extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.performSearch = _debounce(this.performSearch.bind(this), 200);
		this.state = {
			searchQuery: ""
		};
	}

	handleChange(e) {
		this.setState(
			{
				searchQuery: e.target.value
			},
			() => {
				this.performSearch(this.state.searchQuery);
			}
		);
	}

	performSearch(input) {
		this.props.onSearch(input);
	}

	render() {
		const {
			pageTitle,
			hasSearchForm,
			titleHasMargin,
			children,
			searchPlaceholder,
			loading
		} = this.props;
		const { searchQuery } = this.state;
		return (
			<PageWrapperContainer>
				{loading ? (
					<LoadingContainer>
						<FontAwesomeIcon icon="circle-notch" spin size="2x" />
					</LoadingContainer>
				) : (
					<Fragment>
						<TitleContainer
							className={classNames({
								"has-margin": titleHasMargin
							})}
						>
							<h1>{pageTitle}</h1>
							{hasSearchForm && (
								<SearchForm
									onChange={this.handleChange}
									placeholder={searchPlaceholder}
									empty={searchQuery.length === 0}
									loading={false}
									hasIcon={true}
								/>
							)}
						</TitleContainer>
						{children}
					</Fragment>
				)}
			</PageWrapperContainer>
		);
	}
}

PageWrapper.propTypes = {
	pageTitle: PropTypes.string,
	hasSearchForm: PropTypes.bool.isRequired,
	onSearch: PropTypes.func,
	loading: PropTypes.bool.isRequired
};

PageWrapper.defaultProps = {
	hasSearchForm: false,
	loading: false
};

const PageWrapperContainer = styled.div`
	padding: 20px;
	h1 {
		margin-top: 20px;
		color: ${props => props.theme.darkPrimary};
		font-weight: 900;
		font-size: 54px;
		line-height: 1;
	}
`;

const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	&.has-margin {
		margin-bottom: 35px;
	}
`;

const LoadingContainer = styled.div`
	min-height: calc(100vh - 75px);
	display: flex;
	color: ${props => props.theme.mainColor};
	justify-content: center;
	align-items: center;
`;

export default PageWrapper;
