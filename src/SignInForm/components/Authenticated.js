import React from "react";
import styled from "styled-components";
import Heading from "./Heading";

const Section = styled.section`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Authenticated = () => (
  <Section>
    <Heading color="dodgerBlue">Authentication successful!</Heading>
  </Section>
);

export default Authenticated;
