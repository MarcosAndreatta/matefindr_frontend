import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../../../../types";

const initialActionsState: Store.actionsState = {
    actionResult: null,
    message: null
};
const actionsState = createSlice({
    name: "actions",
    initialState: initialActionsState,
    reducers: {
        setIsError: (prevState, action: PayloadAction<Store.actionsStatePayload>) => {
            prevState.actionResult = "error";
            prevState.message = action.payload.message
        },
        setIsInfo: (prevState, action: PayloadAction<Store.actionsStatePayload>) => {
            prevState.actionResult = "info";
            prevState.message = action.payload.message;
        },
        setIsSuccess: (prevState, action: PayloadAction<Store.actionsStatePayload>) => {
            prevState.actionResult = "success";
            prevState.message = action.payload.message;
        },
        eraseActionsState: (prevState) => {
            prevState.actionResult = null;
            prevState.message = null;
        }
    }
});
export default actionsState
