import React, {useRef, useState, useEffect} from "react";
import useHttpandmanageStates from "../../../react_management/custom_hooks/use-http";
import { useAppDispatch } from "../../../react_management/store/hooks";
import { modalActions, detailerActions } from "../../../react_management/store";
import { CSSTransition } from "react-transition-group";
import classes from "../Modal.module.css";
import { SWRResponse } from "swr";
interface EditCommentFormProps {
    comentario_id: string;
    comentario: string;
    lugar_id: string;
    detailerMutateFunction: SWRResponse["mutate"];
}
const EditCommentForm: React.FC<EditCommentFormProps> = (props) => {
  const [isRendered, setIsRendered] = useState(false);;  
  useEffect(() => {setIsRendered(true)},[]);
    const dispatcher = useAppDispatch();
    const {httpFunction} = useHttpandmanageStates();
    const comentarioRef = useRef<HTMLInputElement>();
    const [editCommentRating, seteditCommentRating] = useState<number>();
    const controls = document.getElementsByClassName("mapboxgl-ctrl") as any;
    controls[0].style.display = "none";
        controls[1].style.display = "none";
        const editCommentHandler = (event: React.FormEvent) => {
          event.preventDefault();
          setIsRendered(false);
          const detailerUpdater = async () => {
            try {
              
              const preliminaryResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/places/show/${props.lugar_id}`);
              if (!preliminaryResponse.ok) {throw new Error("Failing to fetch, inside CommentForm")};
              const response = await preliminaryResponse.json();
              return response
            }
            catch (error: any) {
              console.log(error)
            }
          };
          setTimeout(() => {
            httpFunction({
              modo: "patchear",
              url: `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/edit`,
              accessToken: localStorage.getItem("porongas"),
              data: {
                cuerpo: comentarioRef.current.value,
                rating: editCommentRating,
                comentario_id: props.comentario_id,
              },
            }).then(() => {
              detailerUpdater().then((response) => {
                
                props.detailerMutateFunction(response)
                // //Instead of dispatching here, why don't mutate the data of the useSWR that is controlling
                // //the detailer?
                // dispatcher(detailerActions.setNewDetailerState({
                //   algoParamostrar: true,
                //   lugar: {
                //     _id: response.lugar._id,
                //     nombre: response.lugar.nombre,
                //     author: {
                //       _id: response.lugar.author._id,
                //       username: response.lugar.author.username
                //     },
                //     comentarios: response.lugar.comentarios
                //   }
                // }));
                controls[0].style.display = "block";
                controls[1].style.display = "block";
              }).catch((error) => {console.log(error)})
            }).catch((error) => {
              console.log("From commentForm:", error)
            });
            dispatcher(modalActions.closeModal());
          }, 500);
        };
        const editRatingDivChangeHandler = (ev) => {
          const { id } = ev.target;
          seteditCommentRating(parseInt(id));
        };
        const closingHandler = () => {
          
    setIsRendered(false);
    const waiterForCSSTransition = setTimeout(() => {dispatcher(modalActions.closeModal())}, 500);
  
        }
        const modalContents = <CSSTransition
        mountOnEnter unmountOnExit timeout={500} in={isRendered} classNames={{
          enter: classes["transition-enter"],
          enterActive: classes["transition-enter-active"],
          exit: classes["transition-exit"],
          exitActive: classes["transition-exit-active"]
        }}
        >

<div className={classes.modal}>
            <div
              className={`d-flex justify-content-center ${classes.container_form}`}
            >
              <form onSubmit={editCommentHandler}>
                <div className="mb-3">
                  <label htmlFor="comentario" className="form-label">
                    Comment
                  </label>
                  <input
                    type="textarea"
                    className="form-control"
                    id="comentario"
                    ref={comentarioRef}
                    defaultValue={props.comentario}
                  ></input>
                </div>
                <div
                  onChange={editRatingDivChangeHandler}
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
                <button type="submit" className="btn btn-primary">
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
        
        </CSSTransition>;
        return modalContents
};
export default EditCommentForm