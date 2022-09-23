import { createSlice } from '@reduxjs/toolkit';
import { IVaccine } from '../../interface/IVaccine';

const defaultValue: IVaccine = {
  id: 0,
  name: '',
  description: '',
  numberOfDoses: 0,
  releaseDate: new Date(),
  photoUrl: '',
  isMandatory: false,
};

export const vaccineSlice = createSlice({
  name: 'vaccineInfo',
  initialState: defaultValue,
  reducers: {
    loadVaccine: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.numberOfDoses = action.payload.numberOfDoses;
      state.releaseDate = action.payload.releaseDate;
      state.photoUrl = action.payload.photoUrl;
      state.isMandatory = action.payload.isMandatory;
    },
    resetVaccine: (state: IVaccine) => {
      state.id = 0;
      state.name = '';
      state.description = '';
      state.numberOfDoses = 0;
      state.releaseDate = new Date();
      state.photoUrl = '';
      state.isMandatory = false;
    },
    changePhotoUrl: (state, action) => {
      state.photoUrl = action.payload;
    },
  },
});

export const { loadVaccine, resetVaccine, changePhotoUrl } =
  vaccineSlice.actions;
export const vaccineReducer = vaccineSlice.reducer;
