import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui';
import { saveUserData, RoleOptionsDrop } from 'services/userApi.js';
import { Notification, toast } from 'components/ui';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('User Name Required'),
  user_fullname: Yup.string().required('Full Name Required'),
  user_mail_id: Yup.string().email('Invalid email').required('Email Required'),
  contact_detail: Yup.string()
  .matches(
    /^(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
    'Invalid phone number'
  )
  .required('Contact Number Required'),
  user_role: Yup.string().required('User Role Required'),
  employee_code: Yup.string().required('employee_code Required'),
  password: Yup.string().required('password Required'),
});

const openNotification = (type, remarks) => {
  toast.push(
    <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
      {remarks}
    </Notification>
  );
};

const AddUser = ({ data = { username: '', user_fullname: '', user_mail_id: '', contact_detail: '', user_role: '', employee_code: '', password: '' } }) => {
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

  const handleSubmit = async (values, {resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      //await saveUserData(values);
      const response = await saveUserData(values);
          if (response && response.status === "Success") {
            const { remarks } = response;
            openNotification('success', remarks);
          } else {
            console.error('Invalid response format:', response);
          }
      openNotification('success');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      resetForm()
    }
  };
  
  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Create User</h3>
      </div>
      <Formik
        initialValues={data}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting ,resetForm }) => (
          <Form>
            <FormContainer>
              <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                  label="Employee Code"
                  invalid={errors.employee_code && touched.employee_code}
                  errorMessage={errors.employee_code}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="employee_code"
                    placeholder="employee_code"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="User Full Name"
                  invalid={errors.user_fullname && touched.user_fullname}
                  errorMessage={errors.user_fullname}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="user_fullname"
                    placeholder="User Full Name"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                  label="User Name"
                  invalid={errors.username && touched.username}
                  errorMessage={errors.username}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="username"
                    placeholder="User Name"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="Email"
                  invalid={errors.user_mail_id && touched.user_mail_id}
                  errorMessage={errors.user_mail_id}
                >
                  <Field
                    type="email"
                    autoComplete="off"
                    name="user_mail_id"
                    placeholder="Email"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                  label="Contact Number"
                  invalid={errors.contact_detail && touched.contact_detail}
                  errorMessage={errors.contact_detail}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="contact_detail"
                    placeholder="Contact Number"
                    component={Input}
                  />
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
              <div>
                <FormItem
                  label="Password"
                  invalid={errors.password && touched.password}
                  errorMessage={errors.password}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="password"
                    placeholder="password"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div className="flex justify-end gap-2">
              <Button
                   type="reset"
                   className="ltr:mr-2 rtl:ml-2"
                    onClick={resetForm}
                  >
                    Clear
                </Button>
                <Button loading={isSubmitting} variant="solid" type="submit">
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default AddUser;

