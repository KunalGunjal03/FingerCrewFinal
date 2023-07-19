import React, { useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui';
import { Notification, toast } from 'components/ui';
import { RoleOptionsDrop } from 'services/userApi.js';
import { AllmenuData,saveAssignRight } from 'services/Rights';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    roleid: Yup.string().required('User Role Required'),
    menuid: Yup.string().required('menu is Required'),
    // submenuid: Yup.string().required('Submenu is Required'),
});

const openNotification = (type, remarks) => {
  toast.push(
    <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
      {remarks}
    </Notification>
  );
};

const AddRole = ({ data = { roleid: '',menuid:'',submenuid:''} }) => {
    const [roleOptions, setRoleOptions] = useState([]);
    const [menuOptions, setMenuOptions] = useState([]);
    const [subMenuOptions, setSubMenuOptions] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState([]);

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

      //For menu Dropdown
      useEffect(() => {
        const fetchmenuOptions = async () => {
          try {
            const response = await AllmenuData();
            const options = response.getdata;
            const transformedOptions1 = options
            .filter((option) => option.submenuid === "0") // Filter options with submenuid = 0
            .map((option) => ({
              value: option.mainMenuId,
              label: option.menu,
              submenu: option.submenuid,
            }));
          setMenuOptions(transformedOptions1);
          } catch (error) {
            console.error(error);
          }
        };
        fetchmenuOptions();
      }, []);

      //For Submenu Dropdown
      const fetchSubmenuOptions = async (selectedMenuId) => {
        try {
          const response = await AllmenuData();
          const options = response.getdata;
          const transformedOptions1 = options
            .filter(
              (option) =>
                option.submenuid !== "0" && // Filter submenuid not equal to 0
                option.submenuid === selectedMenuId // Filter submenu based on mainmenuid
            )
            .map((option) => ({
              value: option.mainMenuId,
              label: option.menu,
            }));
          setSubMenuOptions(transformedOptions1);
        } catch (error) {
          console.error(error);
        }
      };
      
      useEffect(() => {
        fetchSubmenuOptions(selectedMenu?.value || ""); // Fetch submenu options based on selected menu
      }, [selectedMenu]);
      
      const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
          setSubmitting(true);
          //await saveAssignRight(values);
          const response = await saveAssignRight(values);
          if (response && response.status === "Success") {
            const { remarks } = response;
            openNotification('success', remarks);
          } else {
            console.error('Invalid response format:', response);
          }
          console.log(values);
          openNotification('success');
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
    };   
  
  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Assign Rights</h3>
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
              <div className="md:grid grid-cols-2 gap-4">
                <FormItem
                  label="Menu"
                  invalid={errors.menuid && touched.menuid}
                  errorMessage={errors.menuid}
                >
                <Field name="menuid">
                  {({ field, form }) => (
                    <Select
                        placeholder="Select Menu"
                        field={field}
                        form={form}
                        options={menuOptions}
                        value={menuOptions.find((option) => option.value === field.value)}
                        onChange={(option) => {
                          form.setFieldValue(field.name, option?.value || '');
                          setSelectedMenu(option);
                          fetchSubmenuOptions(option.value); // Fetch submenu options based on selected menu
                        }}
                      />
                  )}
                </Field>
                </FormItem>
                <FormItem
                  label="Submenu"
                >
                  <Field name="submenuid">
                    {({ field, form }) => (
                      <Select
                        placeholder="Select Submenu"
                        field={field}
                        form={form}
                        options={subMenuOptions}
                        value={subMenuOptions.find((option) => option.value === field.value)}
                        onChange={(option) => form.setFieldValue(field.name, option?.value || '')}
                        // value={subMenuOptions.find((option) => option.value === field.value)}
                        // onChange={(option) => form.setFieldValue(field.name, option?.value || '')}
                      />
                    )}
                  </Field>
                </FormItem>
              </div>
              <div className="flex justify-end gap-2">
              <Button
                type="button"
                className="ltr:mr-2 rtl:ml-2"
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
