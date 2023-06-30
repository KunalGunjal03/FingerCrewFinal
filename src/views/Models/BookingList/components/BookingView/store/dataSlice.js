
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetBookSurveyByID } from 'services/BookingServices'


export const getBookServeyById = createAsyncThunk(
    'crmBookingDetails/data/getBookServeyById',
    async (params) => {
        const response = await apiGetBookSurveyByID(params)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'crmBookingDetails/data',
    initialState: {
        loading: false,
        SurveyData: [],
    },
    reducers: {},
    extraReducers: {
        [getBookServeyById.fulfilled]: (state, action) => {
            state.SurveyData = action.payload
            state.loading = false
        },
        [getBookServeyById.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer