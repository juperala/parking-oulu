import styled from "styled-components";

const parkButton = styled.button`
  background: ${props => props.color};
  color: black;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${props => props.color};
  border-radius: 3px;
  position: sticky;
  &:hover {
    font-weight: bold;
  }
`;

export default parkButton;
