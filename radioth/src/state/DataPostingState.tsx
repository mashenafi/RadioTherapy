// src/state/DataPostingState.tsx

import { createSlice } from "@reduxjs/toolkit";

export interface PostingDataState {
    serverMessage: string;
    isPosting: boolean;
}

const initialState: PostingDataState = {
    serverMessage: "",
    isPosting: false,
};

export const postPlanSlice = createSlice({
    name: 'postPlans',
    initialState,
    reducers:{
        startPlanPosting: (state, action)=>{
            state.isPosting = true;
        },
        serverUpdateResult: (state, action)=>{
            // sucess or failire action
            state.isPosting = false;
            state.serverMessage = action.payload;
        },
        startPlanRemoving: (state, action)=>{
            state.isPosting = true;
        },
        startPlanUpdating: (state, action)=>{
            state.isPosting = true;
        },
    }
});

export const {startPlanPosting, serverUpdateResult, startPlanRemoving, startPlanUpdating}= postPlanSlice.actions;
export default postPlanSlice.reducer;