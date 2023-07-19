import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetElectricDetails,apiGetSurveyDetails } from 'services/BookingServices'

export const getSurveyDetails = createAsyncThunk(
    'surveyDetailForm/data/getBookingDetails',
    async (params) => {
        try{
            const response = await apiGetSurveyDetails(params)
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
export const getElectricDetails = createAsyncThunk(
    'surveyDetailForm/data/getElectricDetails',
    async (params) => {
        try{
            const response = await apiGetElectricDetails(params)
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
        loading: false,
        BookingList: [],
        BookingDetails:[],
        ElectricDetails:[],
        filterData: [],
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
        setBookingDetails:(state,action)=>{
            state.BookingDetails = action.payload
            },
        setStepStatus: (state) => {
            state.stepStatus = { ...state.stepStatus}
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(getSurveyDetails.fulfilled, (state, action) => {
            state.BookingDetails = action.payload
          })
        .addCase(getElectricDetails.fulfilled,(state,action) =>{
            state.ElectricDetails =action.payload   
        })
    
     
    },
    
})

export const { setFormData, setStepStatus } = dataSlice.actions

export default dataSlice.reducer
