import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SearchForm from "../SearchForm";
import _debounce from "lodash/debounce";

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
			children,
			searchPlaceholder
		} = this.props;
		const { searchQuery } = this.state;
		return (
			<PageWrapperContainer>
				<TitleContainer>
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
			</PageWrapperContainer>
		);
	}
}

PageWrapper.propTypes = {
	pageTitle: PropTypes.string,
	hasSearchForm: PropTypes.bool.isRequired,
	onSearch: PropTypes.func
};

PageWrapper.defaultProps = {
	hasSearchForm: false
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
`;

const SearchField = styled.input`
	padding: 0.75em 1em;
	border-radius: 200px;
	background-color: ${props => props.theme.lightGray};
	outline: none;
	border: none;
`;

export default PageWrapper;
