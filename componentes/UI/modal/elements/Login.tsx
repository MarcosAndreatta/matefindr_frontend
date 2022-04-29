import React, { useEffect, useState, useRef } from "react";
import useHttpandmanageStates from "../../../react_management/custom_hooks/use-http";
import { useAppDispatch } from "../../../react_management/store/hooks";
import { modalActions } from "../../../react_management/store";
import classes from "../Modal.module.css";
import input_classes from "./Inputs.module.css"
import { CSSTransition } from "react-transition-group";
const Login: React.FC = () => {
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {setIsRendered(true)},[]);
  const dispatcher = useAppDispatch();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { httpFunction } = useHttpandmanageStates();
  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsRendered(false);
    setTimeout(() => {
      httpFunction({
        modo: "loguear",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`,
        data: {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
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
  const modalContents = <CSSTransition mountOnEnter unmountOnExit timeout={500} in={isRendered} classNames={{
    enter: classes["transition-enter"],
    enterActive: classes["transition-enter-active"],
    exit: classes["transition-exit"],
    exitActive: classes["transition-exit-active"]
  }}>
    
    <div className={classes.modal}>
      <div className={input_classes.div}>
        
      <form onSubmit={formSubmitHandler}>
        <h2 className="text-white mb-3">We are glad to see you back ;)</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label text-white">
            Please, enter your username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={usernameRef}
          ></input>
          <div id="emailHelp" className="form-text text-white">
            We will never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label text-white">
            Please, enter your password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            ref={passwordRef}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <button onClick={closeButtonHandler} type="button" className="btn btn-light mx-1">
          Close
        </button>
      </form>
      </div>
    </div>
  
  </CSSTransition>;
  return modalContents;
};
export default Login;
