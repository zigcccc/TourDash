import React from "react";
import styled from "styled-components";
import _times from "lodash/times";
import { Columns as BloomerColumns, Column } from "bloomer";
import PropTypes from "prop-types";
import HandleBlock from "./HandleBlock";

const HandleColumns = props => (
	<Columns>
		{props.block.data.map((child, i) => (
			<Column key={child.uid}>
				<HandleBlock parentBlock={props.block} block={child} blockIndex={i} />
			</Column>
		))}
	</Columns>
);

HandleColumns.propTypes = {
	block: PropTypes.object.isRequired
};

const Columns = styled(BloomerColumns)`
	margin-bottom: 0;
	&:not(:last-child) {
		margin-bottom: 0;
	}
`;

export default HandleColumns;
