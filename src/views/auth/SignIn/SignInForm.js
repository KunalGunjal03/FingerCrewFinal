import React,{useEffect} from 'react'
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
// import ReCAPTCHA from 'react-google-recaptcha'
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your username')
    .matches(/^[aA-zZ0-9\s]+$/,'Special character not alowed!'),
    password: Yup.string().required('Please enter your password'),
    captcha: Yup.string().required('Please enter above captcha'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        // signUpUrl = '/sign-up',
    } = props
    
    const [message, setMessage] = useTimeOutMessage()

    const { signIn } = useAuth()
    
    const onSignIn = async (values, setSubmitting) => {
        const { userName, password,captcha } = values
        let user_captcha = captcha;
        if (validateCaptcha(user_captcha) === true) {
            loadCaptchaEnginge(6,'white','green');
            setSubmitting(true)
            const result = await signIn({ userName, password })
           
            if (result.status === 'Failed') {
                setMessage(result.message)
            }
    
            setSubmitting(false)
          } else {
           var msg = "Invalid Captcha"
            setMessage(msg)
            setSubmitting(false)
        
          }
        
       
    }
    useEffect(() => {
        loadCaptchaEnginge(6,'white','green');
      }, []);
    return (
       
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                
                initialValues={{
                    userName: '',
                    password: '',
                    rememberMe: false,
                    captcha:'',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="User Name"
                                invalid={errors.userName && touched.userName}
                                errorMessage={errors.userName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="userName"
                                    placeholder="User Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                    maxLength={10}
                                />
                            </FormItem> 
                           
                            <FormItem
                                errorMessage={errors.captcha}
                                invalid={errors.captcha && touched.captcha}
                                label="Captcha"
                            >
                                 <LoadCanvasTemplateNoReload />
                                <Field
                                    autoComplete="off"
                                    name="captcha"
                                    placeholder="Enter captcha"
                                    component={Input}
                                />
                            </FormItem>
                            <div className="flex justify-between mb-6">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                    children=""
                                    type = "hidden"
                                />
                                <ActionLink to={forgotPasswordUrl}>
                                    Forgot Password?
                                </ActionLink>
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>
                            
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
        
    )
}

export default SignInForm
