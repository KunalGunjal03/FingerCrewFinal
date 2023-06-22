import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSingleUser } from 'services/userApi'
export const getForm = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetSingleUser(data)
        console.log(response.data)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'accountDetailForm/data',
    initialState: {
        formData: {
          getData:{
            user_id: '',
            employee_code: '',
            username: '',
            user_fullname: '',
            user_mail_id: '',
            contact_detail: '',
            user_role: '',
            password:''
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
