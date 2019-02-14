import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { Table } from "bloomer";

const OverviewTable = props => (
	<StyledTable
		isNarrow={false}
		className={classNames({ "is-hoverable": true, [props.className]: true })}
		{...props}
	>
		{props.children}
	</StyledTable>
);

const StyledTable = styled(Table)`
	width: 100%;
	margin-top: 25px;
	thead {
		@media screen and (max-width: 768px) {
			display: none;
		}
	}
	@media screen and (max-width: 768px) {
		overflow: hidden;
		&.no-margin-mobile {
			margin-top: 0;
		}
	}
`;

export default OverviewTable;
