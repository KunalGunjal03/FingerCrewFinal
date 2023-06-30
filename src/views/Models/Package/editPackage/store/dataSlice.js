import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSinglePackage } from 'services/package'
export const getForm = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetSinglePackage(data)
        console.log(response.data)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'accountDetailForm/data',
    initialState: {
        formData: {
          getData:{
            package_mast_id: '',
            package_name: '',
            price: '',
            tax: '',
            service_fees: '',
            package_validity: ''
          }
        },
        stepStatus: {
            0: { status: 'pending' },     
        },
    },
    reducers: {
        setFormData: (state, action) => {
            state.formData.getData = { ...state.formData, ...action.payload }
        },
        setStepStatus: (state) => {
            state.stepStatus = { ...state.stepStatus}
        },
    },
    extraReducers: {
        [getForm.fulfilled]: (state, action) => {
            state.formData.getData = action.payload.getData
            state.stepStatus = state.stepStatus
        },
    },
})

export const { setFormData, setStepStatus } = dataSlice.actions

export default dataSlice.reducer
