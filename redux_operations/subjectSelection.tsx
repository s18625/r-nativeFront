import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Tutor} from "../Models/models";

interface SubjectsState {
    value: boolean[],
    tutor: {},
    subId:number;
}
const initialState: SubjectsState = {

    value: [],
    tutor:{},
    subId:0,

}

export const subjectSelection = createSlice({
    name: 'subjectSelection',
    initialState,
    reducers: {

        incrementByAmount: (state: SubjectsState, action: PayloadAction<boolean[]>) => {
            state.value = action.payload
        },
        setId: (state: SubjectsState, action: PayloadAction<{}>) => {
            state.tutor = action.payload
        },
        setSub: (state: SubjectsState, action: PayloadAction<number>) => {
            state.subId = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {  incrementByAmount,setId,setSub } = subjectSelection.actions

export const selectCount = (state: RootState) => state.subjects.value

export default subjectSelection.reducer
