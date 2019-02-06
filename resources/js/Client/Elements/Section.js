import styled from "styled-components";

const Section = styled.section`
	padding: 1em;
	max-width: ${props => (props.maxWidth ? props.maxWidth + "px" : "960px")};
	margin: 0 auto;
	background-color: ${props => props.theme.light};
`;
export default Section;
