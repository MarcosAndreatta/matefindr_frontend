import React, { useRef, useEffect, useState } from "react";
import useHttpandmanageStates from "../../../react_management/custom_hooks/use-http";
import { useAppDispatch } from "../../../react_management/store/hooks";
import { modalActions, detailerActions } from "../../../react_management/store";
import { CSSTransition } from "react-transition-group";
import classes from "../Modal.module.css";
import { FetchingData } from "../../../../types";
import { SWRResponse } from "swr";
interface EditingPlaceFormProps {
  nombre: string;
  lugar_id: string;
  detailerMutateFunction: SWRResponse["mutate"];
}
const EditingPlaceForm: React.FC<EditingPlaceFormProps> = (props) => {
  const [isRendered, setIsRendered] = useState(false);;  
  useEffect(() => {setIsRendered(true)},[]);
  const dispatcher = useAppDispatch();
  const controls = document.getElementsByClassName("mapboxgl-ctrl") as any;
  const { httpFunction } = useHttpandmanageStates();
  const nombreRef = useRef<HTMLInputElement>();
  const comentarioRef = useRef<HTMLInputElement>();
  const editingformSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setIsRendered(false);
    const detailerUpdater = async () => {
      try {
        const preliminaryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/places/show/${props.lugar_id}`
        );
        if (!preliminaryResponse.ok) {
          throw new Error("Failing to fetch, inside CommentForm");
        }
        const response: FetchingData.response = await preliminaryResponse.json();
        return response;
      } catch (error: any) {
        console.log(error);
      }
    };
    const data = {
      nombre: nombreRef.current.value,
      lugar_id: props.lugar_id,
    };
    setTimeout(() => {
      httpFunction({
        modo: "patchear",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/places/edit`,
        data: data,
        accessToken: localStorage.getItem("porongas"),
      }).then(() => {
          detailerUpdater()
            .then((response) => {
              props.detailerMutateFunction(response)
              // dispatcher(
              //   detailerActions.setNewDetailerState({
              //     algoParamostrar: true,
              //     lugar: {
              //       _id: response.lugar._id,
              //       nombre: response.lugar.nombre,
              //       author: {
              //         _id: response.lugar.author._id,
              //         username: response.lugar.author.username,
              //       },
              //       comentarios: response.lugar.comentarios,
              //     },
              //   })
              // );
              controls[0].style.display = "block";
              controls[1].style.display = "block";
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("From commentForm:", error);
        });
        dispatcher(modalActions.closeModal());
    }, 500);
  };
  const closingHandler = () => {
             
    setIsRendered(false);
    const waiterForCSSTransition = setTimeout(() => {dispatcher(modalActions.closeModal())}, 500);
  
  };
  controls[0].style.display = "none";
  controls[1].style.display = "none";
  return <CSSTransition mountOnEnter unmountOnExit timeout={500} in={isRendered} classNames={{
    enter: classes["transition-enter"],
    enterActive: classes["transition-enter-active"],
    exit: classes["transition-exit"],
    exitActive: classes["transition-exit-active"]
  }}>
<div className={classes.modal}>
      <div
        className={`d-flex justify-content-center ${classes.container_form}`}
      >
        <form onSubmit={editingformSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              ref={nombreRef}
              aria-describedby="emailHelp"
              defaultValue={props.nombre}
            ></input>
          </div>
          
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="button" className="btn btn-dark" onClick={closingHandler}>
            Close
          </button>
        </form>
      </div>
    </div>
    
  
  </CSSTransition>

      
};
export default EditingPlaceForm;
