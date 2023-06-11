import React, { useCallback } from 'react'
import {
    Input,
    Button,
    Checkbox,
    Select,
    FormItem,
    FormContainer,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import get from 'lodash/get'
import { countryList } from 'constants/countries.constant'
import {FiCheckCircle} from 'react-icons/fi'
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { getAddress } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'
//import * as Yup from 'yup'

// const validationSchema = Yup.object().shape({
//     country: Yup.string().required('Please select country'),
//     addressLine1: Yup.string().required('Please enter your address'),
//     addressLine2: Yup.string(),
//     city: Yup.string().required('Please enter your city'),
//     state: Yup.string().required('Please enter your state'),
//     zipCode: Yup.string().required('Please enter zip code'),
//     sameCorrespondenceAddress: Yup.bool(),
//     correspondenceAddress: Yup.object().when('sameCorrespondenceAddress', {
//         is: false,
//         then: Yup.object().shape({
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

const AddressInfomation = ({
    data = {
        //Surveyor_master_id: '',
        Address1: '',
        Address2: '',
        Address3: '',
        Landmark: '',
        city_name:'',
        // residentCountry: '',
        // nationality: '',
        // dialCode: '',
        state_name: '',
        zip_code: '',
        latitude:'',
        longitude:''
        // gender: '',
        // maritalStatus: '',
    },
    onNextChange,
    currentStepStatus,
}) => {
    

     
        
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
         //const surveyor_master_id = { surveyor_master_id : requestParam.surveyor_master_id}
       //dispatch(getForm({ surveyor_master_id,token,tokenKey}));
       dispatch(getAddress( requestParam));
       //console.log(surveyor_master_id)
       
     } catch (error) {
       console.error(error);
       return error;
     }
   };




    
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'AddressDetails', setSubmitting)
    }

    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
        console.log(formData)
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Address Details</h3>
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
                        
                        <Form>
                            <FormContainer>
                            <div className="md:grid grid-cols-2 gap-4">
 
                                    <FormItem
                                    label="Address1"
                                >
                                    <Field
                                        type="text"
                                        name="Address1"
                                        component={Input}
                                        value = {data && data.Address1}
                                        readOnly
                                    />
                                    </FormItem>
                                    <FormItem
                                    label="Address2"
                                >
                                    <Field
                                        type="text"
                                        name="Address2"
                                        component={Input}
                                        value = {data && data.Address2}
                                        readOnly
                                    />
                                    </FormItem>
                                    <FormItem
                                    label="Address3"
                                >
                                    <Field
                                        type="text"
                                        name="Address3"
                                        component={Input}
                                        value = {data && data.Address2}
                                        readOnly
                                    />
                                    </FormItem>
                                
                                <FormItem
                                    label="Landmark"
                                >
                                    <Field
                                        type="text"
                                        name="Landmark"
                                        component={Input}
                                        value = {data && data.Landmark}
                                        readOnly
                                    />
                                </FormItem>
                                <FormItem
                                    label="city_name"
                                 
                                >
                                    <Field
                                        type="text"
                                        name="city_name"
                                        component={Input}
                                        value = {data && data.city_name} 
                                        readOnly
                                    />
                                </FormItem>
                                {/* </div> */}
                                
                                
                                {/* <div className="md:grid grid-cols-2 gap-4"> */}
                                    <FormItem
                                        label="State_name"
                                       
                                    >
                                        <Field
                                            type="text"
                                            name="state_name"
                                            component={Input}
                                            value = {data && data.state_name}
                                            readOnly 
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Zip_code"
                                      
                                    >
                                        <Field
                                            type="text"
                                            name="zip_code"
                                            component={Input}
                                            value = {data && data.zip_code}
                                            readOnly 
                                           />
                                       
                                </FormItem>
                                {/* </div>
                                <div className="md:grid grid-cols-2 gap-4"> */}
                                    <FormItem
                                        label="Latitude"
                                     
                                    >
                                        <Field name="latitude" 
                                         type="text"
                                         component={Input}
                                         value = {data && data.latitude}
                                         readOnly
                                         >
                                        
                                        </Field>
                                            
                                       
                                    </FormItem>
                                    <FormItem
                                        label=" Longitude"
                                     
                                    >
                                        <Field name="longitude" 
                                         type="text"
                                         component={Input}
                                         value = {data && data.longitude}
                                         readOnly
                                          >
                                        </Field>
                                            
                                       
                                    </FormItem>
                                </div>
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
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default AddressInfomation
