import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../../../../types";


const initialModalState: Store.modalState = {
    modo: "stayClosed"
};
const modalState = createSlice({
    name: "modal",
    initialState: initialModalState,
    reducers: {
        showLoadingSpinner: (prevState) => {
            prevState.modo = "showLoadingSpinner";
        },
        showEditingForm: (prevState, actions: PayloadAction<Store.modalPayload>) => {
            prevState.modo = "showEditingForm";
            prevState.formOptions = actions.payload.formOptions
        },
        showAddCommentForm: (prevState, actions: PayloadAction<Store.modalPayload>) => {
            prevState.modo = "showAddCommentForm";
            prevState.formOptions = actions.payload.formOptions
        },
        showEditCommentForm: (prevState, actions: PayloadAction<Store.modalPayload>) => {
            prevState.modo = "showEditCommentForm";
            prevState.formOptions = actions.payload.formOptions;
        },
        register: (prevState, actions: PayloadAction<Store.modalPayload>) => {
            prevState.modo = "Register";
            prevState.formOptions = actions.payload.formOptions;
        },
        login: (prevState, actions: PayloadAction<Store.modalPayload>) => {
            prevState.modo = "Login";
            prevState.formOptions = actions.payload.formOptions;
        },
        closeModal: (prevState) => {
            prevState.modo = "stayClosed";
        }
    }
});
export default modalState