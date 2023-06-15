import React from 'react'
import {
    Input,
    Button,
    Checkbox,
    Select,
    FormItem,
    FormContainer,
    toast,
    Notification,
    Dialog
} from 'components/ui'
import { Field, Form, Formik, getIn } from 'formik'

//import * as Yup from 'yup'
import {FiCheckCircle} from 'react-icons/fi'
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { useLocation, useParams } from 'react-router-dom'
import {getEducation} from '../store/dataSlice'
import { VerifyQualificationDetails } from 'services/VerificationServices'



const EducationalQualificationDetails
    = ({
    data = {
        qualification_name:'',
        qualification_year:''
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
        const Param = {
            surveyor_master_id : requestParam.surveyor_master_id , 
            token : token , 
            tokenKey : tokenKey
        }
         //const surveyor_master_id = { surveyor_master_id : requestParam.surveyor_master_id}
       //dispatch(getForm({ surveyor_master_id,token,tokenKey}));
       dispatch(getEducation( requestParam));
       //console.log(surveyor_master_id)
       
     } catch (error) {
       console.error(error);
       return error;
     }
   };




    
    // const onNext = (values, setSubmitting) => {
    //     onNextChange?.(values, 'EducationalQualificationDetails', setSubmitting)
    // }

    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
    console.log(data)
    const [dialogIsOpen, setIsOpen] = useState(false)
    // const [setSubmitting] = useState(true)
    const openNotification = (type) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                Qualification details is verified successfuly.
            </Notification>
        )
    }
    const openDialog = () => {
        setIsOpen(true)
    }
    const onDialogClose = (e) => {
       
        setIsOpen(false)
    }
    // let isVerified = false;
    const onDialogOk = (e) => {
        
        openNotification('success')
        setIsOpen(false)
        
        
        // onDiscard(false)
        // onNextChange?.(values, 'personalInformation', setSubmitting)
    }

    const onNext = async(values, setSubmitting) => {
        try{
            const verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks:""}
            const response = await VerifyQualificationDetails(verified)
            console.log(response)
            openDialog()
            
            setTimeout(() => {
               onNextChange?.('personalInformation', setSubmitting)
            }, 3000)
            
        }
        catch(error)
        {
            console.log(error)
        }
        
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Educational QualificationDetails</h3>
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
                                
                            {Array.isArray(data) && data.length!== 0 ? (
                                data.map((item) => (
                                    <div>
                                    <FormItem key={item}>
                                    <label>Qualification</label>

                                    <Field
                                        type="text"
                                        name="qualification_name"
                                        component={Input}
                                        value={item.qualification_name}
                                        readOnly
                                    />
                                    <div className="mt-4"></div>
                                    <Field
                                        type="text"
                                        name="qualification_year"
                                        component={Input}
                                        value={item.qualification_year}
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
                            <p> Are you want to verify Qualification details!!</p>
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

export default EducationalQualificationDetails
