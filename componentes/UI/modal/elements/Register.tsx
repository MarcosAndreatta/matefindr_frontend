import React, { useReducer, useEffect, useState } from "react";
import useHttpandmanageStates from "../../../react_management/custom_hooks/use-http";
import { useAppDispatch } from "../../../react_management/store/hooks";
import { modalActions } from "../../../react_management/store";
import classes from "../Modal.module.css";
import input_classes from "./Inputs.module.css";
import { CSSTransition } from "react-transition-group";
const Register: React.FC = () => {
  const [isRendered, setIsRendered] = useState(false);;  
  useEffect(() => {setIsRendered(true)},[]);
  const dispatcher = useAppDispatch();
  const [isCheckingTheEnteredUser, setIsCheckingEnteredUser] = useState<boolean>(false);
  const [isSubmitButtonEnabled, setSubmitButtonState] = useState<boolean>(true);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [usernameValidatorState, setUserValidatorState] = useState<null | {
    additionalInfo: string;
    message: string;
  }>(null);
  type Actions = "setIsFocused" | "setIsUnfocused";
  interface UsernameActions {
    type: Actions;
    payload?: string;
  }
  const usernameReducer = (
    state: typeof initialUsernameState,
    action: UsernameActions
  ) => {
    switch (action.type) {
      case "setIsFocused":
        if (action.payload && action.payload !== "") {
          
          return {
            value: action.payload,
            isOnFocus: true,
          };
        } else {
          return {
            value: "",
            isOnFocus: false,
          };
        }
    }
  };
  const initialUsernameState = {
    value: "",
    isOnFocus: false,
  };
  const [state, dispatch] = useReducer(usernameReducer, initialUsernameState);
  const { httpFunction } = useHttpandmanageStates();
  useEffect(() => {
    if (!state.isOnFocus) {setIsCheckingEnteredUser(false);return}
    if (state.isOnFocus) {
      if (state.value !== "") {
        const timeout = setTimeout(() => {
          const response = httpFunction({
            modo: "checkIfUserAlreadyExists",
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/users/checkIfUserAlreadyExists`,
            data: {
              username: state.value,
            },
          });
          response.then((result: any) => {
            setIsCheckingEnteredUser(false);
            if (result.additionalInfo === "free") {setSubmitButtonState(false)};
            if (result.additionalInfo === "taken") {setSubmitButtonState(true)};
            setUserValidatorState({
              additionalInfo: result.additonalInfo,
              message: result.message,
            });
          });
        }, 2000);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [httpFunction, state]);
  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsRendered(false);
    setTimeout(() => {
      httpFunction({
        modo: "registrar",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/users/register`,
        data: {
          username: state.value,
          password: passwordValue,
        },
      }).then(() => {
        dispatcher(modalActions.closeModal())
      });  
    }, 500);
  };
  const closeButtonHandler = () => {
    
    setIsRendered(false);
    const waiterForCSSTransition = setTimeout(() => {dispatcher(modalActions.closeModal())}, 500);
  
  };
  const onChangeUsernameHandler = (ev) => {
    setUserValidatorState(null);
    setIsCheckingEnteredUser(true);
    setSubmitButtonState(true);
    dispatch({ type: "setIsFocused", payload: ev.target.value });
  };
  const onChangePasswordHandler = (ev) => {
    setPasswordValue(ev.target.value);
  };
  const onFocusUsernameHandler = (ev) => {
    dispatch({ type: "setIsFocused", payload: ev.target.value });
  };
  const modalContents = 
    <CSSTransition mountOnEnter unmountOnExit timeout={500} in={isRendered} classNames={{
      enter: classes["transition-enter"],
      enterActive: classes["transition-enter-active"],
      exit: classes["transition-exit"],
      exitActive: classes["transition-exit-active"]
    }}>
      <div className={classes.modal}>
      <div className={input_classes.div}>
        <h2 className="text-white mb-3">Nice to get you ;)</h2>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-white"
            >
              Please, enter a username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              defaultValue={state.value}
              onChange={onChangeUsernameHandler}
              onFocus={onFocusUsernameHandler}
            ></input>
            <div className="d-flex align-items-center">
            {isCheckingTheEnteredUser && (<div style={{display: "inline-block", width: "1.5rem", height: "1.5rem"}} className="spinner-border text-light mt-1 mx-1" role="status">
  <span className="visually-hidden">Loading...</span>
</div>)}
            {usernameValidatorState && (
              <div id="emailHelp" style={{display: "inline-block"}} className="form-text text-white">
                {usernameValidatorState.message}
              </div>
            )}
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-white"
            >
              Please, enter your password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              defaultValue={passwordValue}
              onChange={onChangePasswordHandler}
            ></input>
          </div>
          <button
            disabled={isSubmitButtonEnabled}
            type="submit"
            className="btn btn-primary"
          >
            Register!
          </button>
          <button
            onClick={closeButtonHandler}
            type="button"
            className="btn btn-light mx-1"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  
    </CSSTransition>;
  return modalContents;
};
export default Register;
