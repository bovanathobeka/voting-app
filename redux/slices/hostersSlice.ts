import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface HostersState {
  name: string;
  idNo: string;
  accountNo: string;
  images: string[];
}

const initialState: HostersState = {
  name: '',
  idNo: '',
  accountNo: '',
  images: [],
};

const hostersSlice = createSlice({
  name: 'hosters',
  initialState,
  reducers: {
  setHosterName(state, action: PayloadAction<string>) {
    state.name = action.payload;
  },
  setIdNo(state, action: PayloadAction<string>) {
    state.idNo = action.payload;
  },
  setAccountNo(state, action: PayloadAction<string>) {
    state.accountNo = action.payload;
  },
  setImages(state, action: PayloadAction<string[]>) {
    state.images = action.payload;
  },
}

});

export const {
  setHosterName,
  setIdNo,
  setAccountNo,
  setImages,
} = hostersSlice.actions;
export default hostersSlice.reducer;
