import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui';
import { Notification, toast } from 'components/ui';
import { savePackageData } from 'services/package';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  package_name: Yup.string().required('Package Name Required'),
  price: Yup.string().required('Price is Required'),
  tax:Yup.string().required('tax is Required'),
  service_fees: Yup.string().required('Service fees Required'),
  package_validity: Yup.string().required('Package validity Required'),
});

const openNotification = (type) => {
  toast.push(
    <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
      Package Data Saved Successfully
    </Notification>
  );
};

const AddPackage = ({ data = { package_name: '', price: '', tax: '', service_fees: '', package_validity: ''} }) => {

  const handleSubmit = async (values, {resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      await savePackageData(values);
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
        <h3 className="mb-2">Add Package</h3>
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
                  label="Package Name"
                  invalid={errors.package_name && touched.package_name}
                  errorMessage={errors.package_name}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="package_name"
                    placeholder="package_name"
                    component={Input}
                  />
                </FormItem>
                <FormItem
                  label="price"
                  invalid={errors.price && touched.price}
                  errorMessage={errors.price}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="price"
                    placeholder="price"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div className="md:grid grid-cols-2 gap-4">
              <FormItem
                  label="Tax"
                  invalid={errors.tax && touched.tax}
                  errorMessage={errors.tax}
                >
                  <Field
                    type="number"
                    autoComplete="off"
                    name="tax"
                    placeholder="tax"
                    component={Input}
                  />
                </FormItem>
              <FormItem
                  label="service_fees"
                  invalid={errors.username && touched.username}
                  errorMessage={errors.username}
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="service_fees"
                    placeholder="service_fees"
                    component={Input}
                  />
                </FormItem>
              </div>
              <div className="md:grid grid-cols-2 gap-4">
              <FormItem
                  label="Package Validity"
                  invalid={errors.package_validity && touched.package_validity}
                  errorMessage={errors.package_validity}
                >
                  <Field
                    type="number"
                    autoComplete="off"
                    name="package_validity"
                    placeholder="package_validity"
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
export default AddPackage;

