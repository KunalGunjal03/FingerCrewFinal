import React from 'react'
import {  useDispatch } from 'react-redux'
import { setUser } from 'store/auth/userSlice'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { apiForgotPassword } from 'services/AuthService'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const validationSchema = Yup.object().shape({
    mobileNo: Yup.number().required('Please enter your registered mobile number')
    .typeError("Please enter number value only")
    .nullable()
    .min(0)
    .moreThan(-1, "Negative values not accepted")
})


const ForgotPassword = (props) =>{
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const [message, setMessage] = useTimeOutMessage()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onsubmit=  async (values, setSubmitting) =>{
        setSubmitting(true)
        try {
          
            const resp = await apiForgotPassword(values)
            console.log(resp)
            console.log(resp.data)
            const {remarks} = resp.data
            
            if (resp.data) {
                if(resp.data.remarks)
                {
                    setMessage(remarks)
                    setSubmitting(false)
                }
                if(resp.data.Token)
                {
                
                setSubmitting(false)
                dispatch(
                    setUser(
                        {
                           id:resp.data.userDatas[0].id,
                           token : resp.data.Token,
                           tokenKey : resp.data.tokenKey
                        }
                    )
                )
                const redirectUrl = '/reset-password'
                navigate(
                    redirectUrl
                )
                }
            }
        } catch (errors) {
            setMessage(errors?.response?.data?.message || errors.toString())
            setSubmitting(false)
        }
    }
    return (
        <div className={className}>
            <div className="mb-6">
                
                    <>
                        <h3 className="mb-1">Forgot Password</h3>
                        <p>
                            Please enter your registered mobile number
                        </p>
                    </>
                
            </div>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
            initialValues={{
                mobileNo: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                if (!disableSubmit) {
                    onsubmit(values, setSubmitting)
                } else {
                    setSubmitting(false)
                }
            }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div>
                                <FormItem
                                invalid={errors.mobileNo && touched.mobileNo}
                                errorMessage={errors.mobileNo}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="mobileNo"
                                        placeholder="Mobile number"
                                        component={Input}
                                        maxLength={10} 
                                        
                                    />
                                </FormItem>
                            </div>
                            <Button
                                block
                                variant="solid"
                                type="submit"
                                loading={isSubmitting}
                            >   
                              submit
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Back to </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ForgotPassword