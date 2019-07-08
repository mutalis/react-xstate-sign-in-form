const machineConfig = {
  id: `signInForm`,
  context: {
    email: ``,
    password: ``
  },
  initial: `dataEntry`,
  states: {
    dataEntry: {
      type: `parallel`,
      on: {
        INPUT_EMAIL: {
          actions: "cacheEmail",
          target: "dataEntry.email.noError"
        },
        INPUT_PASSWORD: {
          actions: "cachePassword",
          target: "dataEntry.password.noError"
        },
        SUBMIT: [
          {
            cond: "isEmptyEmailInput",
            target: "dataEntry.email.error.empty"
          },
          {
            cond: "isEmailBadFormat",
            target: "dataEntry.email.error.badFormat"
          },
          {
            cond: "isEmptyPasswordInput",
            target: "dataEntry.password.error.empty"
          },
          {
            cond: "isPasswordShort",
            target: "dataEntry.password.error.tooShort"
          },
          {
            target: "awaitingResponse"
          }
        ]
      },
      states: {
        email: {
          initial: "noError",
          states: {
            noError: {
              on: {
                BLUR_EMAIL: [
                  {
                    target: ["error.badFormat"],
                    cond: "isEmailBadFormat"
                  }
                ]
              }
            },
            error: {
              onEntry: "focusEmailInput",
              initial: "badFormat",
              states: {
                badFormat: {},
                noAccount: {},
                empty: {}
              }
            }
          }
        },
        password: {
          initial: "noError",
          states: {
            noError: {
              on: {
                BLUR_PASSWORD: [
                  {
                    target: ["error.tooShort"],
                    cond: "isPasswordShort"
                  }
                ]
              }
            },
            error: {
              onEntry: "focusPasswordInput",
              initial: "empty",
              states: {
                empty: {},
                tooShort: {},
                incorrect: {}
              }
            }
          }
        }
      }
    },
    authService: {
      initial: "noError",
      states: {
        error: {
          states: {
            communication: {
              on: {
                SUBMIT: "#signInForm.awaitingResponse"
              }
            },
            internal: {}
          }
        },
        noError: {}
      }
    },
    awaitingResponse: {
      on: {
        CANCEL: `dataEntry`
      },
      invoke: {
        src: `requestSignIn`,
        onDone: `signedIn`,
        onError: [
          {
            cond: `isNoAccount`,
            target: `dataEntry.email.error.noAccount`
          },
          {
            cond: `isIncorrectPassword`,
            target: `dataEntry.password.error.incorrect`
          },
          {
            cond: `isNoResponse`,
            target: `authService.error.communication`
          },
          {
            cond: `isInternalServerErr`,
            target: `authService.error.internal`
          }
        ]
      }
    },
    signedIn: {}
  },
  onDone: {
    actions: `onAuthentication`
  }
};

export default machineConfig;
