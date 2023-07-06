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

const ExistingPVDetails = (
    {
        data={
            
        },
        onNextChange,
        currentStepStatus
    }
) =>{
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'RoofStructure', setSubmitting)
    
        
    }
    return (
        <>
        <div className="mb-8">
            <h3 className="mb-2">Existing PV Details</h3>
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
                                label="Installer Name"
                            >
                                <Field
                                    type="text"
                                    name="installer_name"
                                    component={Input}
                                    value = {data && data.installer_name}
                                    readOnly
                                />
                            </FormItem>
                            </div>
                            
                            <FormItem
                                label="Installer Company"
                             
                            >
                                <Field
                                    type="text"
                                    name="installer_company"
                                    component={Input}
                                    value = {data && data.installer_company} 
                                    readOnly
                                />
                            </FormItem>
                            <FormItem
                                label="Email ID"
                             
                            >
                                <Field
                                    type="text"
                                    name="installer_email_id"
                                    component={Input}
                                    value = {data && data.installer_email_id} 
                                    readOnly
                                />
                            </FormItem>
                            
                            <div className="md:grid grid-cols-2 gap-4">
                               
                                <FormItem
                                    label="Mobile Number"
                                  
                                >
                                    <Field
                                        type="text"
                                        name="installer_contact_number"
                                        component={Input}
                                        value = {data  && data.installer_contact_number} 
                                        readOnly
                                       />
                                   
                                       </FormItem>
                                         <FormItem
                                    label="Date of Birth"
                                 
                                >
                                    <Field name="installer_dob" 
                                     type="text"
                                     component={Input}
                                     value = {data && data.installer_dob}
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
                                     Validate
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

export default ExistingPVDetails