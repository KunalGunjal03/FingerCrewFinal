import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetlistsInstallerSurveyCount,
    apiDeleteSalesProducts,
} from 'services/SalesService'

export const getInstallerDetails = createAsyncThunk(
    'listsInstallerList/data/getInstaller',
    async (data) => {
        try{
           const response = await apiGetlistsInstallerSurveyCount(data)
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
    name: 'listsInstallerList/data',
    initialState: {
        loading: false,
        InstallerList: [],
        tableData: initialTableData,
        //filterData: initialFilterData,
    },
    reducers: {
        updateInstallerList: (state, action) => {
            state.InstallerList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getInstallerDetails.fulfilled]: (state, action) => {
            state.InstallerList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getInstallerDetails.pending]: (state) => {
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
