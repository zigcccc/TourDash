import React, { Component } from "react";
import { PageWrapper } from "../Components/Layout";

class NotFound extends Component {
	render() {
		return (
			<PageWrapper pageTitle="Page not found">
				Sorry, looks like your lost...
			</PageWrapper>
		);
	}
}

export default NotFound;
