import { assign } from "xstate";
import { isEmail } from "validator";
import isPasswordShort from "./isPasswordShort";
import contactAuthService from "./contactAuthService";

const machineOptions = (
  emailInputRef,
  passwordInputRef,
  submitBtnRef,
  handleAuthentication
) => ({
  actions: {
    focusEmailInput: () => {
      emailInputRef.current.focus();
    },
    focusPasswordInput: () => {
      passwordInputRef.current.focus();
    },
    focusSubmitBtn: () => {
      submitBtnRef.current.focus();
    },
    cacheEmail: assign((context, event) => ({
      email: event.email
    })),
    cachePassword: assign((context, event) => ({
      password: event.password
    })),
    onAuthentication: () => {
      handleAuthentication();
    }
  },
  guards: {
    isEmptyEmailInput: ctx => ctx.email === "",
    isEmailBadFormat: ctx => ctx.email.length > 0 && !isEmail(ctx.email),
    isEmptyPasswordInput: ctx => ctx.password === "",
    isPasswordShort: ctx =>
      ctx.password.length > 0 && isPasswordShort(ctx.password),
    isNoAccount: (ctx, evt) => evt.data.code === 1,
    isIncorrectPassword: (ctx, evt) => evt.data.code === 2,
    isNoResponse: (ctx, evt) => evt.data.code === 3,
    isInternalServerErr: (ctx, evt) => evt.data.code === 4
  },
  services: {
    requestSignIn: ctx => contactAuthService(ctx.email, ctx.password)
  }
});

export default machineOptions;
