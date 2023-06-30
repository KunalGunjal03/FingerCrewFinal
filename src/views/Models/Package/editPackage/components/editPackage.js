import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui';
import { updatePackageData } from 'services/package';
import { Notification, toast } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getForm } from '../store/dataSlice';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { ErrorMessage } from 'formik';
// import '../../../../../assets/styles/components/color.css';

const validationSchema = Yup.object().shape({
  package_name: Yup.string().required('Package name  Required'),
  price: Yup.string().required('Price Required'),
  tax: Yup.string().required('Tax Required'),
  service_fees: Yup.string().required('Service fees Required'),
  package_validity: Yup.string().required('Package validity is Required'),
});

const EditPackage = () => {
  const location = useLocation();
  const [package_mast_id, setId] = useState('');
  const { token, tokenKey } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1
    );
    setId(path);
    const requestParam = {
      package_mast_id: path,
      token: token,
      tokenKey: tokenKey
    };
    fetchData(requestParam);
  }, [package_mast_id]);

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

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const request = {
        package_mast_id: package_mast_id,
        ...values 
      };
      const response = await updatePackageData(request);
      toast.push(
        <Notification title="Success" type="success">
          Package data updated successfully.
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
        <h3 className="mb-2">Update Package</h3>
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
                  <Field type="hidden" name="package_mast_id" as={Input} />
                </FormItem>
                <div className="md:grid grid-cols-2 gap-4">
                  <FormItem label="Package name">
                    <Field type="text" name="package_name" as={Input} />
                    <ErrorMessage name="package_name" component="div" className="error-message" />
                  </FormItem>
                  <FormItem label="Package Price">
                    <Field type="text" name="price" as={Input} />
                    <ErrorMessage name="price" component="div" className="error-message" />
                  </FormItem>
                </div >
                <div className="md:grid grid-cols-2 gap-4">
                <FormItem label="Tax">
                  <Field type="text" name="tax" as={Input} />
                  <ErrorMessage name="tax" component="div" className="error-message" />
                </FormItem>
                <FormItem label="Service Fees">
                    <Field type="text" name="service_fees" as={Input} />
                    <ErrorMessage name="service_fees" component="div" className="error-message" />
                  </FormItem>
                </div>               
                <div className="md:grid grid-cols-2 gap-4">                 
                  <FormItem label="Package Validity">
                    <Field type="text" name="package_validity" as={Input} />
                    <ErrorMessage name="package_validity" component="div" className="error-message" />
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

export default EditPackage;
