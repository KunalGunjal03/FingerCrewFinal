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
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { useLocation, useParams } from 'react-router-dom'
import { getSkills } from '../store/dataSlice'
import {FiCheckCircle} from 'react-icons/fi'
import * as Yup from 'yup'
import { text } from 'd3-fetch'
import { verifySkillsDetails } from '../store/dataSlice'
import { HiChevronRight } from 'react-icons/hi'
const Skills
    = ({
    data = {
        skill_description:''
    },
    onNextChange,
    currentStepStatus,
}) => {
    

     
         
      
  //sakshi
    const location = useLocation()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const[SurveyorId,setSurveyorID] = useState([''])
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
        const SurveyorID = {surveyor_master_id:requestParam.surveyor_master_id}
        setSurveyorID(SurveyorID)
         //const surveyor_master_id = { surveyor_master_id : requestParam.surveyor_master_id}
       //dispatch(getForm({ surveyor_master_id,token,tokenKey}));
       dispatch(getSkills( requestParam));
       //console.log(surveyor_master_id)
       
     } catch (error) {
       console.error(error);
       return error;
     }
   };


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
               verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
               console.log(verified)
              const  response = await dispatch(verifySkillsDetails( verified));
               
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
      const verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "0",rejection_remarks: values.remark}
       console.log(verified)
      const  response = await dispatch(verifySkillsDetails( verified));
       
   //     // const response =  VerifyPersonalDetails(verified)
       console.log(response.payload)
       const resp = response.payload
   //     // if(response)
   //     // {
           openNotification('danger',resp.remarks)
           setIsOpen(false)
           setIsOpen1(false)
           setTimeout(() => {
               onNextChange?.('personalInformation')
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
    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
        console.log(formData)
        console.log(data)
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Skills</h3>
                {/* <p>Basic information for an account opening</p> */}
            </div>
            <Formik
                initialValues={data}
                //enableReinitialize={true}
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    // setTimeout(() => {
                        onNext(values, setSubmitting)
                    // }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        
                        <Form>
                            <FormContainer>
                                    <FormItem >
                                    {/* <label>Skills</label> */}
                                    <div>
                                    <ul class="ml-4 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                    {Array.isArray(data) && data.length!== 0 ? (
                                    data.map((items) => (
                                    <div>
                                    {/* <Field
                                        type="text"
                                        name="skill_description"
                                        component={Input}
                                        value={items.skill_description}
                                        readOnly
                                        key={items}
                                        className = 'mt-4'
                                    /> */}
                                            
                                            <li className='p-2 text-base w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50'>
                                          
                                            {/* < HiChevronRight/>  */}
                                             <span>{items.skill_description    }</span> 
                                            </li>
                                   
                                    </div>
                                    
                                 ))
                                 
                                ) : (
                                    <p>No data available.</p>
                                )} 
                                </ul>
                             </div>
                                {Array.isArray(data) && data.length !== 0 && (
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button
                                    // loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    icon={<FiCheckCircle />}
                                    >
                                    Validate
                                    </Button>
                                </div>
                                )}
                                     
                               
                                </FormItem>
                               
                                
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
                            <p> Are you want to validate skills!!</p>
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
                    <h5 className="mb-4">Skills Verification</h5>
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
                                    <Button variant="solid" type="submit" onClick={onDialogReject} color = "red-600">
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

export default Skills

