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
import { getBank } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'
import {FiCheckCircle} from 'react-icons/fi'

const BankDetails = ({
    data = {
        bank_name:'',
        routing_no:'',
        account_no:''
        
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
       const Param = {
           surveyor_master_id : requestParam.surveyor_master_id , 
           token : token , 
           tokenKey : tokenKey
       }
        //const surveyor_master_id = { surveyor_master_id : requestParam.surveyor_master_id}
      //dispatch(getForm({ surveyor_master_id,token,tokenKey}));
      dispatch(getBank( requestParam));
      //console.log(surveyor_master_id)
      
    } catch (error) {
      console.error(error);
      return error;
    }
  };
   
    const onNext = async(values, setSubmitting) => {
        onNextChange?.(values, 'BankDetails', setSubmitting)
    }
    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData.getData
    )
    // const handleSubmit = async (values, { setSubmitting }) => {
   

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Bank Details</h3>
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
                                    label="Bank-Name"
                                >
                                    <Field
                                        type="text"
                                        name="bank_name"
                                        component={Input}
                                        value = {data && data.bank_name}
                                        readOnly
                                    />
                                </FormItem>
                                
                                <FormItem
                                    label="Routing-Number"
                                 
                                >
                                    <Field
                                        type="text"
                                        name="routing_no"
                                        component={Input}
                                        value = {data && data.routing_no} 
                                        readOnly
                                    />
                                </FormItem>
                                
                                    <FormItem
                                        label="Account-Number"
                                       
                                    >
                                        <Field
                                            type="text"
                                            name="account_no"
                                            component={Input}
                                            value = {data && data.account_no} 
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

export default BankDetails
