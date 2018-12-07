import React from "react";

const Primary = ({ width, height }) => (
	<img
		width={width ? width : "100%"}
		height={height ? height : "auto"}
		src="/images/logo_primary.png"
		alt="Tourdash, your online accommodations management system"
	/>
);
const Light = ({ width, height }) => (
	<img
		width={width ? width : "100%"}
		height={height ? height : "auto"}
		src="/images/logo_white.png"
		alt="Tourdash, your online accommodations management system"
	/>
);

export default { Primary, Light };
