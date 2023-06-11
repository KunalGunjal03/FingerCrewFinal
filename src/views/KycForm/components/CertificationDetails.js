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
import {
    occupationOptions,
    annualIncomeOptions,
    sourceOfWealthOptions,
    noTinReasonOption,
} from '../constants'
import { countryList } from 'constants/countries.constant'
//import * as Yup from 'yup'
import {FiCheckCircle} from 'react-icons/fi'
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { useLocation, useParams } from 'react-router-dom'
//import {getEducation} from '../store/dataSlice'
import { getCertification } from '../store/dataSlice'
const excludedOccupation = ['unemployed', 'student', 'retired']


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
        const Param = {
            surveyor_master_id : requestParam.surveyor_master_id , 
            token : token , 
            tokenKey : tokenKey
        }
         //const surveyor_master_id = { surveyor_master_id : requestParam.surveyor_master_id}
       //dispatch(getForm({ surveyor_master_id,token,tokenKey}));
       dispatch(getCertification( requestParam));
       //console.log(surveyor_master_id)
       
     } catch (error) {
       console.error(error);
       return error;
     }
   };




    
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'CertificationDetails', setSubmitting)
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
                                    <div className="flex justify-end gap-2">
                                    <Button
                                        loading={isSubmitting}
                                        size="md"
                                        className="ltr:mr-3 rtl:ml-3"
                                        // onClick={() => onDiscard?.()}
                                        // icon = {<MdOutlineNavigateNext/>}
                                        type="submit"
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

export default CertificationDetails
