// src/state/DataLoadingState.tsx

import { createSlice } from "@reduxjs/toolkit";

export interface dataFrame{
    id: string;
    MRN: string;
    CreatedOn: Date;
    PlanName: string;
    ASC: string;
    Technique: string;
    Energy: string;
    Dose: number;
    FieldStart: number;
    FieldStop: number;
    ClearCheck: number;
    Complexity: number;
    MU: number;
    PD_Gamma: number;
    BeamOnTime: number;
    TxSite: string;
    QAShot: string;
    Note: string;
    OblFactor: string;
    [key: string]: any;
}

export interface LoadingDataState {
    planData: dataFrame[];
    isLoading: boolean;
}

const initialState: LoadingDataState = {
    planData: [],
    isLoading: false
};

export const planSlice = createSlice({
    name: 'plans',
    initialState,
    reducers:{
        getPlansData: (state)=>{
            state.isLoading = true;
        },
        getPlansDataSuccess: (state, action)=>{
            // sucess action
            state.isLoading = false;
            state.planData = action.payload;
        },
        getPlansDataFailure: (state)=>{
            state.isLoading = false;
        }
    }
});

export const {getPlansDataFailure, getPlansDataSuccess, getPlansData}= planSlice.actions;
export default planSlice.reducer;