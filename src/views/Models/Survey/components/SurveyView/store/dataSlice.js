import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetSalesProduct,
    apiPutSalesProduct,
    apiDeleteSalesProducts,
} from 'services/SalesService'
import { apiGetSurveByID } from 'services/SurveyService'
export const getProduct = createAsyncThunk(
    'salesProductEdit/data/getProducts',
    async (data) => {
        const response = await apiGetSalesProduct(data)
        return response.data
    }
)
export const getServeyById = createAsyncThunk(
    'crmCustomers/data/getServeyById',
    async (params) => {
        const response = await apiGetSurveByID(params)
        return response.data
    }
)

export const updateProduct = async (data) => {
    const response = await apiPutSalesProduct(data)
    return response.data
}

export const deleteProduct = async (data) => {
    const response = await apiDeleteSalesProducts(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'salesProductEdit/data',
    initialState: {
        loading: false,
        SurveyData: [],
    },
    reducers: {},
    extraReducers: {
        [getServeyById.fulfilled]: (state, action) => {
            state.SurveyData = action.payload
            state.loading = false
        },
        [getServeyById.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
