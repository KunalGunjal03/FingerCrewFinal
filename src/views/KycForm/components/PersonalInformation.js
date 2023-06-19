import {
    Input,
    Button,
    FormItem,
    FormContainer,
    toast,
    Notification,
    Dialog,

} from 'components/ui'
import { Field, Form, Formik, FormikConsumer } from 'formik'
import {  useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { getForm } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'
import {FiCheckCircle} from 'react-icons/fi'

import * as Yup from 'yup'
import { verifyPersonalDetails } from '../store/dataSlice'

import { text } from 'd3-fetch'

const PersonalInformation = ({
    data = {
        Surveyor_master_id: '',
        Surveyor_name: '',
        email_id: '',
        salutation:'',
        SSN_no:'',
        type_of_profession: '',
        mobile_no: '',
        dob: '',
    },
    onNextChange,
    currentStepStatus
}) => {
   
    const location = useLocation()
    const [isvalid, setIsvalid] = useState(false);
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
    
      dispatch(getForm( requestParam));
      
      
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
       setIsvalid(false)
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
               const  response = await dispatch(verifyPersonalDetails( verified));
                
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
                    setIsvalid(true)
     
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
       const  response = await dispatch(verifyPersonalDetails( verified));
        
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
            setIsvalid(true)
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
                                    // loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    icon={<FiCheckCircle />}
                                    >
                                    Validate
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
                            <p> Are you want to validate personal information!!</p>
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
                    <h5 className="mb-4">Personal Details Verification</h5>
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
                                            type = {text}
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
                                    <Button variant="solid" type="submit" onClick={onDialogReject}>
                                    Yes
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

export default PersonalInformation
