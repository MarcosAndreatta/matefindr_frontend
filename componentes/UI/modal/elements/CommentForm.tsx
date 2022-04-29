import React, { useReducer, useRef, useState, useEffect } from "react";
import useHttpandmanageStates from "../../../react_management/custom_hooks/use-http";
import { useAppDispatch } from "../../../react_management/store/hooks";
import { modalActions, detailerActions } from "../../../react_management/store";
import classes from "../Modal.module.css";
import { CSSTransition } from "react-transition-group";
import { SWRResponse } from "swr";
interface CommentFormProps {
  lugar_id: string;
  detailerMutateFunction: SWRResponse["mutate"];
}
const CommentForm: React.FC<CommentFormProps> = (props) => {
  const [isRendered, setIsRendered] = useState(false);
  /////////////////////Input validation/////////////////////////////
  type inputPayload = {
    input: "comment" | "rating",
    action: "setBlured" | "setFocused",
    validity?: boolean
  };
  const initialValidationState = {
    inputComment: { isFocused: false, isBlured: false, isValid: false },
    inputRating: { isFocused: false, isBlured: false, isValid: false }
  };
  const inputValidationReducer = (
    state: typeof initialValidationState,
    action: inputPayload
  ) => {
    const newState = state;
    switch (action.input) {
      case "comment":
        switch (action.action) {
          case "setBlured":
            
            return {
              inputComment: { isFocused: false, isBlured: true, isValid: action.validity },
              inputRating: state.inputRating
            };
          case "setFocused":
            return {
              inputComment: { isFocused: true, isBlured: false, isValid: action.validity },
              inputRating: state.inputRating
            };
        }
      case "rating":
        switch (action.action) {
          case "setBlured":
           return {
            inputComment: state.inputComment,
            inputRating: { isFocused: false, isBlured: true, isValid: action.validity }
          };
          case "setFocused":
            return {
              inputComment: state.inputComment,
              inputRating: { isFocused: true, isBlured: false, isValid: action.validity }
            };
        }
    }

  };
  const [state, validationDispatcher] = useReducer(
    inputValidationReducer,
    initialValidationState
  );
  ////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setIsRendered(true);
  }, []);
  const dispatcher = useAppDispatch();
  const { httpFunction } = useHttpandmanageStates();
  const [addCommentRating, setaddCommentRating] = useState<number>();
  
  const comentarioRef = useRef<HTMLInputElement>();
  const controls = document.getElementsByClassName("mapboxgl-ctrl") as any;
  controls[0].style.display = "none";
  controls[1].style.display = "none";
  ////////////////////////////////////Handlers////////////////////////////////////////
  ///////////////////////////////////CommentInput////////////////////////////////////
  const onFocusCommentHandler = (event: React.FocusEvent<HTMLInputElement>) => {

    if (comentarioRef.current.value === "") {
      validationDispatcher({input: "comment", action: "setFocused", validity: false});
    } else {
      validationDispatcher({input: "comment", action: "setFocused", validity: true});
    }
    
  };
  const onBlurCommentHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (comentarioRef.current.value === "") {
      validationDispatcher({input: "comment", action: "setBlured", validity: false})
    } else {
      validationDispatcher({input: "comment", action: "setBlured", validity: true})
    };
    
  };
  const onChangeCommentHandler = (event: React.ChangeEvent) => {
    if (comentarioRef.current.value === "") {
      validationDispatcher({input: "comment", action: "setFocused", validity: false})
    } else {
      validationDispatcher({input: "comment", action: "setFocused", validity: true})
    }
  };
  const addingRatingDivChangeHandler = (ev) => {
    const { id } = ev.target;
    setaddCommentRating(parseInt(id));
    if (id === undefined) {
      validationDispatcher({input: "rating", action: "setBlured", validity: false})
    } else {
      validationDispatcher({input: "rating", action: "setBlured", validity: true})
    };
  };
  /////////////////////////////////////////////////////////////////////////////////////
  const addingCommentHandler = (event: React.FormEvent) => {
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
        const response = await preliminaryResponse.json();
        return response;
      } catch (error: any) {
        console.log(error);
      }
    };
    setTimeout(() => {
      httpFunction({
        modo: "postear",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/new`,
        accessToken: localStorage.getItem("porongas"),
        data: {
          cuerpo: comentarioRef.current.value,
          rating: addCommentRating === undefined ? 1 : addCommentRating,
          lugar_id: props.lugar_id,
        },
      })
        .then(() => {
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
          console.log(error);
        });
      dispatcher(modalActions.closeModal());
    }, 500);
  };
  
  const closingHandler = () => {
    setIsRendered(false);
    const waiterForCSSTransition = setTimeout(() => {
      dispatcher(modalActions.closeModal());
    }, 500);
  };
  const modalContents = (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      timeout={500}
      in={isRendered}
      classNames={{
        enter: classes["transition-enter"],
        enterActive: classes["transition-enter-active"],
        exit: classes["transition-exit"],
        exitActive: classes["transition-exit-active"],
      }}
    >
      <div className={classes.modal}>
        <div
          className={`d-flex justify-content-center ${classes.container_form}`}
        >
          <form onSubmit={addingCommentHandler}>
            <div className="mb-3">
              <label htmlFor="comentario" className="form-label">
                Comment
              </label>
              <input
                type="textarea"
                className="form-control"
                id="comentario"
                ref={comentarioRef}
                onFocus={onFocusCommentHandler}
                onBlur={onBlurCommentHandler}
                onChange={onChangeCommentHandler}
              ></input>
              {!state.inputComment.isValid && state.inputComment.isBlured && <div>It is not valid</div>}
            </div>
            <div
              onChange={addingRatingDivChangeHandler}
             
              className={`mb-3 ${classes.star_widget}`}
            >
              <input
                type="radio"
                name="rating"
                id="5"
                className={`${classes.star} ${classes["star-5"]}`}
              ></input>
              <label
                htmlFor="5"
                className={`${classes.star} ${classes["star-5"]}`}
              ></label>
              <input
                type="radio"
                name="rating"
                id="4"
                className={`${classes.star} ${classes["star-4"]}`}
              ></input>
              <label
                htmlFor="4"
                className={`${classes.star} ${classes["star-4"]}`}
              ></label>
              <input
                type="radio"
                name="rating"
                id="3"
                className={`${classes.star} ${classes["star-3"]}`}
              ></input>
              <label
                htmlFor="3"
                className={`${classes.star} ${classes["star-3"]}`}
              ></label>
              <input
                type="radio"
                name="rating"
                id="2"
                className={`${classes.star} ${classes["star-2"]}`}
              ></input>
              <label
                htmlFor="2"
                className={`${classes.star} ${classes["star-2"]}`}
              ></label>
              <input
                type="radio"
                name="rating"
                id="1"
                className={`${classes.star} ${classes["star-1"]}`}
              ></input>
              <label
                htmlFor="1"
                className={`${classes.star} ${classes["star-1"]}`}
              ></label>
            </div>
            <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={!state.inputComment.isValid || !state.inputRating.isValid}>
              Submit
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={closingHandler}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </CSSTransition>
  );

  return modalContents;
};
export default CommentForm;
