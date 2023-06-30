import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui';
import { Notification, toast } from 'components/ui';
import { RoleOptionsDrop } from 'services/userApi.js';
import { assignRoleUser,UserOptionsDrop } from 'services/RolesApi.js';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    roleid: Yup.string().required('User Role Required'),
    user_id: Yup.string().required('user_id Required'),
});

const openNotification = (type) => {
  toast.push(
    <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
        Role Saved Successfully
    </Notification>
  );
};

const AddRole = ({ data = { roleid: '',user_id:''} }) => {
    const [roleOptions, setRoleOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);

    // For Role Dropdown
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

      //For user Dropdown
      useEffect(() => {
        const fetchUserOptions = async () => {
          try {
            const response = await UserOptionsDrop();
            const options = response.getData;
            const transformedOptions1 = options.map((option) => ({
              value: option.user_id,
              label: option.username,
            }));
            setUserOptions(transformedOptions1);
          } catch (error) {
            console.error(error);
          }
        };
        fetchUserOptions();
      }, []);

      const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
          setSubmitting(true);
          await assignRoleUser(values);
          console.log(values);
          openNotification('success');
          resetForm({ roleid: '', user_id: '' });
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      };   
  
  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Assign Role</h3>
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
                  label="user_id"
                  invalid={errors.user_id && touched.user_id}
                  errorMessage={errors.user_id}
                >
                <Field name="user_id">
                    {({ field, form }) => (
                      <Select
                        placeholder="Select User"
                        field={field}
                        form={form}
                        options={userOptions}
                        value={userOptions.find((option) => option.value === field.value)}
                        onChange={(option) => form.setFieldValue(field.name, option?.value || '')}
                      />
                    )}
                  </Field>
                </FormItem>
                <FormItem
                  label="Roles"
                  invalid={errors.roleid && touched.roleid}
                  errorMessage={errors.roleid}
                >
                  <Field name="roleid">
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
              <Button
                    type="button"
                    className="ltr:mr-2 rtl:ml-2"
                    onClick={() => {
                        resetForm();
                    }}
                    >
                    Clear
               </Button>
               <Button loading={isSubmitting} variant="solid" type="submit">
                  {isSubmitting ? 'Saving...' : 'Assign'}
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

