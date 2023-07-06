import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetreqlistsSurveyor,
    apiDeleteSalesProducts,
} from 'services/SalesService'

export const getreqSurveyor = createAsyncThunk(
    'listsSurveyorList/data/getSurveyor',
    async (data) => {
        try{
           const response = await apiGetreqlistsSurveyor(data)
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

export const deleteProduct = async (data) => {
    const response = await apiDeleteSalesProducts(data)
    return response.data
}

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

// export const initialFilterData = {
//     name: '',
//     category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
//     status: [0, 1, 2],
//     productStatus: 0,
// }

const dataSlice = createSlice({
    name: 'listsSurveyorList/data',
    initialState: {
        loading: false,
        surveyorList: [],
        tableData: initialTableData,
        //filterData: initialFilterData,
    },
    reducers: {
        updatesurveyorList: (state, action) => {
            state.surveyorList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getreqSurveyor.fulfilled]: (state, action) => {
            state.surveyorList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getreqSurveyor.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
} = dataSlice.actions

export default dataSlice.reducer
