import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../../../../types";
// class ChangeManager {
//   payloadToDispatch: Store.detailerStatePayload | null;
//   constructor () {
//     this.payloadToDispatch = null;
//   }
//   isNewPayloadDifferentToThisOneBasedOnPlaceId(
//     payload: Store.detailerStatePayload
//   ) {
//     return this.payloadToDispatch.lugar._id === payload.lugar._id;
//   }
//   registerPayload(payload: Store.detailerStatePayload) {
//     this.payloadToDispatch = payload;
//   }
//   isAlreadyAPayloadRegistered() {
//     if (this.payloadToDispatch) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }
// const changeManager = new ChangeManager();

const initialDetailerState: Store.detailerState = {
  algoParamostrar: false,
  lugar: null,
};
const detailerState = createSlice({
  name: "detailer",
  initialState: initialDetailerState,
  reducers: {
    setNewDetailerState: (
      prevState,
      payload: PayloadAction<Store.detailerStatePayload>
    ) => {
      prevState.algoParamostrar = true;
      prevState.lugar = payload.payload.lugar;
      // if (changeManager.isAlreadyAPayloadRegistered()) {
      //   console.log("Previos payload registered")
      //   if (!changeManager.isNewPayloadDifferentToThisOneBasedOnPlaceId(payload.payload)) {
      //     changeManager.registerPayload(payload.payload);
      //     prevState.algoParamostrar = changeManager.payloadToDispatch.algoParamostrar;
      //     prevState.lugar = changeManager.payloadToDispatch.lugar
      //   }
      // } else {
      //   console.log("Not a previous payñpad")
      //   changeManager.registerPayload(payload.payload);
      //   prevState.algoParamostrar = changeManager.payloadToDispatch.algoParamostrar;
      //   prevState.lugar = changeManager.payloadToDispatch.lugar
      // }
      
      
    },
    emptyDetailerState: (prevState) => {
      prevState.algoParamostrar = false;
      prevState.lugar = null;
    },
  },
});
export default detailerState;
