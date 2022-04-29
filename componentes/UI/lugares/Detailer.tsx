import React from "react";
import { useAppDispatch } from "../../react_management/store/hooks";
import { modalActions, detailerActions } from "../../react_management/store";
import useHttpandmanageStates from "../../react_management/custom_hooks/use-http";
import useDetailerStateRegularUpdater from "../../react_management/custom_hooks/use-detailerStateRegularUpdater";
import { Store } from "../../../types";

interface DetailerProps {
    lugar: {
      _id: string;
      nombre: string;
      author: {
        _id: string;
        username: string;
      };
      comentarios: Store.comentario[] | null;
    } | null;
    purgeThisPlace: (id: string) => void
}
const Detailer: React.FC<DetailerProps> = (props) => {
    
    const mutate = useDetailerStateRegularUpdater(props.lugar);
    const {httpFunction, authState} = useHttpandmanageStates();
    const dispatcher = useAppDispatch();
    
    const editarButtonHandler = () => {
        dispatcher(modalActions.showEditingForm({
          modo: "showEditingForm",
          formOptions: {
            nombre: props.lugar.nombre,
            lugar_id: props.lugar._id,
            comentario: null,
            comentario_id: null,
            detailerMutateFunction: mutate
          }
        }));
      };
      const borrarButtonHandler = () => {
   
        httpFunction({
          modo: "borrar",
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/places/delete`,
          data: {
            lugar_id: props.lugar._id,
            autor: props.lugar.author._id,
          },
          accessToken: localStorage.getItem("porongas"),
        }).then(() => {
          dispatcher(detailerActions.emptyDetailerState());
          props.purgeThisPlace(props.lugar._id);
        }).catch((error) => {
          console.log("From commentForm:", error)
        });
        
      };
      const addCommentHandler = () => {
        dispatcher(modalActions.showAddCommentForm({
          modo: "showAddCommentForm",
          formOptions: {
            nombre: props.lugar.nombre,
            lugar_id: props.lugar._id,
            comentario: null,
            comentario_id: null,
            detailerMutateFunction: mutate
          }
        }));
      };
      
      const editCommentHandler = (comentario_id, comentario) => {
        
        dispatcher(modalActions.showEditCommentForm({
          modo: "showEditCommentForm",
          formOptions: {
            nombre: null,
            lugar_id: props.lugar._id,
            comentario: comentario,
            comentario_id: comentario_id,
            detailerMutateFunction: mutate
          }
        }));
      };
      const eraseCommentHandler = (id, currentlyLoggedUser) => {
        const detailerUpdater = async () => {
          try {
            
            const preliminaryResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/places/show/${props.lugar._id}`);
            if (!preliminaryResponse.ok) {throw new Error("Failing to fetch, inside CommentForm")};
            const response = await preliminaryResponse.json();
            return response
          }
          catch (error: any) {
            console.log(error)
          }
        };
        httpFunction({
          modo: "borrar",
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/delete`,
          data: {
            comentario_id: id,
            currentlyLoggedUser
          },
          accessToken: localStorage.getItem("porongas")
        }).then(() => {
          detailerUpdater().then((response) => {
            mutate(response)
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
    
          }).catch((error) => {console.log(error)})
        }).catch((error) => {
          console.log("From commentForm:", error)
        });
      };
  return (
    <div className="card text-center">
        <div className="card-header">
          <ul
            className="nav nav-tabs card-header-tabs"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="lugar-tab"
                data-bs-toggle="tab"
                data-bs-target="#lugar"
                type="button"
                role="tab"
                aria-controls="lugar"
                aria-selected="true"
              >
                Place details
              </button>
            </li>

            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="comentarios-tab"
                data-bs-toggle="tab"
                data-bs-target="#comentarios"
                type="button"
                role="tab"
                aria-controls="comentarios"
                aria-selected="true"
              >
                Comments
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="lugar"
            role="tabpanel"
            aria-labelledby="lugar-tab"
          >
            <p>Name: <strong>{props.lugar.nombre}</strong> </p>
            <p>Author: <strong>{props.lugar.author.username}</strong></p>
            {authState.user.id === props.lugar.author._id && (
              <React.Fragment>
                <button
                  onClick={editarButtonHandler}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button onClick={borrarButtonHandler} className="btn btn-dark">
                  Erase
                </button>
              </React.Fragment>
            )}
          </div>

          <div
            className="tab-pane fade show"
            id="comentarios"
            role="tabpanel"
            aria-labelledby="comentarios-tab"
          >
            {authState.isUser && (
              <div className="mb-3">
                <button onClick={addCommentHandler} className="btn btn-dark">
                  Post a comment
                </button>
              </div>
            )}
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              {props.lugar.comentarios.map((comentario) => {
                return (
                  <div key={comentario._id} className="accordion-item">
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        <p>Made by: <strong>{comentario.author.username}</strong>, rating: <strong>{comentario.rating}</strong></p>
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>{comentario.cuerpo}</p>
                          <div>
                            {comentario.author._id === authState.user.id && (
                              <button
                                onClick={editCommentHandler.bind(null, comentario._id, comentario.cuerpo)}
                                className="btn btn-dark"
                              >
                                Editar
                              </button>
                            )}
                            {comentario.author._id === authState.user.id && (
                              <button
                                onClick={eraseCommentHandler.bind(
                                  null,
                                  comentario._id,
                                  authState.user.id
                                )}
                                className="btn btn-primary"
                              >
                                Borrar
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </div>
  );
};
export default Detailer
