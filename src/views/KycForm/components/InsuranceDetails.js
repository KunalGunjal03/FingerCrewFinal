import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    //Select,
    FormItem,
    FormContainer,

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
import { getInsured } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'
import {FiCheckCircle} from 'react-icons/fi'

const InsuranceDetails = ({
    data = {
        isInsured:'',
        policy_Expiry_date:''
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
    
      dispatch(getInsured( requestParam));
      
    } catch (error) {
      console.error(error);
      return error;
    }
  };
   
    const onNext = async(values, setSubmitting) => {
        onNextChange?.(values, 'InsuranceDetails', setSubmitting)
    }
    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
    // const handleSubmit = async (values, { setSubmitting }) => {
   
console.log(data)
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Insurance Details</h3>
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
                            {Array.isArray(data) && data.length!== 0 ? (
                                    data.map((items) => (
                                    <div>
                                    <FormItem
                                    label="Insured"
                                >
                                    <Field
                                        type="text"
                                        name="isInsured"
                                        component={Input}
                                        value = {items && items.isInsured}
                                        readOnly
                                    />
                                </FormItem>
                                
                                <FormItem
                                    label="Policy-Expiry-Date"
                                 
                                >
                                    <Field
                                        type="text"
                                        name="policy_Expiry_date"
                                        component={Input}
                                        value = {items && items.policy_Expiry_date} 
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
                    )
                }}
            </Formik>
        </>
    )
}

export default InsuranceDetails
