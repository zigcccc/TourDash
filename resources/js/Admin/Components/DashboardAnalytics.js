import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styled from "styled-components";
import Chart from "react-apexcharts";
import CardBase from "../Components/Card";
import { capitalize } from "../Utils";

const Card = styled(CardBase)`
	&.has-margin-top {
		margin-top: 15px;
	}
`;

const CardDate = styled.div`
	position: absolute;
	top: 25px;
	right: 10px;
	border-radius: 200px;
	background-color: ${props => props.theme.whiteShade2};
	color: ${props => props.theme.darkGray};
	text-transform: uppercase;
	font-weight: 900;
	font-size: 10px;
	padding: 3px 8px;
`;

class DashboardAnalytics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartHeight: 250
		};
	}

	render() {
		const { date, hasMarginTop, title, subtitle, type } = this.props;
		const { chartHeight } = this.state;
		switch (type) {
			case "pageviews": {
				return (
					<Card
						className={classNames({
							"has-margin-top": hasMarginTop
						})}
						title={title}
						subtitle={subtitle}
					>
						<CardDate>
							{date.from} - {date.to}
						</CardDate>
						<Chart
							options={{
								chart: {
									id: type,
									sparkline: { enabled: true },
									toolbar: {
										show: false
									}
								},
								grid: { show: false, borderColor: "transparent" },
								stroke: {
									show: true,
									curve: "smooth",
									width: 10
								},
								xaxis: {
									labels: {
										show: false
									},
									lines: {
										show: false
									},
									categories: [
										"Ponedeljek",
										"Torek",
										"Sreda",
										"Četrtek",
										"Petek",
										"Sobota",
										"Nedelja",
										"Pondeljek"
									]
								},
								yaxis: {
									labels: {
										show: false
									},
									lines: {
										show: false
									}
								},
								legend: {
									markers: {
										size: 10
									}
								}
							}}
							series={[
								{
									name: capitalize(type),
									data: [30, 40, 45, 50, 49, 60, 70, 52]
								}
							]}
							type="line"
							height={chartHeight}
						/>
					</Card>
				);
			}
			case "visitors": {
				return (
					<Card
						className={classNames({
							"has-margin-top": hasMarginTop
						})}
						title={title}
						subtitle={subtitle}
					>
						<CardDate>
							{date.from} - {date.to}
						</CardDate>
						<Chart
							options={{
								chart: {
									id: type,
									sparkline: { enabled: true }
								},
								plotOptions: {
									radialBar: {
										hollow: {
											margin: 10,
											size: "35%",
											background: "transparent"
										},
										dataLabels: {
											name: {
												show: true
											},
											value: {
												show: true
											}
										}
									}
								},
								labels: ["Novi uporabniki", "Ponovni obiski"],
								colors: ["#1F77FA", "#08415C"],
								stroke: { width: 3 },
								legend: {
									show: true,
									floating: false,
									fontSize: "12px",
									position: "right",
									verticalAlign: "center",
									textAnchor: "start",
									labels: {
										useSeriesColors: true
									},
									itemMargin: {
										vertical: 10
									},
									containerMargin: {
										left: 10,
										top: 100
									}
								}
							}}
							height={chartHeight}
							series={[60, 40]}
							type="radialBar"
						/>
					</Card>
				);
			}
			case "devices": {
				return (
					<Card
						className={classNames({
							"has-margin-top": hasMarginTop
						})}
						title={title}
						subtitle={subtitle}
					>
						<CardDate>
							{date.from} - {date.to}
						</CardDate>
						<Chart
							options={{
								chart: {
									id: type,
									sparkline: { enabled: false }
								},
								labels: ["Namizni", "Mobilni"],
								colors: ["#1F77FA", "#08415C"],
								dataLabels: {
									enabled: false
								},
								legend: {
									show: true,
									position: "right"
								}
							}}
							height={chartHeight}
							series={[77, 33]}
							type="donut"
						/>
					</Card>
				);
			}
			case "countries": {
				return (
					<Card
						className={classNames({
							"has-margin-top": hasMarginTop
						})}
						title={title}
						subtitle={subtitle}
					>
						<CardDate>
							{date.from} - {date.to}
						</CardDate>
						<Chart
							options={{
								chart: {
									id: type,
									sparkline: { enabled: true },
									toolbar: {
										show: false
									}
								},
								plotOptions: {
									bar: {
										horizontal: true
									}
								},
								dataLabels: {
									enabled: true
								},
								xaxis: {
									categories: [
										"Slovenija",
										"Hrvaška",
										"Italija",
										"Avstrija",
										"Nemčija",
										"Velika Britanija"
									]
								},
								colors: ["#1F77FA"]
							}}
							height={chartHeight}
							series={[{ name: "Pageviews", data: [66, 12, 8, 6, 4, 4] }]}
							type="bar"
						/>
					</Card>
				);
			}
			default: {
				return (
					<Card
						className={classNames({
							"has-margin-top": hasMarginTop
						})}
						title={title}
						subtitle={subtitle}
					>
						<CardDate>
							{date.from} - {date.to}
						</CardDate>
						<p>Unknown chart type...</p>
					</Card>
				);
			}
		}
	}
}

DashboardAnalytics.propTypes = {
	hasMarginTop: PropTypes.bool,
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	date: PropTypes.object.isRequired
};

export default DashboardAnalytics;
