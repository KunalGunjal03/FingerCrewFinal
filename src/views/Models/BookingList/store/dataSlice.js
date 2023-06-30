import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetBookingList } from 'services/BookingServices'


export const getBookingList = createAsyncThunk(
    'crmBookinglist/data/getBookingList',
    async (params) => {
        try{
            const response = await apiGetBookingList(params)
            console.log(response)
            return response.data
        }
        catch(error)
        {
            console.error(error)
            return error
        }
        
       
        
    }
)
const dataSlice = createSlice({
    name: 'crmBookinglist/data',
    initialState: {
        loading: false,
        BookingList: [],
        filterData: [],
    },
    reducers: {
        
        setBookingList: (state, action) => {
            state.BookingList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(getBookingList.fulfilled,(state, action)=>{
            state.BookingList = action.payload
            state.loading = false
        })
     
    },
})

export const {  setBookingList, setFilterData } =
    dataSlice.actions


export default dataSlice.reducer