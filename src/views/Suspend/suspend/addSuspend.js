import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Radio, Card } from 'components/ui';
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui';
import { Notification, toast } from 'components/ui';
import { partnerOptionsDrop, noOfDaysOptionsDrop, saveSuspendData } from 'services/suspend';
import * as Yup from 'yup';
import '../../../assets/styles/components/color.css';

const validationSchema = Yup.object().shape({
  // partComp: Yup.string().required('Partner OR Comapny Name Required'),
  // partCompDrop: Yup.string().required('Partner Name Required'),
  // noOfDays: Yup.string().required('Number of Days Required'),
  // reason: Yup.string().required('User Type Required'),
});

const openNotification = (type, remarks) => {
  toast.push(
    <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
      {remarks}
    </Notification>
  );
};

const AddSuspend = ({ data = {user_type: '', user_id: '', no_of_suspend_days: '', remarks: '' } }) => {
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [showCompanyForm, setShowCompanyForm] = useState(true);
  const [user_type, setUserType] = useState();
  const [partnerOptions, setPartnerOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [noOfDaysOptions, setNoOfDaysOptions] = useState([]);

  const handlePartnerClick = () => {
    setUserType('10');
    setShowPartnerForm(true);
    setShowCompanyForm(false);
  };

  const handleCompanyClick = () => {
    setUserType('9');
    setShowPartnerForm(false);
    setShowCompanyForm(true);
  };

  // For Partner Dropdown
  useEffect(() => {
    const fetchPartnerOptions = async () => {
      try {
        const response = await partnerOptionsDrop(user_type);
        const options = response.getData;
        const transformedOptions = options.map((option) => ({
          value: option.surveyor_master_id,
          label: option.surveyor_name,
        }));
        setPartnerOptions(transformedOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPartnerOptions();
  }, [user_type]);

  // For Company Dropdown
  useEffect(() => {
    const fetchCompanyOptions = async () => {
      try {
        const response = await partnerOptionsDrop(user_type);
        const options = response.getData;
        const transformedOptions = options.map((option) => ({
          value: option.installer_master_id,
          label: option.installer_name,
        }));
        setCompanyOptions(transformedOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanyOptions();
  }, [user_type]);

  // For Number Of Days Dropdown
  useEffect(() => {
    const fetchNoOfDaysOptions = async () => {
      try {
        const response = await noOfDaysOptionsDrop();
        const options = response.getData;
        const transformedOptions = options.map((option) => ({
          value: option.no_of_suspend_days,
          label: option.no_of_suspend_days,
        }));
        setNoOfDaysOptions(transformedOptions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNoOfDaysOptions();
  }, []);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setSubmitting(true);
      // values.user_type = user_type;
      // console.log(values);
      const response = await saveSuspendData(values);
      if (response && response.status === 'Success') {
        const { remarks } = response;
        openNotification('success', remarks);
      } else {
        console.error('Invalid response format:', response);
      }
      // openNotification('success');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Suspend</h3>
      </div>
      <Formik
        initialValues={{ ...data, user_type }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting, resetForm }) => (
          <Card className="form-card" style={{ border: 'none', boxShadow: 'none' }}>
            <Form>
              <FormContainer>
                <div className="radio-container d-flex justify-content-center">
                  <div className="flex justify-center gap-2">
                  <Radio
                    className="mr-4"
                    name="user_type"
                    value={'10'}
                    onClick={handlePartnerClick}
                    checked={user_type === '10'}
                  >
                    Partner
                  </Radio>
                  <Radio
                    name="user_type"
                    value={'9'}
                    onClick={handleCompanyClick}
                    checked={user_type === '9'}
                  >
                    SolarCompany
                  </Radio>
                </div>
                </div>
                <br/><br/>
                {showPartnerForm && (
                  <div className="input-container">
                    <FormItem>
                      <div className="input-container1">
                        <FormItem label="Select Partner">
                          <Field name="user_id">
                            {({ field, form }) => (
                              <Select
                                placeholder="Select Partner"
                                field={field}
                                form={form}
                                options={partnerOptions}
                                value={partnerOptions.find((option) => option.value === field.value)}
                                onChange={(option) => form.setFieldValue(field.name, option?.value || '')}
                              />
                            )}
                          </Field>
                        </FormItem>
                      </div>
                      <div className="input-container">
                        <FormItem label="Reason">
                          <Field
                            type="text"
                            autoComplete="off"
                            name="remarks"
                            placeholder="Reason for Suspension"
                            component={Input}
                            className="text-input"
                            textArea
                          />
                        </FormItem>
                      </div>
                      <div className="input-container">
                        <FormItem label="Number of Days">
                          <Field name="no_of_suspend_days">
                            {({ field, form }) => (
                              <Select
                                placeholder="Select No Of Days"
                                field={field}
                                form={form}
                                options={noOfDaysOptions}
                                value={noOfDaysOptions.find((option) => option.value === field.value)}
                                onChange={(option) => form.setFieldValue(field.name, option?.value || '')}
                              />
                            )}
                          </Field>
                        </FormItem>
                      </div>
                    </FormItem>
                  </div>
                )}
                {showCompanyForm && (
                  <div className="input-container">
                    <FormItem>
                      <div className="input-container1">
                        <FormItem label="Select SolarComapny">
                          <Field name="user_id">
                            {({ field, form }) => (
                              <Select
                                placeholder="Select Comapany"
                                field={field}
                                form={form}
                                options={companyOptions}
                                value={companyOptions.find((option) => option.value === field.value)}
                                onChange={(option) => form.setFieldValue(field.name, option?.value || '')}
                              />
                            )}
                          </Field>
                        </FormItem>
                      </div>
                      <div className="input-container">
                        <FormItem label="Reason">
                          <Field
                            type="text"
                            autoComplete="off"
                            name="remarks"
                            placeholder="Reason for Suspension"
                            component={Input}
                            className="text-input"
                            textArea
                          />
                        </FormItem>
                      </div>
                      <div className="input-container">
                        <FormItem label="Number of Days">
                          <Field name="no_of_suspend_days">
                            {({ field, form }) => (
                              <Select
                                placeholder="Select No Of Days"
                                field={field}
                                form={form}
                                options={noOfDaysOptions}
                                value={noOfDaysOptions.find((option) => option.value === field.value)}
                                onChange={(option) => form.setFieldValue(field.name, option?.value || '')}
                              />
                            )}
                          </Field>
                        </FormItem>
                      </div>
                    </FormItem>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button loading={isSubmitting} variant="solid" type="submit">
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </FormContainer>
            </Form>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default AddSuspend;
