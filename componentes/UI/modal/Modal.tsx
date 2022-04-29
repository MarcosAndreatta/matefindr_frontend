import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import LoadingSpinner from "./elements/LoadingSpinner";
import EditingPlaceForm from "./elements/EditingForm";
import CommentForm from "./elements/CommentForm";
import EditCommentForm from "./elements/EditCommentForm";
import Login from "./elements/Login";
import Register from "./elements/Register";
import { Store } from "../../../types";

const Modal: React.FC<Store.modalState> = (props) => {
  const [isDom, setIsdom] = useState(false);
  useEffect(() => {
    setIsdom(true);
  }, []);
  let modalContents: JSX.Element;
  let elementToRender: JSX.Element
  if (isDom) {
    switch (props.modo) {
      case "Login":
        elementToRender = <Login />;
        break;
      case "Register":
        elementToRender = <Register />;
        break;
      case "showAddCommentForm":
        elementToRender = (
                 <CommentForm lugar_id={props.formOptions.lugar_id} detailerMutateFunction={props.formOptions.detailerMutateFunction} />
               );
        break;
      case "showEditCommentForm":
        elementToRender = (
                 <EditCommentForm
                   comentario_id={props.formOptions.comentario_id}
                   comentario={props.formOptions.comentario}
                   lugar_id={props.formOptions.lugar_id}
                   detailerMutateFunction={props.formOptions.detailerMutateFunction}
                 />
               );
          break;
        case "showEditingForm":
          elementToRender = (
                   <EditingPlaceForm
                     detailerMutateFunction={props.formOptions.detailerMutateFunction}
                     lugar_id={props.formOptions.lugar_id}
                     nombre={props.formOptions.nombre}
                     
                   />
                 );
            break;
        case "showLoadingSpinner":
          elementToRender = <LoadingSpinner />;
         break;
        case "stayClosed":
          elementToRender = <div></div>
          break;
    }
    modalContents = elementToRender
  } else {
    return null;
  }
  return ReactDOM.createPortal(
      modalContents,
    document.getElementById("modal")
  );
};
export default Modal;
