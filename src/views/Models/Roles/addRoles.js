import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui';
import { saveRoleData} from 'services/RolesApi.js';
import { Notification, toast } from 'components/ui';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    RoleDescription: Yup.string().required('User Role Required'),
});

const openNotification = (type, remarks) => {
  toast.push(
    <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
      {remarks}
    </Notification>
  );
};

const AddRole = ({ data = { RoleDescription: ''} }) => {

  const handleSubmit = async (values, {resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      //await saveRoleData(values);
      const response = await saveRoleData(values);
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
        <h3 className="mb-2">Create Role</h3>
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
              <div>
                <FormItem
                  label="Add Role"
                  invalid={errors.RoleDescription && touched.RoleDescription}
                  errorMessage={errors.RoleDescription}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="RoleDescription"
                    placeholder="add new Role"
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
                  {isSubmitting ? 'Saving...' : 'Create'}
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default AddRole;

