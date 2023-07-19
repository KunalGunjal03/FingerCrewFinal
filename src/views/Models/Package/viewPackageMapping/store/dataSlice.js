import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSinglePackageMapping } from 'services/package'
export const getForm = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetSinglePackageMapping(data)
        console.log(response.data)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'accountDetailForm/data',
    initialState: {
        formData: {
        getData:{
        package_price: '',
        tax:'',
        service_fees:'',
        package_validity:'',
        service_price:'',
        no_of_survey_book_at_time: '',
        storage_limitations:'',
        limited_information_form: '',
        screen_limitations: '',
        priority_support: '',
        training_and_support:'',
        dedicated_support:'',
        dedicated_account_manager: '',
        design_permit_package:'',
        free_sld: '',
        installer_master_id:'',
        package_mast_id: '',
        package_valid_from:'',
        package_valid_to: '',
        no_of_survey_conducted:''
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
