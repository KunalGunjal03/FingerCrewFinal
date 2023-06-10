import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {apiGetSurveList,apiGetSurveyStatistic,apiGetSurveByID} from 'services/SurveyService'

export const getSurveyStatistic = createAsyncThunk(
    'crmCustomers/data/getSurveyStatistic',
    async () => {
        const response = await apiGetSurveyStatistic()
        return response.data
    }
)

export const getServeyList = createAsyncThunk(
    'crmCustomers/data/getServeyList',
    async (params) => {
        try{
            const response = await apiGetSurveList(params)
            return response.data
        }
        catch(error)
        {
            console.error(error)
            return error
        }
        
       
        
    }
)

export const getServeyListById = createAsyncThunk(
    'crmCustomers/data/getServeyList',
    async (params) => {
        try{
            const response = await apiGetSurveByID(params)
            return response.data
        }
        catch(error)
        {
            console.error(error)
            return error
        }
        
       
        
    }
)



export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}
export const initialFilterData = {
    name: '',
    category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
    status: [0, 1, 2],
    productStatus: 0,
}


const dataSlice = createSlice({
    name: 'crmCustomers/data',
    initialState: {
        loading: false,
        SurveyList: [],
        statisticData: {},
        tableData: initialTableData,
        filterData: initialFilterData,
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
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getServeyList.pending]: (state) => {
            state.loading = true
        },
        [getSurveyStatistic.pending]: (state) => {
            state.statisticLoading = true
        },
        [getSurveyStatistic.fulfilled]: (state, action) => {
            state.statisticData = action.payload
            state.statisticLoading = false
        },
    },
})

export const { setTableData, setCustomerList, setFilterData } =
    dataSlice.actions


export default dataSlice.reducer
