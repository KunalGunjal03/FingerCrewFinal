import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { HiArrowLeft } from 'react-icons/hi'
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui';
import { updateRoleData} from 'services/RolesApi';
import { Notification, toast } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getForm } from '../store/dataSlice';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { ErrorMessage } from 'formik';
// import '../../../../assets/styles/components/color.css';

const validationSchema = Yup.object().shape({
  roledescription: Yup.string().required('Role Required'),
});

const EditRole = () => {
  const location = useLocation();
  const [roleid, setId] = useState('');
  const { token, tokenKey } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1
    );
    setId(path);
    const requestParam = {
      roleid: path,
      token: token,
      tokenKey: tokenKey
    };
    fetchData(requestParam);
  }, [roleid]);

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
        roleid: roleid,
        ...values 
      };
      const response = await updateRoleData(request);
      console.log(response)
      toast.push(
        <Notification title="Success" type="success">
          Role data updated successfully.
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
        <h3 className="mb-2">Update Role</h3>
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
                  <Field type="hidden" name="roleid" as={Input} />
                </FormItem>
                <div>
                  <FormItem label="Update Role">
                    <Field type="text" name="roledescription" as={Input} />
                    <ErrorMessage name="roledescription" component="div" className="error-message" />
                  </FormItem>
                </div>
                <div className="flex justify-end gap-2">
                <Link
                      className="block lg:inline-block md:mb-0 mb-4"
                      to="/viewRoles"
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

export default EditRole;
