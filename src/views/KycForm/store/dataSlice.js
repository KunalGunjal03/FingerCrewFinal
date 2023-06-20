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
import { apiGetBackgroundDetails,apiGetUploadedDocuments } from 'services/AccountServices'
import { VerifyPersonalDetails,VerifyAddressDetails ,VerifyQualificationDetails,VerifyCertificateDetails,VerifyExperienceDetails,VerifySkillsDetails,VerifyBankDetails
,VerifyInsuranceDetails ,getVerificationTabs,VerifyKYCDetails,VerifyBgCheckDetails,VerifyDocumentsDetails
} from 'services/VerificationServices'
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
        console.log(data)
        const response = await apiGetAddressDetails(data)
        console.log(response.data)
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
export const getDocuments = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetUploadedDocuments(data)
        console.log(response)
        return response.data
    }
)
export const verifyPersonalDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifyPersonalDetails(data)
        console.log( response)
        return response
    }
)
export const verifyAddressDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifyAddressDetails(data)
        console.log( response)
        return response
    }
)
export const verifyQualificationDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifyQualificationDetails(data)
        console.log( response)
        return response
    }
)
export const verifyCertificationDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifyCertificateDetails(data)
        console.log( response)
        return response
    }
)
export const verifyExperienceDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifyExperienceDetails(data)
        console.log( response)
        return response
    }
)
export const verifySkillsDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifySkillsDetails(data)
        console.log( response)
        return response
    }
)

export const verifyBankDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifyBankDetails(data)
        console.log( response)
        return response
    }
)

export const verifyInsuranceDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifyInsuranceDetails(data)
        console.log( response)
        return response
    }
)

export const verifyBgCheckDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifyBgCheckDetails(data)
        console.log( response)
        return response
    }
)

export const getVerificationDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await getVerificationTabs(data)
        console.log( response)
        return response
    }
)
export const verifyKYCDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifyKYCDetails(data)
        console.log( response)
        return response
    }
)
export const verifyDocumentsDetails = createAsyncThunk(
    'accountDetailForm/data/getStatus',
    async (data) => {
        const response = await VerifyDocumentsDetails(data)
        console.log( response)
        return response
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
        
          },
        
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
        resp:
        {    
            status:'',
            remarks:''
        }
    },
    reducers: {
        setFormData: (state, action) => {
            state.formData.getData = { ...state.formData, ...action.payload }

        },
        setStepStatus: (state) => {
            state.stepStatus = { ...state.stepStatus}
        },
        // setResponse:(state,action) => {
        //     state.formData.response = {... state.formData, ...action.payload}
        // }
    },
    extraReducers: {
        [getForm.fulfilled]: (state, action) => {
            state.formData.getData = action.payload.getData
            // state.stepStatus = state.stepStatus
            state.resp = action.payload.status
        },
        [getAddress.fulfilled]:(state,action) =>{
            state.formData.getData = action.payload.getData
            // state.stepStatus = state.stepStatus
        }
        ,
        // [verifyPersonalDetails.fulfilled]:(state,action) =>{
        //     state.formData.response = action.payload
        // }

    },
})

export const { setFormData, setStepStatus} = dataSlice.actions

export default dataSlice.reducer
