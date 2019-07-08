import styled from "styled-components";

const Heading = styled.h1`
  margin-bottom: 2rem;

  font-size: 2rem;
  font-weight: 100;
  text-align: center;
  text-transform: capitalize;

  color: ${({ color }) => color || "black"};
`;

export default Heading;
