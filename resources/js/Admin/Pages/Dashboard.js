import React, { Component } from "react";
import styled from "styled-components";
import { PageWrapper } from "../Components/Layout";
import { Columns as BloomerColumns, Column } from "bloomer";
import Card from "../Components/Card";

const Columns = styled(BloomerColumns)`
	margin-top: 30px;
`;

class Dashboard extends Component {
	render() {
		return (
			<PageWrapper pageTitle="Dashboard">
				<Columns>
					<Column>
						<Card>a</Card>
					</Column>
					<Column>
						<Card>b</Card>
					</Column>
					<Column>
						<Card>c</Card>
					</Column>
				</Columns>
			</PageWrapper>
		);
	}
}
export default Dashboard;
