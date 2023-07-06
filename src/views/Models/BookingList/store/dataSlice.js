import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetBookingList,apiGetBookingDetails } from 'services/BookingServices'


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

export const getBookingDetails = createAsyncThunk(
    'crmBookinglist/data/getBookingDetails',
    async (params) => {
        try{
            const response = await apiGetBookingDetails(params)
            console.log(response.data)
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
        BookingDetails:[],
        filterData: [],
    },
    reducers: {
        
        setBookingList: (state, action) => {
            state.BookingList = action.payload
        },
        setBookingDetails:(state,action)=>{
        state.BookingDetails = action.payload
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
        .addCase(getBookingDetails.fulfilled, (state, action) => {
            state.BookingDetails = action.payload
          })
    
     
    },
})

export const {  setBookingList, setFilterData,setBookingDetails } =
    dataSlice.actions


export default dataSlice.reducer