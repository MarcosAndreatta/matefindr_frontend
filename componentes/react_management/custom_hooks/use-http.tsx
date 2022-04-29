import { useAppSelector, useAppDispatch } from "../store/hooks";
import { authActions, actionsActions, modalActions } from "../store";
import { useCallback } from "react";
import { FetchingData } from "../../../types";

const useHttpandmanageStates = () => {
    const authState = useAppSelector((states) => {return states.auth});
    const actionsState = useAppSelector((states) => {return states.actions});
    const detailerState = useAppSelector((states) => {return states.detailer});
    const dispatcher = useAppDispatch();
    const httpFunction = useCallback(
        async (configuracion: FetchingData.configuracion) => {
            if (configuracion.modo === "registrar") {
                try {
                    dispatcher(modalActions.showLoadingSpinner());
                    const preliminaryResponse = await fetch(configuracion.url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(configuracion.data)
                    });
                    if (!preliminaryResponse.ok) {
                        const error = await preliminaryResponse.json();
                        dispatcher(modalActions.closeModal());
                        return dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))
                    }
                    const response: FetchingData.Respuesta = await preliminaryResponse.json();
                    
                    dispatcher(actionsActions.setIsSuccess({actionResult: "success", message: response.message}));
                } catch (error: any) {
                    dispatcher(modalActions.closeModal());
                    dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))
                } 
            }
            if (configuracion.modo === "loguear") {
                try {
                    dispatcher(modalActions.showLoadingSpinner());
                    const preliminaryResponse = await fetch(configuracion.url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(configuracion.data)
                    });
                    if (!preliminaryResponse.ok) {
                        const error = await preliminaryResponse.json();
                        dispatcher(modalActions.closeModal());
                        return dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))
                    }
                    const response: FetchingData.Respuesta = await preliminaryResponse.json();
                    
                    dispatcher(authActions.setIsLogged({
                        username: response.user.username,
                        id: response.user._id,
                        accessToken: response.user.accessToken
                    }));
                    dispatcher(actionsActions.setIsSuccess({actionResult: "success", message: response.message}))
                }
                catch (error) {
                    dispatcher(modalActions.showLoadingSpinner());
                    dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))
                }
            };
            if (configuracion.modo === "autorizar") { 
                try {
                    dispatcher(modalActions.showLoadingSpinner());
                    const preliminaryResponse = await fetch(configuracion.url, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${configuracion.accessToken}`
                            
                        },  
                    });
                    if (!preliminaryResponse.ok) {
                        const error = await preliminaryResponse.json();
                        dispatcher(modalActions.closeModal());
                        return dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message === "TokenExpiredError: jwt expired" ? "Try to log in again" : error.message}))
                    }
                    const response: FetchingData.Respuesta = await preliminaryResponse.json()
                    dispatcher(modalActions.closeModal());
                    dispatcher(authActions.setIsAutorizado({
                        username: response.user.username,
                        id: response.user._id,
                        accessToken: response.user.accessToken
                    }));
                    dispatcher(actionsActions.setIsSuccess({actionResult: "success", message: response.message}))
                }
                catch (error) {
                    dispatcher(modalActions.closeModal());
                    dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))                            
                }
            };
            if (configuracion.modo === "postear") { 
                try {
                    dispatcher(modalActions.showLoadingSpinner());
                    const preliminaryResponse = await fetch(configuracion.url, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${configuracion.accessToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(configuracion.data)
                    });
                    if (!preliminaryResponse.ok) {
                        const error = await preliminaryResponse.json();
                        dispatcher(modalActions.closeModal());
                        return dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))
                    }
                    const response: FetchingData.Respuesta = await preliminaryResponse.json()
                    
                    dispatcher(actionsActions.setIsSuccess({actionResult: "success", message: response.message}))
                }
                catch (error) {
                    dispatcher(modalActions.closeModal());
                    dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))                           
                }
            };
            if (configuracion.modo === "patchear") { 
                try {
                    dispatcher(modalActions.showLoadingSpinner());
                    const preliminaryResponse = await fetch(configuracion.url, {
                        method: "PATCH",
                        headers: {
                            "Authorization": `Bearer ${configuracion.accessToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(configuracion.data)
                    });
                    if (!preliminaryResponse.ok) {
                        const error = await preliminaryResponse.json();
                        dispatcher(modalActions.closeModal());
                        return dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))
                    }
                    const response: FetchingData.Respuesta = await preliminaryResponse.json()
                    
                    dispatcher(actionsActions.setIsSuccess({actionResult: "success", message: response.message}))
                }
                catch (error) {
                    dispatcher(modalActions.closeModal());
                    dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))                         
                }
            };
            if (configuracion.modo === "borrar") { 
                try {
                    dispatcher(modalActions.showLoadingSpinner());
                    const preliminaryResponse = await fetch(configuracion.url, {
                        method: "DELETE",
                        headers: {
                            "Authorization": `Bearer ${configuracion.accessToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(configuracion.data)
                    });
                    if (!preliminaryResponse.ok) {
                        const error = await preliminaryResponse.json();
                        dispatcher(modalActions.closeModal());
                        return dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))
                    }
                    const response: FetchingData.Respuesta = await preliminaryResponse.json()
                    dispatcher(modalActions.closeModal());
                    dispatcher(actionsActions.setIsSuccess({actionResult: "success", message: response.message}))
                }
                catch (error) {
                    dispatcher(modalActions.closeModal());
                    dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))                            
                }
            };
            if (configuracion.modo === "checkIfUserAlreadyExists") {
                try {
                    
                    const preliminaryResponse = await fetch(configuracion.url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(configuracion.data)
                    });
                    if (!preliminaryResponse.ok) {
                        const error = await preliminaryResponse.json();
                        return dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))
                    };
                    const response: FetchingData.Respuesta = await preliminaryResponse.json();
                    return response
                }
                catch (error) {
                    dispatcher(actionsActions.setIsError({actionResult: "error", message: error.message}))
                }
            }
        }
    ,[dispatcher]);
    return {
        authState,
        actionsState,
        detailerState,
        httpFunction
    }
};
export default useHttpandmanageStates