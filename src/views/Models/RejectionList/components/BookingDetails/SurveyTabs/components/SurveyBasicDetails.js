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

const SurveyBasicDetails = ({
    data ,
    onNextChange,
    currentStepStatus
}) => {
    console.log(data)
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'surveybasicdetails', setSubmitting)
    
        
    }
    return(
        <>
            <div className="mb-8">
                <h3 className="mb-2">Basic Survey Details</h3>
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
                                { data ? (
                                <div>
                                <div className="md:grid grid-cols-2 gap-4">
                                <FormItem
                                        label="Survey No"
                                       
                                    >
                                        <Field
                                            type="text"
                                            name="survey_no"
                                            component={Input}
                                            value = {data && data.survey_no} 
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
                                        value = {data && data.surveyor_name}
                                        readOnly
                                    />
                                </FormItem>
                                </div>  
                                <div className="md:grid grid-cols-2 gap-4">
                                   
                                    <FormItem
                                        label="Description"
                                      
                                    >
                                        <Field
                                            type="text"
                                            name="survey_des"
                                            component={Input}
                                            value = {data  && data.survey_des} 
                                            readOnly
                                           />
                                       
                                           </FormItem>
                                        <FormItem
                                        label="Solar Company Name"
                                            >
                                        <Field name="survey_location" 
                                         type="text"
                                         component={Input}
                                         value = {data && data.installer_company_name}
                                         readOnly >
                                        </Field>
                                    </FormItem>
                                </div>          
                                <div className="md:grid grid-cols-2 gap-4">
                                   
                                    <FormItem
                                        label="Survey Date"
                                      
                                    >
                                        <Field
                                            type="text"
                                            name="survey_date"
                                            component={Input}
                                            value = {data  && data.survey_date} 
                                            readOnly
                                           />
                                       
                                           </FormItem>
                                             <FormItem
                                        label="Location"
                                            >
                                        <Field name="survey_location" 
                                         type="text"
                                         component={Input}
                                         value = {data && data.location}
                                         readOnly >
                                        </Field>
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                <FormItem
                                        label="Client Name"
                                            >
                                        <Field name="survey_client_name" 
                                         type="text"
                                         component={Input}
                                         value = {data && data.survey_client_name}
                                         readOnly >
                                        </Field>
                                    </FormItem>
                                    
                                    <FormItem
                                        label="Status"
                                            >
                                        <Field name="survey_status" 
                                         type="text"
                                         component={Input}
                                         value = {data && data.survey_status}
                                         readOnly >
                                        </Field>
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-2 gap-4">
                                <FormItem
                                        label="Remark"
                                            >
                                        <Field name="rejection_remarks" 
                                         type="text"
                                         component={Input}
                                         value = {data && data.rejection_remarks}
                                         readOnly >
                                        </Field>
                                    </FormItem>
                                </div>
                                <div className="flex justify-end gap-2">
                                <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                         {currentStepStatus === 'complete'
                                            ? 'Save'
                                            : 'Next'}
                                    </Button>
                                </div>
                                </div>
                                
                                ) : (
                                    <p>No data available.</p>
                                    )} 
                               
                                
                                {/* ) : (
                                <p>No data available.</p>
                                )}                                     */}
                                {/* {Array.isArray(data) && data.length !== 0 && ( */}
                               
                                {/* )} */}
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
            
        </>
    )
}

export default SurveyBasicDetails