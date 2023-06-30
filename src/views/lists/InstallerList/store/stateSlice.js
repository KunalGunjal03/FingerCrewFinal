import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'listsInstallerList/state',
    initialState: {
        deleteConfirmation: false,
        selectedSurveyor: '',
    },
    reducers: {
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedSurveyor: (state, action) => {
            state.selectedSurveyor = action.payload
        },
    },
})

export const { toggleDeleteConfirmation, setSelectedSurveyor } =
    stateSlice.actions

export default stateSlice.reducer
