import React from "react";
import _times from "lodash/times";
import { Columns, Column } from "bloomer";
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

export default HandleColumns;
