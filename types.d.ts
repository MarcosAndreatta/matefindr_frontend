import { SWRResponse } from "swr";

namespace FetchingData {
  interface response {
    message: string;
    action: string;
    lugar: {
      _id: string;
      nombre: string;
      author: {
        _id: string;
        username: string;
        password: string;
        lugares: any[];
        comentarios: any[];
      };
      comentarios:
        | {
            _id: string;
            cuerpo: string;
            rating: number;
            author: {
              _id: string;
              username: string;
            };
          }[]
        | null;
      ubicacion: [number, number];
    };
  }
  interface configuracion {
    modo: modos;
    url?: string;
    data?: unknown;
    accessToken?: string;
  }
  interface Respuesta {
    message?: string;
    action: setter;
    user?: {
      username: string;
      accessToken: string;
      _id: string;
    };
    additionalInfo?: any;
  }
}
namespace State {
  type modos =
    | "registrar"
    | "loguear"
    | "autorizar"
    | "postear"
    | "patchear"
    | "borrar"
    | "checkIfUserAlreadyExists";
  type setter = "setIsError" | "setIsLogged" | "setIsAutorizado" | "setIsOk";

  type intersectionHandler = (entries: any[], observer: any) => void;
  type lugarMinimal = {
    nombre: string;
    ubicacion: [number, number];
    _id: string;
    autor_id: string;
  };
}
namespace Store {
  type actionResult = "info" | "error" | "success" | null;
  interface actionsState {
    actionResult: actionResult;
    message: null | string;
  }
  interface actionsStatePayload {
    actionResult: actionResult;
    message: string;
  }
  interface authState {
    isUser: boolean;
    user: {
      username: string | null;
      id: string | null;
      accessToken: null | string;
    };
  }
  interface authPayload {
    username: string;
    id: string;
    accessToken: string;
  }
  interface comentario {
    _id: string;
    cuerpo: string;
    rating: number;
    author: {
      _id: string;
      username: string;
    };
  }
  interface detailerState {
    algoParamostrar: boolean;
    lugar: {
      _id: string;
      nombre: string;
      author: {
        _id: string;
        username: string;
      };
      comentarios: comentario[] | null;
    } | null;
  }
  interface detailerStatePayload {
    algoParamostrar: boolean;
    lugar?: {
      _id: string;
      nombre: string;
      author: {
        _id: string;
        username: string;
      };
      comentarios: comentario[] | null;
    };
  }
  interface modalState {
    modo: modalCommands;
    formOptions?: {
      nombre: string;
      lugar_id: string;
      comentario: string;
      comentario_id: string;
      detailerMutateFunction: SWRResponse["mutate"]
    };
  }
  interface modalPayload {
    modo: modalCommands;
    formOptions?: {
      nombre: string | null;
      lugar_id: string | null;
      comentario: string | null;
      comentario_id: string | null;
      detailerMutateFunction: SWRResponse["mutate"]
    };
  }
  type modalCommands = "showEditingForm" | "showLoadingSpinner" | "showAddCommentForm" | "showEditCommentForm" | "Login" | "Register" | "stayClosed";
}
