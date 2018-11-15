import styled from "styled-components";

const Section = styled.section`
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${props => (props.maxWidth ? props.maxWidth + "px" : "960px")};
  margin: 0 auto;
  background-color: ${props => props.theme.light};
`;
export default Section;
