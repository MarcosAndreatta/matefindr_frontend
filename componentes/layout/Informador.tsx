import React, {useState, useEffect} from "react";
import classes from "./Informador.module.css";
import {
  useAppSelector,
  useAppDispatch,
} from "../react_management/store/hooks";
import { actionsActions } from "../react_management/store/index";
import { CSSTransition } from "react-transition-group";
const Informador: React.FC = () => {
  const actionsState = useAppSelector((state) => {
    return state.actions;
  });
  const dispatcher = useAppDispatch();
  const [showAlert, setShowalert] = useState(false);
  useEffect(() => {
      if (!actionsState.actionResult) {return}
      setShowalert(true)
      setTimeout(() => {setShowalert(false)},2000)
      setTimeout(() => {dispatcher(actionsActions.eraseActionsState())},4000)
  }, [actionsState.actionResult, dispatcher])
  let modoInformador;
  let backgroundContainer;
  let show;
  if (actionsState.actionResult) {
    show = true;
  }
  switch (actionsState.actionResult) {
    case "error":
      modoInformador = "alert-danger";
      backgroundContainer = "bg-danger";
      break;
    case "info":
      modoInformador = "alert-info";
      backgroundContainer = "bg-info";
      break;
    case "success":
      modoInformador = "alert-success";
      backgroundContainer = "bg-success";
      break;
  }
  return (
    <CSSTransition
      mountOnEnter
      in={showAlert}
      timeout={1000}
      classNames={{
        enter: classes["transition-enter"],
        enterActive: classes["transition-enter-active"],
        exit: classes["transition-exit"],
        exitActive: classes["transition-exit-active"],
      }}
      
      unmountOnExit
    >
      <div className={` ${classes.container_div}`}>
        <div  style={{marginBottom: "0px"}}
            role="alert"
            className={`alert ${modoInformador} d-flex align-items-center`} >
          <div
           className={`container-sm`}
          >
           {actionsState.message}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Informador;
