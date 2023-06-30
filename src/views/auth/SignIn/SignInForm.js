import React, { useEffect } from 'react';
import { Input, Button, Checkbox, FormItem, FormContainer, Alert } from 'components/ui';
import { PasswordInput, ActionLink } from 'components/shared';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from 'utils/hooks/useAuth';
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { MdRefresh } from 'react-icons/md';
import  {SlRefresh} from 'react-icons/sl'
import useThemeClass from 'utils/hooks/useThemeClass'
const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .required('Please enter your username')
    .matches(/^[aA-zZ0-9\s]+$/, 'Special characters are not allowed!'),
  password: Yup.string().required('Please enter your password'),
  captcha: Yup.string().required('Please enter the captcha'),
  rememberMe: Yup.bool(),
});

const SignInForm = (props) => {
  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = '/forgot-password',
    // signUpUrl = '/sign-up',
  } = props;

  const [message, setMessage] = useTimeOutMessage();

  const { signIn } = useAuth();



  const onSignIn = async (values, { setSubmitting, resetForm }) => {
    const { userName, password, captcha } = values;
    let user_captcha = captcha;
    
    if (validateCaptcha(user_captcha) === true) {
      loadCaptchaEnginge(6, 'white', 'green','upper');
      setSubmitting(true);
      const result = await signIn({ userName, password });

      if (result.status === 'Failed') {
        setMessage(result.message);
        resetForm(); 
      } else {
        resetForm(); // Reset the form on successful sign-in
      }

      setSubmitting(false);
    } else {
      var msg = 'Invalid Captcha';
      setMessage(msg);
      setSubmitting(false);
      // window.confirm('Reset?'); 
      // Reset the value of the captcha field
      resetForm()
    }
  };

  useEffect(() => {
    loadCaptchaEnginge(6, 'white', 'green','upper');
  }, []);
  const onRefresh = () => {
    
      loadCaptchaEnginge(6, 'white', 'green','upper');
  
  }
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
          rememberMe: true,
          captcha: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (!disableSubmit) {
            onSignIn(values, { setSubmitting, resetForm });
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting, resetForm }) => (
          <Form>
            <FormContainer>
              <FormItem label="User Name" invalid={errors.userName && touched.userName} errorMessage={errors.userName}>
                <Field type="text" autoComplete="off" name="userName" placeholder="User Name" component={Input} />
              </FormItem>
              <FormItem label="Password" invalid={errors.password && touched.password} errorMessage={errors.password}>
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  component={PasswordInput}
                  maxLength={10}
                />
              </FormItem>
              <FormItem errorMessage={errors.captcha} invalid={errors.captcha && touched.captcha} label="Captcha">
                <div className='grid grid-cols-2 gap-2'>
                  <div>
                  <LoadCanvasTemplateNoReload /> 
                  </div>
                  <div className="flex justify-end text-lg">
                  <span
                      className="cursor-pointer p-2 hover"
                      onClick={onRefresh}
                      style={{ fontSize: '24px' }}
                  >
                       <SlRefresh/>
                  </span>
                 
                  </div>
                </div>
                
                
                
                
                <Field
                  autoComplete="off"
                  name="captcha"
                  placeholder="Enter captcha"
                  component={Input}
                  maxLength={6}
                  // innerRef={captchaRef} // Assign the ref to the captcha field
                />
              </FormItem>
              <div className="flex justify-between mb-6">
                <Field className="mb-0" name="rememberMe" component={Checkbox} children="Remember Me" />
                <ActionLink to={forgotPasswordUrl}>Forgot Password?</ActionLink>
              </div>
              <Button block loading={isSubmitting} variant="solid" type="submit">
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
              {/* <Button block variant="outline" onClick={resetForm}>
                Reset
              </Button> */}
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm 