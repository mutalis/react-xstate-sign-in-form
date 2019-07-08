import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import GlobalStyles from "./globalStyles";
import SignInForm from "./SignInForm";

const Ul = styled.ul`
  margin-bottom: 4rem;
`;

const App = () => (
  <>
    <GlobalStyles />
    <Ul>
      <li>
        enter email: <em>admin@admin.com</em>, password: <em>admin</em> to
        successfully sign in
      </li>
      <li>any other email while trigger the 'no account' error</li>
      <li>any other password will trigger the 'incorrect password error'</li>
      <li>
        randomly, a connection error will be triggered when you attempt to sign
        in
      </li>
    </Ul>
    <SignInForm />
  </>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
