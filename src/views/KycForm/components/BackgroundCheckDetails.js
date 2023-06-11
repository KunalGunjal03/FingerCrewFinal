import React from 'react'
import {
    Input,
    Button,
    Checkbox,
    Select,
    FormItem,
    FormContainer,
} from 'components/ui'
import { Field, Form, Formik, getIn } from 'formik'
import NumberFormat from 'react-number-format'
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getBackground } from '../store/dataSlice'
import { useLocation, useParams } from 'react-router-dom'
import {FiCheckCircle} from 'react-icons/fi'






const BackgroundCheckDetails
    = ({
    data = {
        bg_quest:'',
        bg_check_ans:'',
        remarks:''

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
       dispatch(getBackground( requestParam));
       //console.log(surveyor_master_id)
       
     } catch (error) {
       console.error(error);
       return error;
     }
   };




    
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'BackgroundCheckDetails', setSubmitting)
    }

    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
    console.log(data)
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">BackgroundCheck Details</h3>
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
                                    data.map((items) => (
                                    <div>
                                    <FormItem
                                    label="Que.1"
                                 
                                >
                                    <Field
                                        type="text"
                                        name="bg_quest"
                                         component={Input}
                                         value = {items && items.bg_quest}
                                         readOnly
                                    />
                                </FormItem>
                                <FormItem
                                    label="ANS:"
                                 
                                >
                                     <Field
                                        type="text"
                                        name="bg_check_ans"
                                        component={Input}
                                        value = {items && items.bg_check_ans} 
                                        readOnly
                                    />
                                </FormItem>
                                <FormItem
                                    label="Remark"
                                 
                                >
                                    <Field
                                        type="text"
                                        name="remarks"
                                        component={Input}
                                        value = {data && data.remarks}
                                        readOnly
                                    />
                                </FormItem>
                            
                                <div className="flex justify-end gap-2">
                                <Button
                                        loading={isSubmitting}
                                        size="md"
                                        className="ltr:mr-3 rtl:ml-3"
                                        // onClick={() => onDiscard?.()}
                                        // icon = {<MdOutlineNavigateNext/>}
                                        type="button"
                                    >
                                        Next
                                    </Button>
                                     <Button
                                         loading={isSubmitting}
                                         variant="solid"
                                         type="submit"
                                         icon={<FiCheckCircle />}
                                     >
                                    Verify
                                     </Button>
                                </div>
                                    </div>
                                 ))
                                 
                                ) : (
                                    <p>No data available.</p>
                                )}
                                
                            </FormContainer>
                        </Form>
                        </>
                    )
                }}
            </Formik>
        </>
    )
}

export default BackgroundCheckDetails
