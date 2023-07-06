import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'






const dataSlice = createSlice({
    name: 'surveyDetailForm/data',
    initialState: {
        formData: {
          getData:{
            survey_no: '',
            surveyor_name: '',
            survey_location: '',
            survey_client_name:'',            
            survey_scheduled_date: '',           
            survye_status: ''
            
          }
        },
        stepStatus: {
            0: { status: 'pending' },
             1: { status: 'pending' },
             2: { status: 'pending' },
              3: { status: 'pending' },
            // 4: { status: 'pending' },
            // 5: { status: 'pending' },
            // 6: { status: 'pending' },
            // 7: { status: 'pending' },
            // 8: { status: 'pending' },
            // 9: { status: 'pending' },
            // 10: { status: 'pending' },
           
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
    
})

export const { setFormData, setStepStatus } = dataSlice.actions

export default dataSlice.reducer
