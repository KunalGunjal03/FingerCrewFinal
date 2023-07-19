import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui';
import { updateUserData, RoleOptionsDrop } from 'services/userApi';
import { Notification, toast } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getForm } from '../store/dataSlice';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { ErrorMessage } from 'formik';
import '../../../../assets/styles/components/color.css';

const validationSchema = Yup.object().shape({
  employee_code: Yup.string().required('Employee Code Required'),
  username: Yup.string().required('User Name Required'),
  user_fullname: Yup.string().required('Full Name Required'),
  user_mail_id: Yup.string().email('Invalid email').required('Email Required'),
  contact_detail: Yup.string()
    .matches(
      /^(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
      'Invalid phone number'
    )
    .required('Contact Number Required'),
  user_role: Yup.string().required('Select User Role'),
  //password: Yup.string().required('Password Required'),
});

const EditUser = () => {
  const location = useLocation();
  const [user_id, setId] = useState('');
  const { token, tokenKey } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1
    );
    setId(path);
    const requestParam = {
      user_id: path,
      token: token,
      tokenKey: tokenKey
    };
    fetchData(requestParam);
  }, [user_id]);

  const fetchData = (requestParam) => {
    try {
      dispatch(getForm(requestParam));
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const formData = useSelector(
    (state) => state.accountDetailForm.data.formData.getData[0]
  );

  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    const fetchRoleOptions = async () => {
      try {
        const response = await RoleOptionsDrop();
        const options = response.getData;
        const transformedOptions = options.map((option) => ({
          value: option.roleid,
          label: option.roledescription,
        }));
        setRoleOptions(transformedOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoleOptions();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const request = {
        user_id: user_id,
        ...values 
      };
      const response = await updateUserData(request);
      toast.push(
        <Notification title="Success" type="success">
          User data updated successfully.
        </Notification>
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Update User</h3>
      </div>
      {formData && (
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer style={{ border: 'none' }}>
                <FormItem>
                  <Field type="hidden" name="user_id" as={Input} />
                </FormItem>
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem label="Employee Code">
                    <Field type="text" name="employee_code" as={Input} />
                    <ErrorMessage name="employee_code" component="div" className="error-message" />
                  </FormItem>
                  <FormItem label="User Name">
                    <Field type="text" name="username" as={Input} />
                    <ErrorMessage name="username" component="div" className="error-message" />
                  </FormItem>
                </div >
                <div className="md:grid grid-cols-2 gap-4">
                <FormItem label="Full Name">
                  <Field type="text" name="user_fullname" as={Input} />
                  <ErrorMessage name="user_fullname" component="div" className="error-message" />
                </FormItem>
                <FormItem label="Email">
                    <Field type="text" name="user_mail_id" as={Input} />
                    <ErrorMessage name="user_mail_id" component="div" className="error-message" />
                  </FormItem>
                </div>               
                <div className="md:grid grid-cols-2 gap-4">                 
                  <FormItem label="Contact Number">
                    <Field type="text" name="contact_detail" as={Input} />
                    <ErrorMessage name="contact_detail" component="div" className="error-message" />
                  </FormItem>
                  <FormItem
                  label="Roles"
                  invalid={errors.user_role && touched.user_role}
                  errorMessage={errors.user_role}
                >
                  <Field name="user_role">
                    {({ field, form }) => (
                      <Select
                        placeholder="Select Role"
                        field={field}
                        form={form}
                        options={roleOptions}
                        value={roleOptions.find((option) => option.value === field.value)}
                        onChange={(option) => form.setFieldValue(field.name, option?.value || '')}
                      />
                    )}
                  </Field>
                </FormItem>
                </div>
                <div className="flex justify-end gap-2">
                <Link
                      className="block lg:inline-block md:mb-0 mb-4"
                      to="/viewUser"
                  >
                      <Button>
                          Back
                      </Button>
                  </Link>

                  <Button
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </FormContainer>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditUser;
