import React, { useCallback } from 'react'
import {
    Input,
    Button,
    Checkbox,
    Select,
    FormItem,
    FormContainer,
    Dialog,
    Notification,
    toast,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import get from 'lodash/get'
import { countryList } from 'constants/countries.constant'
import {FiCheckCircle} from 'react-icons/fi'
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect,useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { getAddress } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'
import { verifyAddressDetails } from '../store/dataSlice'
import * as Yup from 'yup'
import { text } from 'd3-fetch'


const AddressInfomation = ({
    data = {
        //Surveyor_master_id: '',
        Address1: '',
        Address2: '',
        Address3: '',
        Landmark: '',
        city_name:'',
        state_name: '',
        zip_code: '',
        latitude:'',
        longitude:''
    },
    onNextChange,
    currentStepStatus,
}) => {
    

     
        
    const location = useLocation()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
     useEffect(() => {
         const path = location.pathname.substring(
         location.pathname.lastIndexOf('/') + 1
     )
     const requestParam = {surveyor_master_id : path , 
        token : token , 
        tokenKey : tokenKey
    }
        
 
     fetchData(requestParam);
 }, []);
 const dispatch = useDispatch()
 const fetchData = (requestParam) => {
     try {
       dispatch(getAddress( requestParam));
       //console.log(surveyor_master_id)
       
     } catch (error) {
       console.error(error);
       return error;
     }
};
   const formData = useSelector(
    (state) => state.accountDetailForm.data.formData.getData
)
console.log(data)
const responseData = useSelector(
    (state) => state.accountDetailForm.data.formData.responseData
)
console.log(responseData)
// const d =  useSelector(
//     (state) => state.accountDetailForm.data.getData
// )
// console.log(d)
// const {signOut} = useAuth()

// if(formData === null )
// {
//     try{
//         dispatch(signOut)
//     }
//     catch(error)
//     {
//         console.log(error)
//     }
// }
const [dialogIsOpen, setIsOpen] = useState(false)
const [dialog1IsOpen,setIsOpen1] = useState(false)
const openNotification = (type,msg) => {
    toast.push(
        <Notification
            title={msg}
            type={type}
            
        />,{
            placement: 'top-end'
        })
            
       
    
}
const openDialog = (e) => {
    setIsOpen(true)

}
const OpenRejectionDialog = (e)=>{
    setIsOpen1(true)
}
const onDialogClose = (e) => {
   console.log(e)
//    OpenRejectionDialog()
   
    setIsOpen(false)
    // setRejectionRemarkVisible(true)
}
const onDialog1Close = (e) => {
    setIsOpen(true)
     setIsOpen1(false)
     // setRejectionRemarkVisible(true)
 }
// let isVerified = false;
const onDialogOk = async(status,values)=>{

  var verified = {}
//   setIsOpen(true)
//   setIsOpen1(true)
    
    try
    {
        // if(status === "Reject")
        // {
            verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
            console.log(verified)
           const  response = await dispatch(verifyAddressDetails( verified));
            
        //     // const response =  VerifyPersonalDetails(verified)
            console.log(response.payload)
            const resp = response.payload
        //     // if(response)
        //     // {
                openNotification('success',resp.remarks)
                setIsOpen(false)
                setIsOpen1(false)
                setTimeout(() => {
                    onNextChange?.('personalInformation')
                 }, 500)
               
 
        // }
        // else if(status === "Accept")
        // {
        //     verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
        //     console.log(verified)
        //     dispatch(verifyPersonalDetails( verified));
            
        //     // const response =  VerifyPersonalDetails(verified)
        //     // console.log(response)
        //     // if(response)
        //     // {
        //         openNotification('success')
        //         setIsOpen(false)
        //         setIsOpen1(false)
        //         setTimeout(() => {
        //             onNextChange?.('personalInformation')
        //          }, 500)
        //         setIsvalid(true)
        // }
        //           // }
    }
    catch(error)
    {
        console.error(error)
        return error;
    }
      // onNextChange?.(values, 'personalInformation', setSubmitting)
}

const onDialogReject = async(status,values)=>{
   try
   {
    console.log(status)
    console.log(values)
   const verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "0",rejection_remarks: values.remark}
    console.log(verified)
   const  response = await dispatch(verifyAddressDetails( verified));
    
//     // const response =  VerifyPersonalDetails(verified)
    console.log(response.payload)
    const resp = response.payload
//     // if(response)
//     // {
        openNotification('danger',resp.remarks)
        setIsOpen(false)
        setIsOpen1(false)
        setTimeout(() => {
            onNextChange?.('addressInformation')
         }, 500)
        
   }
   catch(error)
   {
    console.error(error)
    return error
   }
   
   
    
    
    
}
const onNext = async(values, setSubmitting) => {
    try{
    
      
        openDialog()
      
        
    }
    catch(error)
    {
        console.log(error)
    }
    
}
    const validationSchema = Yup.object().shape({
        remark: Yup.string().required('Please enter your rejection remark')
        .matches(/^[aA-zZ0-9\s]+$/,'Special character not alowed!'),
    })
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Address Details</h3>
                {/* <p>Basic information for an account opening</p> */}
            </div>
            <Formik
                initialValues={data}
                //enableReinitialize={true}
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    
                        onNext(values, setSubmitting)
                    
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        
                        <Form>
                            <FormContainer>
                          
                            { data ? (
                            <div>
                                
                            <div className="md:grid grid-cols-2 gap-4">
                            
                            <FormItem
                            label="Address1"
                        >
                            <Field
                                type="text"
                                name="Address1"
                                component={Input}
                                value = {data && data.Address1}
                                readOnly
                            />
                            </FormItem>
                            <FormItem
                            label="Street"
                        >
                            <Field
                                type="text"
                                name="Street"
                                component={Input}
                                value = {data && data.Street}
                                readOnly
                            />
                            </FormItem>
                        <FormItem
                            label="Landmark"
                        >
                            <Field
                                type="text"
                                name="Landmark"
                                component={Input}
                                value = {data && data.Landmark}
                                readOnly
                            />
                        </FormItem>
                        <FormItem
                            label="City"
                         
                        >
                            <Field
                                type="text"
                                name="city_name"
                                component={Input}
                                value = {data && data.city_name} 
                                readOnly
                            />
                        </FormItem>
                        {/* </div> */}
                        
                        
                        {/* <div className="md:grid grid-cols-2 gap-4"> */}
                            <FormItem
                                label="State"
                               
                            >
                                <Field
                                    type="text"
                                    name="state_name"
                                    component={Input}
                                    value = {data && data.state_name}
                                    readOnly 
                                />
                            </FormItem>
                            <FormItem
                                label="Zip code"
                              
                            >
                                <Field
                                    type="text"
                                    name="zip_code"
                                    component={Input}
                                    value = {data && data.zip_code}
                                    readOnly 
                                   />
                               
                        </FormItem>
                        {/* </div>
                        <div className="md:grid grid-cols-2 gap-4"> */}
                            <FormItem
                                label="Latitude"
                             
                            >
                                <Field name="latitude" 
                                 type="text"
                                 component={Input}
                                 value = {data && data.latitude}
                                 readOnly
                                 >
                                
                                </Field>
                                    
                               
                            </FormItem>
                            <FormItem
                                label=" Longitude"
                             
                            >
                                <Field name="longitude" 
                                 type="text"
                                 component={Input}
                                 value = {data && data.longitude}
                                 readOnly
                                  >
                                </Field>
                                    
                               
                            </FormItem>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                {/* <Button
                                        loading={isSubmitting}
                                        size="md"
                                        className="ltr:mr-3 rtl:ml-3"
                                        // onClick={() => onDiscard?.()}
                                        // icon = {<MdOutlineNavigateNext/>}
                                        type="submit"
                                    >
                                        Next
                                    </Button> */}
                                     <Button
                                        //  loading={isSubmitting}
                                         variant="solid"
                                         type="submit"
                                         icon={<FiCheckCircle />}
                                         disabled ={data.Registrationstatus === "4" ? false :true}
                                     >
                                    Validate
                                     </Button>
                                </div>
                                </div>
                                    
                                
                               
                                    ) : (
                                        <p>No data available.</p>
                                 )} 

                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Confirm Verification</h5>
                    <div className="max-h-96 overflow-y-auto">
                            <p> Are you want to validate Address details!!</p>
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            // variant="plain"
                            onClick={OpenRejectionDialog}
                        >
                            No
                        </Button>
                        <Button variant="solid" onClick = {onDialogOk} >
                            Yes
                        </Button>
                    </div>
                </div>

            </Dialog>
            <Dialog
                isOpen={dialog1IsOpen}
                onClose={onDialog1Close}
                onRequestClose={onDialog1Close}
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Address Details Verification</h5>
                    <div className="max-h-96 overflow-y-auto px-2 ">
                            {/* <p> Enter Rejection remarks</p> */}
                        <Formik
                        initialValues={{
                            remark: ''
                            
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            onDialogReject('Reject',values)
                        }}
                        >
                        {({ touched, errors }) => (
                            <Form>
                                <FormContainer>
                                    <FormItem
                                     label="Rejection remark"
                                     invalid={errors.remark && touched.remark}
                                     errorMessage={errors.remark}
                                    >
                                         <Field
                                            name = "remark"
                                            component = {Input}
                                            type = "text"
                                            placeholder = "Enter rejection remarks here"
                                        />
                                    </FormItem>
                                    <div className="text-right mt-2">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        // variant="plain"
                                        onClick={onDialog1Close}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="solid" type="submit" onClick={onDialogReject}
                                    color = "red-600"
                                    >
                                    Confirm
                                    </Button>
                                </div>
                                </FormContainer>
                            </Form>
                        )}
                        </Formik>
                           
                    </div>
                    
                </div>
            </Dialog>
        </>
    )
}

export default AddressInfomation
