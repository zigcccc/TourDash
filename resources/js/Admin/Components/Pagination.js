import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _times from "lodash/times";
import {
	Pagination as BloomerPagination,
	PageControl as BloomerPageControl,
	PageList,
	Page,
	PageLink
} from "bloomer";

const Pagination = props => (
	<BloomerPagination>
		<PageControl
			onClick={() => props.fetchNewPage(props.currentPage - 1)}
			className={classNames({
				disabled: props.isFirstPage
			})}
		>
			<FontAwesomeIcon icon="chevron-left" size="1x" />
		</PageControl>
		<PageControl
			onClick={() => props.fetchNewPage(props.currentPage + 1)}
			isNext
			className={classNames({
				disabled: props.isLastPage
			})}
		>
			<FontAwesomeIcon icon="chevron-right" size="1x" />
		</PageControl>
		<PageList>
			{_times(props.totalPages).map(i => (
				<Page key={i}>
					<PageLink
						onClick={
							i + 1 !== props.currentPage
								? () => props.fetchNewPage(i + 1)
								: null
						}
						isCurrent={i + 1 === props.currentPage}
					>
						{i + 1}
					</PageLink>
				</Page>
			))}
		</PageList>
	</BloomerPagination>
);

Pagination.propTypes = {
	totalPages: PropTypes.number.isRequired,
	isFirstPage: PropTypes.bool.isRequired,
	isLastPage: PropTypes.bool.isRequired,
	currentPage: PropTypes.number.isRequired,
	fetchNewPage: PropTypes.func.isRequired
};

Pagination.defaultProps = {
	isFirstPage: false,
	isLastPage: false,
	currentPage: 1,
	totalPages: 1
};

const PageControl = styled(BloomerPageControl)`
	&.disabled {
		pointer-events: none;
		opacity: 0.5;
	}
	svg {
		color: ${props => props.theme.darkPrimary};
	}
	&:hover {
		border-color: ${props => props.theme.mainColor};
		svg {
			color: ${props => props.theme.mainColor};
		}
	}
`;

export default Pagination;
