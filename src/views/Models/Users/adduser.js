import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Input, Button, FormItem, FormContainer ,Select} from 'components/ui';
import { saveUserData } from 'services/userApi.js';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('User Name Required'),
  user_fullname: Yup.string().required('Full Name Required'),
  user_mail_id: Yup.string().email('Invalid email').required('Email Required'),
  contact_detail: Yup.string().required('Contact Number Required'),
  user_role: Yup.string().required('User Role Required'),
  employee_code: Yup.string().required('employee_code Required'),
  password: Yup.string().required('password Required'),
  // allowMultipleRoles: Yup.string().required('Select Role Required'),
  // roleid: Yup.string().required('roleid Required'),
});

const roleOptions = [
  { value: 1, label: 'Admin' },
  { value: 2, label: 'Installer' },
  { value: 3, label: 'Sourveyour' }
];

const adduser = ({ data = { username: '', user_fullname: '', user_mail_id: '', contact_detail: '',user_role:'',
employee_code:'',password:''
// ,roleid:'',allowMultipleRoles:''
} }) => {
  console.log(data);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      // Set the selected role label as the value of user_role
      //values.user_role = roleOptions.find((option) => option.value === values.user_role)?.value || '';
  
      await saveUserData(values);
      // Handle success or any other logic after saving the data
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     setSubmitting(true);
  //     await saveUserData(values);
  //     // Handle success or any other logic after saving the data
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

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
        {({ values, touched, errors, isSubmitting }) => (
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

                {/* <Field
                  type="number"
                  autoComplete="off"
                  name="user_role"
                  placeholder="Select Role"
                  component={Input}
                /> */}
              {/* </FormItem> */}
                  
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
              
              {/* <FormItem
                label="roleid"
                invalid={errors.roleid && touched.roleid}
                errorMessage={errors.roleid}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="roleid"
                  placeholder="roleid"
                  component={Input}
                />
              </FormItem> */}
              <div className="flex justify-end gap-2">
                <Button loading={isSubmitting} variant="solid" type="submit">
                  Save
                </Button>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default adduser;

// import React, { useState, useEffect } from 'react';
// import { Field, Form, Formik } from 'formik';
// import AsyncSelect from 'react-select/async';
// import { Input, Button, FormItem, FormContainer,select } from 'components/ui';
// import { saveUserData, saveRoleOptions } from 'services/userApi.js';
// import { components } from 'react-select'
// import * as Yup from 'yup';

// const validationSchema = Yup.object().shape({
//   username: Yup.string().required('User Name Required'),
//   user_fullname: Yup.string().required('Full Name Required'),
//   user_mail_id: Yup.string().email('Invalid email').required('Email Required'),
//   contact_detail: Yup.string().required('Contact Number Required'),
//   user_role: Yup.string().required('User Role Required'),
//   allowMultipleRoles: Yup.string().required('Select Role Required'),
//   employee_code: Yup.string().required('employee_code Required'),
//   password: Yup.string().required('password Required'),
//   roleid: Yup.string().required('roleid Required'),
// });

// const AddUser = ({ data = { username: '', user_fullname: '', user_mail_id: '', contact_detail: '',user_role:'',allowMultipleRoles: '', employee_code: '', password: '', roleid: '' } }) => {
//   const [roleOptions, setRoleOptions] = useState([]);

//   // function DynamicApiOption() {
//   //   const [values, setValues] = useState([]);
//   //   const [options, setOptions] = useState();
  
//   //   const fetchRoleOptions = async () => {
//   //     try {
//   //       const data = await saveRoleOptions();
//   //       setValues(data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };
//   //   useEffect(() => {
//   //     fetchRoleOptions();
//   //   }, []);

//   const fetchRoleOptions = async () => {
//     try {
//       const response = await saveRoleOptions();
//       setRoleOptions(response);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchRoleOptions();
//   }, []);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       setSubmitting(true);
//       await saveUserData(values);
//       // Handle success or navigate to another page
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className="mb-8">
//         <h3 className="mb-2">Create User</h3>
//       </div>
//       <Formik
//         initialValues={data}
//         enableReinitialize={true}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, touched, errors, isSubmitting }) => (
//           <Form>
//             <FormContainer>
//               <div className="md:grid grid-cols-2 gap-4">
//                 <FormItem
//                   label="User Name"
//                   invalid={errors.username && touched.username}
//                   errorMessage={errors.username}
//                 >
//                   <Field
//                     type="text"
//                     autoComplete="off"
//                     name="username"
//                     placeholder="User Name"
//                     component={Input}
//                   />
//                 </FormItem>
//                 <FormItem
//                   label="User Full Name"
//                   invalid={errors.user_fullname && touched.user_fullname}
//                   errorMessage={errors.user_fullname}
//                 >
//                   <Field
//                     type="text"
//                     autoComplete="off"
//                     name="user_fullname"
//                     placeholder="User Full Name"
//                     component={Input}
//                   />
//                 </FormItem>
//               </div>
//               <div className="md:grid grid-cols-2 gap-4">
//                 <FormItem
//                   label="Email"
//                   invalid={errors.user_mail_id && touched.user_mail_id}
//                   errorMessage={errors.user_mail_id}
//                 >
//                   <Field
//                     type="email"
//                     autoComplete="off"
//                     name="user_mail_id"
//                     placeholder="Email"
//                     component={Input}
//                   />
//                 </FormItem>
//                 <FormItem
//                   label="Contact Number"
//                   invalid={errors.contact_detail && touched.contact_detail}
//                   errorMessage={errors.contact_detail}
//                 >
//                   <Field
//                     type="text"
//                     autoComplete="off"
//                     name="contact_detail"
//                     placeholder="Contact Number"
//                     component={Input}
//                   />
//                 </FormItem>
//               </div>
//               <div className="md:grid grid-cols-2 gap-4">

//               <FormItem
//                   label="User Role"
//                   invalid={errors.user_role && touched.user_role}
//                   errorMessage={errors.user_role}
//                 > 
//               </FormItem> 
//                 <select name="user_role" placeholder="Select Role">
//                   <option value="">Select Role</option>
//                   {roleOptions.length > 0 &&
//                     roleOptions.map((role) => (
//                       <option key={role.roleid} value={role.roleid}>
//                         {role.roledescription}
//                       </option>
//                   ))}
//                 </select>  

//                 <FormItem
//                   label="allowMultipleRoles"
//                   invalid={errors.allowMultipleRoles && touched.allowMultipleRoles}
//                   errorMessage={errors.allowMultipleRoles}
//                 >
//                   <Field
//                     type="number"
//                     autoComplete="off"
//                     name="allowMultipleRoles"
//                     placeholder="allowMultipleRoles"
//                     component={Input}
//                   />
//                 </FormItem>
//               </div>
//               <div className="md:grid grid-cols-2 gap-4">
//                 <FormItem
//                   label="employee_code"
//                   invalid={errors.employee_code && touched.employee_code}
//                   errorMessage={errors.employee_code}
//                 >
//                   <Field
//                     type="text"
//                     autoComplete="off"
//                     name="employee_code"
//                     placeholder="employee_code"
//                     component={Input}
//                   />
//                 </FormItem>
//                 <FormItem
//                   label="password"
//                   invalid={errors.password && touched.password}
//                   errorMessage={errors.password}
//                 >
//                   <Field
//                     type="text"
//                     autoComplete="off"
//                     name="password"
//                     placeholder="password"
//                     component={Input}
//                   />
//                 </FormItem>
//               </div>
//               <FormItem
//                 label="roleid"
//                 invalid={errors.roleid && touched.roleid}
//                 errorMessage={errors.roleid}
//               >
//                 <Field
//                   type="number"
//                   autoComplete="off"
//                   name="roleid"
//                   placeholder="roleid"
//                   component={Input}
//                 />
//               </FormItem>
//               <div className="flex justify-end gap-2">
//                 <Button loading={isSubmitting} variant="solid" type="submit">
//                   Save
//                 </Button>
//               </div>
//             </FormContainer>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default AddUser;

