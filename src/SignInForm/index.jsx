import React, { useRef } from "react";
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
import Spinner from "react-spinkit";
import machineConfig from "./machineConfig";
import Form from "./components/Form";
import Heading from "./components/Heading";
import Label from "./components/Label";
import Input from "./components/Input";
import ErrMsg from "./components/ErrMsg";
import Button from "./components/Button";
import Authenticated from "./components/Authenticated";
import machineOptions from "./machineOptions";

const SignInForm = ({
  handleAuthentication = () => {
    console.log("user authenticated");
  }
}) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const submitBtnRef = useRef(null);

  const signInMachine = Machine(
    machineConfig,
    machineOptions(
      emailInputRef,
      passwordInputRef,
      submitBtnRef,
      handleAuthentication
    )
  );
  const [current, send] = useMachine(signInMachine);

  if (current.matches(`signedIn`)) return <Authenticated />;

  const renderSubmitBtnTxt = () => {
    if (current.matches("awaitingResponse")) {
      return "cancel";
    }

    if (current.matches(`authService.error.communication`)) {
      return "retry";
    }

    return "sign in";
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        if (current.matches("awaitingResponse"))
          return send({ type: "CANCEL" });
        send(`SUBMIT`);
      }}
      noValidate
    >
      <Heading>Sign In</Heading>
      {/* email ---------------------- */}
      <Label htmlFor="email">email:</Label>
      <Input
        id="email"
        type="email"
        placeholder="charlie@gmail.com"
        value={current.context.email}
        isErr={current.matches("dataEntry.email.error")}
        disabled={
          current.matches("awaitingResponse") ||
          current.matches("authService.error")
        }
        onBlur={() => {
          send("BLUR_EMAIL");
        }}
        onChange={e => {
          send({
            type: "INPUT_EMAIL",
            email: e.target.value
          });
        }}
        ref={emailInputRef}
        autoFocus
      />
      <ErrMsg>
        {current.matches("dataEntry.email.error.empty") &&
          `please enter your email`}
        {current.matches("dataEntry.email.error.badFormat") &&
          `email format doesn't look right`}
        {current.matches("dataEntry.email.error.noAccount") &&
          `no account linked with this email`}
      </ErrMsg>

      {/* password ---------------------- */}
      <Label htmlFor="password">
        password: <span>(min. 5 characters)</span>
      </Label>

      <Input
        id="password"
        type="password"
        placeholder="myPassw0rd!"
        value={current.context.password}
        isErr={current.matches("dataEntry.password.error")}
        disabled={
          current.matches("awaitingResponse") ||
          current.matches("authService.error")
        }
        onBlur={() => {
          send("BLUR_PASSWORD");
        }}
        onChange={e => {
          send({
            type: "INPUT_PASSWORD",
            password: e.target.value
          });
        }}
        ref={passwordInputRef}
      />

      <ErrMsg>
        {current.matches("dataEntry.password.error.empty") &&
          `please enter your password`}
        {current.matches(`dataEntry.password.error.tooShort`) &&
          `password should be at least 5 characters`}
        {current.matches(`dataEntry.password.error.incorrect`) &&
          `incorrect password`}
      </ErrMsg>

      {/* submit ---------------------- */}
      <Button ref={submitBtnRef}>
        {current.matches(`awaitingResponse`) && (
          <Spinner
            name="chasing-dots"
            color="white"
            style={{ marginRight: "1rem" }}
          />
        )}
        {renderSubmitBtnTxt()}
      </Button>
      <ErrMsg>
        {current.matches(`authService.error.communication`) &&
          `there was a problem contacting the server`}
        {current.matches(`dataEntry.service.error.internal`) &&
          `internal server error`}
      </ErrMsg>
    </Form>
  );
};

export default SignInForm;
