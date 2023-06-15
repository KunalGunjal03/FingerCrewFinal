import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAccountFormData } from 'services/AccountServices'
import { apiGetAddressDetails } from 'services/AccountServices'
import { apiGetEducationDetails } from 'services/AccountServices'
import { apiGetSurveyorSkills } from 'services/AccountServices'
import { apiGetPreviousExp } from 'services/AccountServices'
import {apiGetCertificationDetails} from 'services/AccountServices'
import { apiGetBankDetails } from 'services/AccountServices'
import { apiGetInsuredDetails } from 'services/AccountServices'
import { apiGetKYCDetails } from 'services/AccountServices'
import { apiGetBackgroundDetails } from 'services/AccountServices'
export const getForm = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetAccountFormData(data)
        console.log( response)
        return response.data
    }
)
export const getAddress = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetAddressDetails(data)
        return response.data
    }
)
export const getEducation = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetEducationDetails(data)
        return response.data
    }
)
export const getSkills = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetSurveyorSkills(data)
        return response.data
    }
)
export const getPreviousExp = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetPreviousExp(data)
        console.log(response.data)
        return response.data
    }
)
export const getCertification = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetCertificationDetails(data)
        console.log(response)
        return response.data
    }
)
export const getBank = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetBankDetails(data)
        console.log(response)
        return response.data
    }
)
export const getInsured = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetInsuredDetails(data)
        console.log(response)
        return response.data
    }
)
export const getKYC = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetKYCDetails(data)
        console.log(response)
        return response.data
    }
) 
export const getBackground = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetBackgroundDetails(data)
        console.log(response)
        return response.data
    }
)
const dataSlice = createSlice({
    name: 'accountDetailForm/data',
    initialState: {
        formData: {
          getData:{
            surveyor_name: '',
            email_id: '',
            salutation:'',            
            mobile_no: '',           
            dob: ''
            // documentType: 'passport',
            // passportCover: '',
            // passportDataPage: '',
            // nationalIdFront: '',
            // nationalIdBack: '',
            // driversLicenseFront: '',
            // driversLicenseBack: '',
            // Address1: '',
            // Landmark: '',
            // city_name: '',
            // state_name: '',
            // zipCode: '',
            // latitude: '',
            // longitude: '',
            // qualification_name:'',
            // qualification_year:'',
            // certification_year:'',
            // certificate_name:'',
            // company_name:'',
            // job_role:'',
            // yearFrom:'',
            // yearTo:'',
            // skill_description:'',
            // bank_name:'',
            // routing_no:'',
            // account_no:''
          }
        },
        stepStatus: {
            0: { status: 'pending' },
            1: { status: 'pending' },
            2: { status: 'pending' },
            3: { status: 'pending' },
            4: { status: 'pending' },
            5: { status: 'pending' },
            6: { status: 'pending' },
            7: { status: 'pending' },
            8: { status: 'pending' },
            9: { status: 'pending' },
            10: { status: 'pending' },
           
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
        [getAddress.fulfilled]:(state,action) =>{
            state.formData.getData = action.payload.getData
            state.stepStatus = state.stepStatus
        }
    },
})

export const { setFormData, setStepStatus } = dataSlice.actions

export default dataSlice.reducer
