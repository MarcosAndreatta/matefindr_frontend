import { configureStore } from "@reduxjs/toolkit";
import authState from "./slices/auth";
import actionsState from "./slices/actions";
import modalState from "./slices/modal";
import detailerState from "./slices/detailer";
/////////////////////////////////Interfaces////////////////////////////////
const store = configureStore({
    reducer: {auth: authState.reducer, actions: actionsState.reducer, modal: modalState.reducer, detailer: detailerState.reducer}
});
export default store;
export const authActions = authState.actions;
export const actionsActions = actionsState.actions;
export const modalActions = modalState.actions;
export const detailerActions = detailerState.actions;
export type RootState = ReturnType<typeof store.getState> // Customizando el RootState
export type AppDispatch = typeof store.dispatch