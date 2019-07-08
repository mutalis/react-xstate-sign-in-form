import styled, { css } from "styled-components";

const Input = styled.input`
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 1rem;

  border: 2px solid black;

  /* removes chrome's yellow background */
  &,
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: black;
    box-shadow: 0 0 0px 1000px white inset;
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }

  :focus {
    outline: none;
    border-color: ${({ isErr }) => (isErr ? "tomato" : "dodgerBlue")};
  }

  :disabled {
    opacity: 0.25;
  }

  ::placeholder {
    opacity: 0.5;
  }

  ${({ isErr }) =>
    isErr &&
    css`
      border-color: tomato;
    `}
`;

export default Input;
