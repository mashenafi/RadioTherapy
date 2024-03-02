// src/state/AppState.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface formDataFrame {
  MRN: string;
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

export const formDataInitial = {
  MRN: "",
  PlanName: "",
  ASC: "",
  Technique: "",
  Energy: "",
  Dose: -1,
  FieldStart: -1,
  FieldStop: -1,
  ClearCheck: -1,
  Complexity: -1,
  MU: -1,
  PD_Gamma: -1,
  BeamOnTime: -1,
  TxSite: "",
  QAShot: "",
  Note: "",
  OblFactor: ""
}

export interface appStateType {
    formData: formDataFrame;
    planId: string;
}

const initialState: appStateType = {
    formData: formDataInitial,
    planId: "None",
};

const appState = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setformData: (state, action: PayloadAction<formDataFrame>) => {
      state.formData = action.payload;
    },
    setPlanId: (state, action: PayloadAction<string>) => {
      state.planId = action.payload;
      },
  },
});

export const { setformData, setPlanId} = appState.actions;

export default appState.reducer;
