import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetreqlistsSurveyor,
    apiDeleteSalesProducts,
    apigetStates,
    apigetCities,
} from 'services/SalesService'

export const getreqSurveyor = createAsyncThunk(
    'listsSurveyorList/data/getSurveyor',
    async (data) => {
        console.log(data)
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
export const getStates = createAsyncThunk(
    'listsSurveyorList/data/getStates',
    async (data) => {
        console.log(data)
        try{
           const response = await apigetStates(data)
           console.log(response)
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
export const getCities = createAsyncThunk(
    'listsSurveyorList/data/getCities',
    async (state_id) => {
      console.log('getCities action dispatched with state_id:', state_id);
  
      try {
        const response = await apigetCities(state_id); // Use state_id here
        console.log('getCities response:', response.data);
        return response.data;
      } catch (error) {
        console.error('getCities error:', error);
        return error;
      }
    }
  );
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
        filterData: [],
        states: [],
        cities: [],
      
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
        setStates: (state, action) => {
            state.states = action.payload;
          },
          setCities: (state, action) => {
            state.cities = action.payload;
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
        [getStates.fulfilled]: (state, action) => {
            state.states = action.payload;
        },
        [getCities.fulfilled]: (state, action) => {
            state.cities = action.payload;
      }
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
} = dataSlice.actions
export const { setStates, setCities } = dataSlice.actions;

export default dataSlice.reducer
