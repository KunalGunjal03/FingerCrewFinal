import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui';
import { Notification, toast } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getForm } from '../store/dataSlice';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { ErrorMessage } from 'formik';
import '../../../../../assets/styles/components/color.css';

const validationSchema = Yup.object().shape({
  package_name: Yup.string().required('Package name Required'),
  price: Yup.string()
    .required('Price Required')
    .test('is-numeric', 'Only numeric values are allowed for price', value => {
      return /^\d+(\.\d+)?$/.test(value);
    }),
  tax: Yup.string()
    .required('Tax Required')
    .test('is-numeric', 'Only numeric values are allowed for tax', value => {
      return /^\d+(\.\d+)?$/.test(value);
    }),
  service_fees: Yup.string()
    .required('Service fees Required')
    .test('is-numeric', 'Only numeric values are allowed for service fees', value => {
      return /^\d+(\.\d+)?$/.test(value);
    }),
  package_validity: Yup.string().required('Package validity is Required'),
});

const EditPackage = () => {
  const location = useLocation();
  const [installer_master_id, setId] = useState('');
  const { token, tokenKey } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1
    );
    setId(path);
    const requestParam = {
      installer_master_id: path,
      token: token,
      tokenKey: tokenKey
    };
    fetchData(requestParam);
  }, [installer_master_id]);

  const fetchData = (requestParam) => {
    try {
      dispatch(getForm(requestParam));
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const formData = useSelector(
    (state) => state.accountDetailForm.data.formData.getData
  );
  const resp = useSelector(
    (state) => state.accountDetailForm.data
)
  console.log(resp);
  //const resp = response.payload
  // const handleSubmit = async (values, { setSubmitting }) => {
  //   setSubmitting(true);
  //   try {
  //     const request = {
  //       installer_master_id: installer_master_id,
  //       ...values 
  //     };
  //     const response = await updatePackageData(request);
  //     if (response && response.status === "Success") {
  //       const { remarks } = response;
  //       toast.push(
  //         <Notification title="Success" type="success">
  //           {remarks}
  //         </Notification>
  //       );
  //     } else {
  //       console.error('Invalid response format:', response);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">View Package Details</h3>
      </div>
      {formData && (
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          //onSubmit={handleSubmit}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer style={{ border: 'none' }}>
              <FormItem>
                  <Field type="hidden"
                   name="installer_master_id" 
                   as={Input}
                   value = {formData && formData.installer_master_id} 
                   readOnly
                   />
                </FormItem>
                <FormItem>
                  <Field type="text" 
                  name="package_mast_id" 
                  as={Input}
                  value = {formData && formData.package_mast_id} 
                  readOnly 
                  />
                </FormItem>
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem label="Package name">
                    <Field type="text"
                     name="package_name"
                     as={Input} 
                     value = {formData && formData.package_name} 
                     readOnly
                      />
                    <ErrorMessage name="package_name" component="div" className="error-message" />
                  </FormItem>
                  <FormItem label="Package Price">
                    <Field type="text" 
                    name="price" 
                    as={Input} 
                    value = {formData && formData.price} 
                    readOnly
                    />
                    <ErrorMessage name="price" component="div" className="error-message" />
                  </FormItem>
                </div >
                <div className="md:grid grid-cols-2 gap-4">
                <FormItem label="Tax">
                  <Field type="text" 
                  name="tax" 
                  as={Input}
                  value = {formData && formData.tax} 
                  readOnly
                  />
                  <ErrorMessage name="tax" component="div" className="error-message" />
                </FormItem>
                <FormItem label="Service Fees">
                    <Field type="text" 
                    name="service_fees" 
                    as={Input} 
                    value = {formData && formData.service_fees} 
                    readOnly
                    />
                    <ErrorMessage name="service_fees" component="div" className="error-message" />
                  </FormItem>
                </div>               
                <div className="md:grid grid-cols-2 gap-4">                 
                  <FormItem label="Package Validity">
                    <Field type="text" 
                    name="package_validity" 
                    as={Input} 
                    value = {formData && formData.package_validity} 
                    readOnly
                    />
                    <ErrorMessage name="package_validity" component="div" className="error-message" />
                  </FormItem>
                  <FormItem label="no_of_survey_book_at_time">
                    <Field type="text" 
                    name="no_of_survey_book_at_time" 
                    as={Input} 
                    value = {formData && formData.no_of_survey_book_at_time} 
                    readOnly
                    />
                    <ErrorMessage name="service_fees" component="div" className="error-message" />
                  </FormItem>
                </div>
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem label="storage_limitations">
                    <Field type="text" 
                    name="storage_limitations" 
                    as={Input} 
                    value = {formData && formData.storage_limitations} 
                    readOnly
                    />
                    <ErrorMessage name="tax" component="div" className="error-message" />
                  </FormItem>
                  <FormItem label="limited_information_form">
                      <Field type="text" 
                      name="limited_information_form" 
                      as={Input} 
                      value = {formData && formData.limited_information_form} 
                      readOnly
                      />
                      <ErrorMessage name="service_fees" component="div" className="error-message" />
                  </FormItem>
                </div> 
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem label="screen_limitations">
                    <Field type="text" 
                    name="screen_limitations" 
                    as={Input} 
                    value = {formData && formData.screen_limitations} 
                    readOnly
                    />
                    <ErrorMessage name="tax" component="div" className="error-message" />
                  </FormItem>
                  <FormItem label="priority_support">
                      <Field type="text" 
                      name="priority_support" 
                      as={Input} 
                      value = {formData && formData.priority_support} 
                      readOnly
                      />
                      <ErrorMessage name="service_fees" component="div" className="error-message" />
                  </FormItem>
                </div> 
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem label="training_and_support">
                    <Field type="text" name="training_and_support" as={Input} />
                    <ErrorMessage name="tax" component="div" className="error-message" />
                  </FormItem>
                  <FormItem label="dedicated_support">
                      <Field type="text" name="dedicated_support" as={Input} />
                      <ErrorMessage name="service_fees" component="div" className="error-message" />
                  </FormItem>
                </div> 
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem label="dedicated_account_manager">
                    <Field type="text" name="dedicated_account_manager" as={Input} />
                    <ErrorMessage name="tax" component="div" className="error-message" />
                  </FormItem>
                  <FormItem label="design_permit_package">
                      <Field type="text" name="design_permit_package" as={Input} />
                      <ErrorMessage name="service_fees" component="div" className="error-message" />
                  </FormItem>
                </div> 
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem label="free_sld">
                    <Field type="text" name="free_sld" as={Input} />
                    <ErrorMessage name="tax" component="div" className="error-message" />
                  </FormItem>
                  <FormItem label="package_valid_from">
                      <Field type="text" name="package_valid_from" as={Input} />
                      <ErrorMessage name="service_fees" component="div" className="error-message" />
                  </FormItem>
                </div>
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem label="package_valid_to">
                    <Field type="text" name="package_valid_to" as={Input} />
                    <ErrorMessage name="tax" component="div" className="error-message" />
                  </FormItem>
                  <FormItem label="no_of_survey_conducted">
                      <Field type="text" name="no_of_survey_conducted" as={Input} />
                      <ErrorMessage name="service_fees" component="div" className="error-message" />
                  </FormItem>
                </div> 
                <div className="flex justify-end gap-2">
                <Link
                      className="block lg:inline-block md:mb-0 mb-4"
                      to="/viewPackage"
                  >
                      <Button>
                          Back
                      </Button>
                  </Link>
                  <Button
                    //loading={isSubmitting}
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
export default EditPackage;
