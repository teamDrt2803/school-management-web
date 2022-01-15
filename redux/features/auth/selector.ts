import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { initialState } from "./slice";

const selectSlice = (state: RootState) => state.auth || initialState;

export const SelectDrawerState = createSelector(
  [selectSlice],
  (state) => state.authDrawer
);

export const SelectIsUserAuthenticated = createSelector(
  [selectSlice],
  (state) => state.authState?.authenticated
);

export const SelectAuthStateLoader = createSelector(
  [selectSlice],
  (state) => state.authState?.loading
);

export const selectToastInfo = createSelector(
  [selectSlice],
  (state) => state.authToast,
);
