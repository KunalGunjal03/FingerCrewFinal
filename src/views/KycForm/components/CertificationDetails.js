import React from 'react'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Dialog,
    Notification,
    toast,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
//import * as Yup from 'yup'
import {FiCheckCircle} from 'react-icons/fi'
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'

import { useLocation } from 'react-router-dom'
//import {getEducation} from '../store/dataSlice'
import { getCertification } from '../store/dataSlice'
import { VerifyCertificateDetails } from 'services/VerificationServices'



const CertificationDetails
    = ({
    data = {
        certificate_name:'',
        certification_year:''
    },
    onNextChange,
    currentStepStatus,
}) => {
      
  //sakshi
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

       dispatch(getCertification( requestParam));
       
     } catch (error) {
       console.error(error);
       return error;
     }
   };




    
    
   const [dialogIsOpen, setIsOpen] = useState(false)
   // const [setSubmitting] = useState(true)
   const openNotification = (type) => {
       toast.push(
           <Notification
               title={type.charAt(0).toUpperCase() + type.slice(1)}
               type={type}
           >
               Addres details is verified successfuly.
           </Notification>
       )
   }
   const openDialog = () => {
       setIsOpen(true)
   }
   const onDialogClose = (e) => {
      
       setIsOpen(false)
   }
   let isVerified = false;
   const onDialogOk = (e) => {
       isVerified = true
       openNotification('success')
       setIsOpen(false)
       
       
       // onDiscard(false)
       // onNextChange?.(values, 'personalInformation', setSubmitting)
   }


    
   const onNext = async(values, setSubmitting) => {
    try{
        const verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks:""}
        const response = await VerifyCertificateDetails(verified)
        console.log(response)
        openDialog()
        console.log(isVerified)
        // if(isVerified)
        // {
        //     console.log(isVerified)
        //     onNextChange?.( values,'personalInformation', setSubmitting)
       
        
        // }
        setTimeout(() => {
           onNextChange?.('personalInformation', setSubmitting)
        }, 3000)
        
    }
    catch(error)
    {
        console.log(error)
    }
    
}

    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
    console.log(data)
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Certification Details</h3>
                {/* <p>Basic information for an account opening</p> */}
            </div>
            <Formik
                initialValues={data}
                //enableReinitialize={true}
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <>
                        <Form>
                            <FormContainer>
                                
                            {Array.isArray(data) && data.length!==0? (
                                data.map((item) => (
                                    <div>
                                    <FormItem key={item}>
                                    <label>Certificate</label>

                                    <Field
                                        type="text"
                                        name="certificate_name"
                                        component={Input}
                                        value={item.certificate_name}
                                        readOnly
                                    />
                                    <div className="mt-4"></div>
                                    <Field
                                        type="text"
                                        name="certification_year"
                                        component={Input}
                                        value={item.certification_year}
                                        readOnly
                                    />
                                    </FormItem>
                                
                                </div>
                                
                                ))
                                
                                ) : (
                                <p>No data available.</p>
                                )}                                    
                                {Array.isArray(data) && data.length !== 0 && (
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
                                )}
                                
                            </FormContainer>
                        </Form>
                        </>
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
                            <p> Are you want to verify Address details!!</p>
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

export default CertificationDetails
