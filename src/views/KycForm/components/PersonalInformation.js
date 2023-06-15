import {
    Input,
    Button,
    FormItem,
    FormContainer,
    toast,
    Notification,
    Dialog,

} from 'components/ui'
import { Field, Form, Formik } from 'formik'

// import { countryList } from 'constants/countries.constant'
// import { statusOptions } from '../constants'

//import {useSelector} from 'react'
// import * as Yup from 'yup'
import {  useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'
import {FiCheckCircle} from 'react-icons/fi'
import { VerifyPersonalDetails } from 'services/VerificationServices'


import useAuth from 'utils/hooks/useAuth'
import { CgEnter } from 'react-icons/cg'

const PersonalInformation = ({
    data = {
        Surveyor_master_id: '',
        Surveyor_name: '',
        email_id: '',
        salutation:'',
        SSN_no:'',
        type_of_profession: '',
        // residentCountry: '',
        // nationality: '',
        // dialCode: '',
        mobile_no: '',
        dob: '',
        // gender: '',
        // maritalStatus: '',
    },
    onNextChange,
    currentStepStatus
}) => {
   
    const location = useLocation()
    const [isvalid, setIsvalid] = useState(false);
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    // const { type, initialData, onFormSubmit, onDiscard, onDelete } = props
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
    
      dispatch(getForm( requestParam));
      
      
    } catch (error) {
      console.error(error);
      return error;
    }
  };
   
    // var IsVeriied = "false";
    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
    console.log(data)
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
    // const [setSubmitting] = useState(true)
    const [RejectionRemarkVisible, setRejectionRemarkVisible] = useState(false)
    const openNotification = (type,remarks) => {
        toast.push(
            <Notification
                title={remarks}
                type={type}
                
            />,{
                placement: 'top-center'
            })
                
           
        
    }
    const openDialog = (e) => {
        console.log(e)
        setIsOpen(true)

    }
    const onDialogClose = (e) => {
       console.log(e)
       setIsvalid(false)
        setIsOpen(false)
        // setRejectionRemarkVisible(true)
    }
    // let isVerified = false;
    const onDialogOk = async(e) => {
        console.log(e)
        const verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks:""}
        const response = await VerifyPersonalDetails(verified)
        console.log(response)
        if(response.Status === "Success" )
        {
            openNotification('success',response.remarks)
        }
        else{
            openNotification('warning',response.remarks)
        }
        setIsOpen(false)
        setTimeout(() => {
            onNextChange?.('personalInformation')
         }, 500)
        setIsvalid(true)
        
        
        // onDiscard(false)
        // onNextChange?.(values, 'personalInformation', setSubmitting)
    }

    const onNext = async(values, setSubmitting) => {
        try{
            // const verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks:""}
            // const response = await VerifyPersonalDetails(verified)
            // console.log(response)
            openDialog()
            // IsVeriied = true
            // // isVerified = true
            // console.log(IsVeriied)
            // if(isVerified)
            // {
            //     console.log(isVerified)
            //     onNextChange?.( values,'personalInformation', setSubmitting)
           
            
            // }
            // console.log(isvalid)
            // if(isvalid === true)
            ///{
            // setTimeout(() => {
            //    onNextChange?.('personalInformation', setSubmitting)
            // }, 3000)
            //}
            
        }
        catch(error)
        {
            console.log(error)
        }
        
    }

    // const RejectionRemark = () =>{
    //     return(
            
                                    
    //         <FormItem
    //             label="Remark*"
             
    //         >
    //             <Field name="remark" 
    //              type="text"
    //              component={Input} >
    //             </Field>
                    
               
    //         </FormItem>
        
    //     )   
    // }
    
    // const onRejectClick = async  () =>{

    //     console.log("Reject")
    //     // setRejectionRemarkVisible(true)
    // } 

    
//   console.log(IsVeriied)
// console.log(RejectionRemarkVisible)
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Personal Information</h3>
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
                                {/* {Array.isArray(data) && data.length!== 0 ?( */}
                                <div>
                                <div className="md:grid grid-cols-2 gap-4">
                                <FormItem
                                        label="Salutation"
                                       
                                    >
                                        <Field
                                            type="text"
                                            name="salutation"
                                            component={Input}
                                            value = {data && data.salutation} 
                                            readOnly
                                        />
                                </FormItem>
                                   
                                    <FormItem
                                    label="Surveyor Name"
                                >
                                    <Field
                                        type="text"
                                        name="surveyor_name"
                                        component={Input}
                                       readOnly
                                        value = {data && data.surveyor_name}
                                    />
                                </FormItem>
                                </div>
                                <FormItem
                                    label="Email ID"
                                 
                                >
                                    <Field
                                        type="text"
                                        name="email_id"
                                        component={Input}
                                        value = {data && data.email_id} 
                                        readOnly
                                    />
                                </FormItem>
                                <div className="md:grid grid-cols-2 gap-4">
                                   
                                    <FormItem
                                        label="Mobile Number"
                                      
                                    >
                                        <Field
                                            type="text"
                                            name="mobile_no"
                                            component={Input}
                                            value = {data && data.mobile_no} 
                                            readOnly
                                           />
                                       
                                           </FormItem>
                                             <FormItem
                                        label="Date of Birth"
                                     
                                    >
                                        <Field name="dob" 
                                         type="text"
                                         component={Input}
                                         value = {data && data.dob}
                                         readOnly >
                                        </Field>
                                            
                                       
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                <FormItem
                                        label="SSN NO"
                                      
                                    >
                                        <Field
                                            type="text"
                                            name="SSN_no"
                                            component={Input}
                                            value = {data && data.SSN_no} 
                                            readOnly
                                           />
                                       
                                           </FormItem> 


                                <FormItem
                                        label="Type Of Profession"
                                      
                                    >
                                        <Field
                                            type="text"
                                            name="type_of_profession"
                                            component={Input}
                                            value = {data && data.type_of_profession} 
                                            readOnly
                                           />
                                       
                                           </FormItem> 
                                         
                                            
                                       
                                    
                                </div>
                                
                                </div>
                                
                               
                                
                                {/* ) : (
                                <p>No data available.</p>
                                )}                                     */}
                                {/* {Array.isArray(data) && data.length !== 0 && ( */}
                                <div className="flex justify-end gap-2">
                                    <Button
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    icon={<FiCheckCircle />}
                                    >
                                    Verify
                                    </Button>
                                </div>
                                {/* )} */}
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
                            <p> Are you want to verify personal information!!</p>
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            // variant="plain"
                            onClick={onDialogClose}
                        >
                            No
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
                            Yes
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default PersonalInformation
