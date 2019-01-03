import React from "react";
import styled from "styled-components";
import { Columns as BloomerColumns, Column } from "bloomer";
import PropTypes from "prop-types";
import HandleBlock from "./HandleBlock";

const HandleColumns = ({ block }) => (
	<Columns style={block.options ? block.options.style : null}>
		{block.data.map((child, i) => (
			<Column key={child.uid}>
				<HandleBlock parentBlock={block} block={child} blockIndex={i} />
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
