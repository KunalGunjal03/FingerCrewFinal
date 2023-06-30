import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {apiGetSurveList,apiGetSurveyStatistic,apiGetSurveByID,apiGetSurveByparam} from 'services/SurveyService'

export const getServeyList = createAsyncThunk(
    'crmCustomers/data/getServeyList',
    async (params) => {
        try{
            const response = await apiGetSurveList(params)
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
    name: 'crmCustomers/data',
    initialState: {
        loading: false,
        SurveyList: [],
        statisticData: {},
        tableData: [],
        filterData: [],
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.SurveyList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getServeyList.fulfilled]: (state, action) => {
            state.SurveyList = action.payload
            state.tableData.totalPages = action.payload.total
            state.loading = false
        },
        [getServeyList.pending]: (state) => {
            state.loading = true
        }
    },
})

export const { setTableData, setCustomerList, setFilterData } =
    dataSlice.actions


export default dataSlice.reducer
