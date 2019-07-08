import styled from "styled-components";

const Button = styled.button`
  height: 4rem;
  margin: 1rem 0 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  color: white;
  background-color: black;

  :disabled {
    opacity: 0.25;
  }
`;

export default Button;
