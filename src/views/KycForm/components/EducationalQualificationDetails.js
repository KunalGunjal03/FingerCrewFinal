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
import {getEducation} from '../store/dataSlice'
const excludedOccupation = ['unemployed', 'student', 'retired']


// const validationSchema = Yup.object().shape({
//     taxResident: Yup.string().required(
//         'Please select your country of tax resident'
//     ),
//     tin: Yup.string().when('noTin', {
//         is: false,
//         then: Yup.string().required(
//             'Please enter your Taxpayer Identification number (TIN)'
//         ),
//         otherwise: (schema) => schema,
//     }),
//     noTinReason: Yup.string().when('noTin', {
//         is: true,
//         then: Yup.string().required('Please indicate your reason'),
//         otherwise: (schema) => schema,
//     }),
//     noTin: Yup.bool(),
//     occupation: Yup.string().required('Please choose your occupation'),
//     annualIncome: Yup.string().required(
//         'Please tell us your annual income range'
//     ),
//     sourceOfWealth: Yup.string().required(
//         'Please tell us the source of funds use in this account'
//     ),
//     companyInformation: Yup.object().when('occupation', {
//         is: (value) => value && !excludedOccupation.includes(value),
//         then: Yup.object().shape({
//             companyName: Yup.string().required(
//                 'Please enter your company name'
//             ),
//             contactNumber: Yup.string().required(
//                 'Please enter your company contact number'
//             ),
//             country: Yup.string().required('Please select country'),
//             addressLine1: Yup.string().required('Please enter your address'),
//             addressLine2: Yup.string(),
//             city: Yup.string().required('Please enter your city'),
//             state: Yup.string().required('Please enter your state'),
//             zipCode: Yup.string().required('Please enter zip code'),
//         }),
//         otherwise: (schema) => schema,
//     }),
// })

const NumberInput = (props) => {
    return <Input {...props} value={props.field.value} />
}

const NumberFormatInput = ({ onValueChange, ...rest }) => {
    return (
        <NumberFormat
            customInput={Input}
            type="text"
            onValueChange={onValueChange}
            autoComplete="off"
            {...rest}
        />
    )
}

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




    
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'EducationalQualificationDetails', setSubmitting)
    }

    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
    console.log(data)
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
                                         name= "verify"
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
                        </>
                    )
                }}
            </Formik>
        </>
    )
}

export default EducationalQualificationDetails
