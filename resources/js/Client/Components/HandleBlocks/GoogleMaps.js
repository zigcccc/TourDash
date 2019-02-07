import React, { Component } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

class GoogleMaps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultCenter: {
				lat: 0,
				lng: 0
			},
			defaultZoom: 0
		};
	}

	componentDidMount() {
		const { center, zoom } = this.props.data;
		this.setState({
			defaultCenter: {
				lat: center.lat,
				lng: center.lng
			},
			defaultZoom: zoom
		});
	}

	render() {
		const {data} = this.props
		return (
			<MapContainer data-height={data.height}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyB3jkj0CkyanrDRdvb7AdnD5S1WjK6_6wA" }}
					zoom={data.zoom}
					center={data.center}
				/>
			</MapContainer>
		);
	}
}

const MapContainer = styled.div`
	width: 100%;
	height: ${props => `${props["data-height"]}px`};
`;


export default GoogleMaps;
