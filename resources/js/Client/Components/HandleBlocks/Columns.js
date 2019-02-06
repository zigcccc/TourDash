import React from "react";
import { Columns as BloomerColumns, Column } from "bloomer";
import HandleContentBlock from "../HandleContentBlock";

const Columns = props => {
	return (
		<BloomerColumns style={props.options ? props.options.style : null}>
			{props.data.map((child, i) => (
				<Column key={child.uid}>
					<HandleContentBlock hasParent={true} block={child} />
				</Column>
			))}
		</BloomerColumns>
	);
};

export default Columns;
