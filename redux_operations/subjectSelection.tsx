import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface SubjectsState {
    value: boolean[]
}
const initialState: SubjectsState = {
    value: [false, true, false],
}

export const subjectSelection = createSlice({
    name: 'subjectSelection',
    initialState,
    reducers: {

        incrementByAmount: (state: SubjectsState, action: PayloadAction<boolean[]>) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {  incrementByAmount } = subjectSelection.actions

export const selectCount = (state: RootState) => state.subjects.value

export default subjectSelection.reducer
