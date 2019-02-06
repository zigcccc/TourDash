import React from "react";
import { Container } from "bloomer";
import {
	Accommodations,
	Button,
	Card,
	Columns,
	ContactForm,
	GoogleMaps,
	Image,
	Reviews,
	Spacer,
	Typography
} from "./HandleBlocks";

const ContentBlockWrapper = ({ fluid, children, style, hasParent }) => {
	if (hasParent) {
		return children;
	} else {
		return (
			<Container isFluid={fluid} style={style}>
				{children}
			</Container>
		);
	}
};

const HandleContentBlock = ({ block, hasParent }) => (
	<ContentBlockWrapper
		hasParent={hasParent}
		fluid={block.isFluid}
		style={block.options && block.type !== "columns" ? block.options.style : {}}
	>
		{(() => {
			switch (block.type) {
				case "typography": {
					return <Typography {...block} />;
				}
				case "columns": {
					return <Columns {...block} />;
				}
				case "button": {
					return <Button {...block} />;
				}
				case "spacer": {
					return <Spacer {...block} />;
				}
				case "googleMaps": {
					return <GoogleMaps {...block} />;
				}
				case "image": {
					return <Image {...block} />;
				}
				case "accommodations": {
					return <Accommodations {...block} />;
				}
				case "reviews": {
					return <Reviews {...block} />;
				}
				case "card": {
					return <Card {...block} />;
				}
				case "contactForm": {
					return <ContactForm {...block} />;
				}
				default: {
					return null;
				}
			}
		})()}
	</ContentBlockWrapper>
);

export default HandleContentBlock;
