import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetRejectionList,apiGetBookingDetails } from 'services/BookingServices'


export const getRejectionList = createAsyncThunk(
    'crmRejectionlist/data/getBookingList',
    async (params) => {
        try{
            const response = await apiGetRejectionList(params)
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
    'crmRejectionlist/data/getBookingDetails',
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
    name: 'crmRejectionlist/data',
    initialState: {
        loading: false,
        RejectionList: [],
        BookingDetails:[],
        filterData: [],
    },
    reducers: {
        
        setRejectionList: (state, action) => {
            state.RejectionList = action.payload
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
        .addCase(getRejectionList.fulfilled,(state, action)=>{
            state.RejectionList = action.payload
            state.loading = false
        })
        .addCase(getBookingDetails.fulfilled, (state, action) => {
            state.BookingDetails = action.payload
          })
    
     
    },
})

export const {  setRejectionList, setFilterData,setBookingDetails } =
    dataSlice.actions


export default dataSlice.reducer