import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../../../../types";

const initialAuthState: Store.authState = {
    isUser: false,
    user: {
        username: null,
        id: null,
        accessToken: null
    }
};
const authState = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        setIsLogged: (prevState, action: PayloadAction<Store.authPayload>) => {
            prevState.isUser = true;
            prevState.user.username = action.payload.username;
            prevState.user.accessToken = action.payload.accessToken;
            prevState.user.id = action.payload.id
            localStorage.setItem("porongas", action.payload.accessToken);
        },
        setIsAutorizado: (state, action: PayloadAction<Store.authPayload>) => {
            state.isUser = true;
            state.user.username = action.payload.username;
            state.user.accessToken = action.payload.accessToken;
            state.user.id = action.payload.id
        },
        dropUser: (prevState) => {
            prevState.isUser = false;
            prevState.user.username = null;
            prevState.user.accessToken = null;
            prevState.user.id = null;
            localStorage.removeItem("porongas");
        }
    }
});
export default authState

