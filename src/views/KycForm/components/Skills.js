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
import {  useDispatch ,useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { useLocation, useParams } from 'react-router-dom'
import { getSkills } from '../store/dataSlice'
import {FiCheckCircle} from 'react-icons/fi'

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
       dispatch(getSkills( requestParam));
       //console.log(surveyor_master_id)
       
     } catch (error) {
       console.error(error);
       return error;
     }
   };




    
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'Skills', setSubmitting)
    }

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
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        
                        <Form>
                            <FormContainer>
                                    <FormItem >
                                    {/* <label>Skills</label> */}
                                    
                                    {Array.isArray(data) && data.length!== 0 ? (
                                    data.map((items) => (
                                    <div>
                                    <Field
                                        type="text"
                                        name="skill_description"
                                        component={Input}
                                        value={items.skill_description}
                                        readOnly
                                        key={items}
                                        className = 'mt-4'
                                    />
                                    </div>
                                 ))
                                 
                                ) : (
                                    <p>No data available.</p>
                                )} 
                                {Array.isArray(data) && data.length !== 0 && (
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    icon={<FiCheckCircle />}
                                    >
                                    Verify
                                    </Button>
                                </div>
                                )}
                                     
                               
                                </FormItem>
                               
                                
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default Skills

