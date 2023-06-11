import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    //Select,
    FormItem,
    FormContainer,
    toast,
    Notification,
    Dialog
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import NumberFormat from 'react-number-format'
// import { countryList } from 'constants/countries.constant'
// import { statusOptions } from '../constants'
import { components } from 'react-select'
//import {useSelector} from 'react'
// import * as Yup from 'yup'
import {  useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'
import {FiCheckCircle} from 'react-icons/fi'
import {GrFromNext} from 'react-icons/gr'
import {MdOutlineNavigateNext} from 'react-icons/md'
import { VerifyPersonalDetails } from 'services/VerificationServices'
import { bool } from 'yup'
const PersonalInformation = ({
    data = {
        Surveyor_master_id: '',
        Surveyor_name: '',
        email_id: '',
        salutation:'',
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
    console.log(formData)
    const [dialogIsOpen, setIsOpen] = useState(false)
    // const [setSubmitting] = useState(true)
    const openNotification = (type) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                Personal information is verified successfuly.
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
            const response = await VerifyPersonalDetails(verified)
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
                                   
                            <FormItem>
                                    <Field
                                        type="hidden"
                                        name="surveyor_master_id"
                                        component={Input}
                                        value = {data && data.surveyor_master_id
                                        }
                                    />
                                </FormItem>
                                    <FormItem
                                    label="Surveyor_Name"
                                >
                                    <Field
                                        type="text"
                                        name="surveyor_name"
                                        component={Input}
                                       readOnly
                                        value = {data && data.surveyor_name}
                                    />
                                </FormItem>
                                
                                <FormItem
                                    label="Email-ID"
                                 
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
                                        label="Mobile_Number"
                                      
                                    >
                                        <Field
                                            type="text"
                                            name="mobile_no"
                                            component={Input}
                                            value = {data && data.mobile_no} 
                                            readOnly
                                           />
                                       
                       </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                    
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
                                         loading={isSubmitting}
                                         variant="solid"
                                         type="submit"
                                         
                                         icon={<FiCheckCircle />}
                                     >
                                    Verify
                                     </Button>
                                </div>
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
