import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    //Select,
    FormItem,
    FormContainer,

} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import NumberFormat from 'react-number-format'
// import { countryList } from 'constants/countries.constant'
// import { statusOptions } from '../constants'
import { components } from 'react-select'
//import {useSelector} from 'react'
// import * as Yup from 'yup'
import {  useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getForm } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'

//const { SingleValue } = components

// const genderOptions = [
//     { label: 'Male', value: 'M' },
//     { label: 'Female', value: 'F' },
//     { label: 'Others', value: 'O' },
// ]

const NumberInput = (props) => {
    return <Input {...props} value={props.field.value} />
}

const NumberFormatInput = ({ onValueChange, ...rest }) => {
    return (
        <NumberFormat
            customInput={Input}
            type="text"
            onValueChange={onValueChange}
            autoComplete="off"
            {...rest}
        />
    )
}


   
// const PhoneSelectOption = ({ innerProps, data, isSelected }) => {
//     return (
//         <div
//             className={`cursor-pointer flex items-center justify-between p-2 ${
//                 isSelected
//                     ? 'bg-gray-100 dark:bg-gray-500'
//                     : 'hover:bg-gray-50 dark:hover:bg-gray-600'
//             }`}
//             {...innerProps}
//         >
//             <div className="flex items-center gap-2">
//                 <span>
//                     ({data.value}) {data.dialCode}
//                 </span>
//             </div>
//         </div>
//     )
// }

// const PhoneControl = ({ children, ...props }) => {
//     const selected = props.getValue()[0]
//     return (
//         <SingleValue {...props}>
//             {selected && <span>{selected.dialCode}</span>}
//         </SingleValue>
//     )
// }

// const validationSchema = Yup.object().shape({
//     Surveyor_master_id: Yup.string().required('Surveyor Master ID'),
//     Surveyor_name: Yup.string().required('Surveyor Name'),
//     email_id: Yup.string().email('Invalid email').required('Email Required'),
//     // nationality: Yup.string().required('Please select your nationality'),
//     mobile_no: Yup.string().required('Please enter your mobile number'),
//     dob: Yup.string().required('Please enter your date of birth'),
//     // gender: Yup.string().required('Please enter your gender'),
// //     maritalStatus: Yup.string().required('Please enter your marital status'),
// //     dialCode: Yup.string().required('Please select dial code'),
//  })

//  const {token,tokenKey} = useSelector((state) => state.auth.user)
// useEffect(() => {
//     fetchData()
// },[])


const PersonalInformation = ({
    data = {
        Surveyor_master_id: '',
        Surveyor_name: '',
        email_id: '',
        salutation:'',
        // residentCountry: '',
        // nationality: '',
        // dialCode: '',
        mobile_no: '',
        dob: '',
        // gender: '',
        // maritalStatus: '',
    },
    onNextChange,
    currentStepStatus,
}) => {
    // const { data1 } = useSelector((state) => state.getForm.formData);
    // console.log(data1)
    // const { token, tokenKey } = useSelector((state) => state.auth.user);
    //const [formData, setFormData] = useState(data);
    
    const location = useLocation()
    // if (data && data.formData) {
    //     const formData = data.formData;
    //     // Continue with your logic
    //   } else {
    //     // Handle the case where the object or formData is undefined
    //     console.error("The object or formData is undefined.");
    //   }
      
    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const requestParam = {surveyor_master_id : path}

        console.log(requestParam)
        fetchData(requestParam);
    }, []);
    const dispatch = useDispatch()
    const fetchData = (requestParam) => {
        try {
          dispatch(getForm({ requestParam}));
        } catch (error) {
          console.error(error);
          return error;
        }
      };
   
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'personalInformation', setSubmitting)
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Personal Information</h3>
                {/* <p>Basic information for an account opening</p> */}
            </div>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Surveyor_Master_Id"
                                        invalid={
                                            errors.surveyor_master_id &&
                                            touched.surveyor_master_id
                                        }
                                        errorMessage={errors.surveyor_master_id}
                                    >
                                        <Field
                                            type="string"
                                            autoComplete="off"
                                            name="surveyor_master_id"
                                            placeholder="Surveyor Master Id"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Surveyor_Name"
                                        invalid={
                                            errors.surveyor_name && touched.surveyor_name
                                        }
                                        errorMessage={errors.surveyor_name}
                                    >
                                        <Field
                                            type="string"
                                            autoComplete="off"
                                            name="surveyor_name"
                                            placeholder="Surveyor Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <FormItem
                                    label="Email-ID"
                                    invalid={errors.email_id && touched.email_id}
                                    errorMessage={errors.email_id}
                                >
                                    <Field
                                        type="string"
                                        autoComplete="off"
                                        name="email_id"
                                        placeholder="Email"
                                        component={Input}
                                    />
                                </FormItem>
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Salutation"
                                        invalid={
                                            errors.salutation &&
                                            touched.salutation
                                        }
                                        errorMessage={errors.salutation}
                                    >
                                        <Field
                                            type="string"
                                            autoComplete="off"
                                            name="salutation"
                                            placeholder="Salutation"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Mobile_Number"
                                        invalid={
                                            errors.mobile_no && touched.mobile_no
                                        }
                                        errorMessage={errors.mobile_no}
                                    >
                                        <Field
                                            type="string"
                                            autoComplete="off"
                                            name="mobile_no"
                                            placeholder="Mobile Number"
                                            component={Input}
                                           />
                                       
                       </FormItem>
                                </div>
                                {/* <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        label="Gender"
                                        invalid={
                                            errors.gender && touched.gender
                                        }
                                        errorMessage={errors.gender}
                                    > */}
                                        {/* <Field name="gender">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Gender"
                                                    field={field}
                                                    form={form}
                                                    options={genderOptions}
                                                    value={genderOptions.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.gender
                                                    )}
                                                    onChange={(gender) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            gender.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="Marital Status"
                                        invalid={
                                            errors.maritalStatus &&
                                            touched.maritalStatus
                                        }
                                        errorMessage={errors.maritalStatus}
                                    >
                                        <Field name="maritalStatus">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Marital Status"
                                                    field={field}
                                                    form={form}
                                                    options={statusOptions}
                                                    value={statusOptions.filter(
                                                        (status) =>
                                                            status.value ===
                                                            values.maritalStatus
                                                    )}
                                                    onChange={(status) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            status.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                </div> */}
                                {/* <FormItem
                                    label="Nationality"
                                    invalid={
                                        errors.nationality &&
                                        touched.nationality
                                    }
                                    errorMessage={errors.nationality}
                                >
                                    <Field name="nationality">
                                        {({ field, form }) => (
                                            <Select
                                                placeholder="Nationality"
                                                field={field}
                                                form={form}
                                                options={countryList}
                                                value={countryList.filter(
                                                    (country) =>
                                                        country.value ===
                                                        values.nationality
                                                )}
                                                onChange={(country) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        country.value
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem> */}
                                <div className="md:grid grid-cols-2 gap-4">
                                     {/* <FormItem
                                        label=" ALT_MobileNumber"
                                        invalid={
                                            // (errors.dialCode &&
                                            //     touched.dialCode) ||
                                            (errors.alt_mobile_no &&
                                                touched.alt_mobile_no)
                                        }
                                        errorMessage="Please enter your Alternate Mobile number"
                                    >
                                        <InputGroup>
                                            { <Field name="dialCode">
                                                {({ field, form }) => (
                                                    <Select
                                                        className="min-w-[130px]"
                                                        placeholder="Dial Code"
                                                        components={{
                                                            Option: PhoneSelectOption,
                                                            SingleValue:
                                                                PhoneControl,
                                                        }}
                                                        field={field}
                                                        form={form}
                                                        options={countryList}
                                                        value={countryList.filter(
                                                            (country) =>
                                                                country.value ===
                                                                values.dialCode
                                                        )}
                                                        onChange={(country) =>
                                                            form.setFieldValue(
                                                                field.name,
                                                                country.value
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Field> } */}
                                            {/* <Field name="alt_mobile_no">
                                                {({ field, form }) => {
                                                    return (
                                                        <NumberFormatInput
                                                            form={form}
                                                            field={field}
                                                            customInput={
                                                                NumberInput
                                                            }
                                                            placeholder="ALT mobileNumber"
                                                            onValueChange={(
                                                                e
                                                            ) => {
                                                                form.setFieldValue(
                                                                    field.name,
                                                                    e.value
                                                                )
                                                            }}
                                                        />
                                                    )
                                                }}
                                            </Field>
                                        </InputGroup>
                                    </FormItem> */}
                                    <FormItem
                                        label="Date of Birth"
                                        invalid={errors.dob && touched.dob}
                                        errorMessage={errors.dob}
                                    >
                                        <Field name="dob" placeholder="Date">
                                            {({ field, form }) => (
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    value={field.value}
                                                    onChange={(date) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            date
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {currentStepStatus === 'complete'
                                            ? 'Save'
                                            : 'Next'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default PersonalInformation
