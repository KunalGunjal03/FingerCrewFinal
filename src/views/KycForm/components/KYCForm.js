import {
    Button,
    Upload,
    Badge,
    Segment,
    FormItem,
    FormContainer,
} from 'components/ui'
import { SvgIcon, DoubleSidedImage, SegmentItemOption } from 'components/shared'
import { DriversLicenseSvg, PassportSvg, NationalIdSvg } from 'assets/svg'
import classNames from 'classnames'
import { Field, Form, Formik } from 'formik'
import useThemeClass from 'utils/hooks/useThemeClass'

//import * as Yup from 'yup'

// const validationSchema = Yup.object().shape({
//     documentType: Yup.string().required('Please select your document type'),
//     passportCover: Yup.string().when('documentType', {
//         is: 'passport',
//         then: Yup.string().required('Please upload passport cover'),
//         otherwise: (schema) => schema,
//     }),
//     passportDataPage: Yup.string().when('documentType', {
//         is: 'passport',
//         then: Yup.string().required('Please upload passport data page'),
//         otherwise: (schema) => schema,
//     }),
//     nationalIdFront: Yup.string().when('documentType', {
//         is: 'nationalId',
//         then: Yup.string().required('Please upload your front National ID'),
//         otherwise: (schema) => schema,
//     }),
//     nationalIdBack: Yup.string().when('documentType', {
//         is: 'nationalId',
//         then: Yup.string().required('Please upload your back National ID'),
//         otherwise: (schema) => schema,
//     }),
//     driversLicenseFront: Yup.string().when('documentType', {
//         is: 'driversLicense',
//         then: Yup.string().required('Please upload your front Drivers license'),
//         otherwise: (schema) => schema,
//     }),
//     driversLicenseBack: Yup.string().when('documentType', {
//         is: 'driversLicense',
//         then: Yup.string().required('Please upload your back Drivers license'),
//         otherwise: (schema) => schema,
//     }),
// })

const documentTypes = [
    { value: 'passport', label: 'Passport', desc: '' },
    { value: 'nationalId', label: 'National ID', desc: '' },
    { value: 'driversLicense', label: 'Drivers License', desc: '' },
]

const documentUploadDescription = {
    passport: [
        'Uploaded passport image must be clearly visible & complete',
        'Passport must in valid period',
        'Provided passport data page must included your full name, date of birth & your photo',
    ],
    nationalId: [
        'Uploaded ID image must be clearly visible',
        'ID image must in valid period',
        'Provided ID must included your full name, date of birth & your photo',
    ],
    driversLicense: [
        'Uploaded driver license image must be clearly visible',
        'Driver license must in valid period',
        'Uploaded driver license image must be clearly visible',
    ],
}

const DocumentTypeIcon = ({ type }) => {
    switch (type) {
        case 'passport':
            return <PassportSvg />
        case 'nationalId':
            return <NationalIdSvg />
        case 'driversLicense':
            return <DriversLicenseSvg />
        default:
            return null
    }
}

const DocumentUploadField = (props) => {
    const { label, name, children, touched, errors } = props

    const onSetFormFile = (form, field, file) => {
        form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    }

    return (
        <FormItem
            label={label}
            invalid={errors[name] && touched[name]}
            errorMessage={errors[name]}
        >
            <Field name={name}>
                {({ field, form }) => (
                    <Upload
                        draggable
                        className="cursor-pointer h-[300px]"
                        onChange={(files) => onSetFormFile(form, field, files)}
                        onFileRemove={(files) =>
                            onSetFormFile(form, field, files)
                        }
                        showList={false}
                        uploadLimit={1}
                    >
                        {field.value ? (
                            <img
                                className="p-3 max-h-[300px]"
                                src={field.value}
                                alt=""
                            />
                        ) : (
                            <div className="text-center">
                                {children}
                                <p className="font-semibold">
                                    <span className="text-gray-800 dark:text-white">
                                        Drop your image here, or{' '}
                                    </span>
                                    <span className="text-blue-500">
                                        browse
                                    </span>
                                </p>
                                <p className="mt-1 opacity-60 dark:text-white">
                                    Support: jpeg, png
                                </p>
                            </div>
                        )}
                    </Upload>
                )}
            </Field>
        </FormItem>
    )
}

const KYCForm = ({
    data = {
        documentType: 'passport',
        passportCover: '',
        passportDataPage: '',
        nationalIdFront: '',
        nationalIdBack: '',
        driversLicenseFront: '',
        driversLicenseBack: '',
    },
    onNextChange,
    onBackChange,
    currentStepStatus,
}) => {
    const { textTheme, bgTheme } = useThemeClass()

    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'identification', setSubmitting)
    }

    const onBack = () => {
        onBackChange?.()
    }

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Identification</h3>
                <p>Upload relavant document to verify your identity.</p>
            </div>
            <Formik
                initialValues={data}
                enableReinitialize
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    const validatedProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    label="Select your document type"
                                    invalid={
                                        errors.documentType &&
                                        touched.documentType
                                    }
                                    errorMessage={errors.documentType}
                                >
                                    <Field name="documentType">
                                        {({ field, form }) => (
                                            <Segment
                                                className="flex xl:items-center flex-col xl:flex-row gap-4"
                                                value={[field.value]}
                                                onChange={(val) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        val[0]
                                                    )
                                                }
                                            >
                                                <>
                                                    {documentTypes.map(
                                                        (item, index) => (
                                                            <Segment.Item
                                                                value={
                                                                    item.value
                                                                }
                                                                key={item.value}
                                                                disabled={
                                                                    item.disabled
                                                                }
                                                            >
                                                                {({
                                                                    ref,
                                                                    active,
                                                                    value,
                                                                    onSegmentItemClick,
                                                                    disabled,
                                                                }) => {
                                                                    return (
                                                                        <SegmentItemOption
                                                                            ref={
                                                                                ref
                                                                            }
                                                                            active={
                                                                                active
                                                                            }
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            className="w-full xl:w-[260px]"
                                                                            onSegmentItemClick={
                                                                                onSegmentItemClick
                                                                            }
                                                                        >
                                                                            <div className="flex items-center">
                                                                                <SvgIcon
                                                                                    className={classNames(
                                                                                        'text-4xl ltr:mr-3 rtl:ml-3',
                                                                                        active &&
                                                                                            textTheme
                                                                                    )}
                                                                                >
                                                                                    <DocumentTypeIcon
                                                                                        type={
                                                                                            value
                                                                                        }
                                                                                    />
                                                                                </SvgIcon>
                                                                                <h6>
                                                                                    {
                                                                                        item.label
                                                                                    }
                                                                                </h6>
                                                                            </div>
                                                                        </SegmentItemOption>
                                                                    )
                                                                }}
                                                            </Segment.Item>
                                                        )
                                                    )}
                                                </>
                                            </Segment>
                                        )}
                                    </Field>
                                </FormItem>
                                <div className="mb-6">
                                    <h6>
                                        In order to complete upload and avoid
                                        delays when verifiying account, Please
                                        make sure bellow:
                                    </h6>
                                    <ul className="mt-4">
                                        {documentUploadDescription[
                                            values.documentType
                                        ].map((desc, index) => (
                                            <li
                                                className="mb-2 flex items-center"
                                                key={desc + index}
                                            >
                                                <Badge
                                                    className="rtl:ml-3 ltr:mr-3"
                                                    innerClass={bgTheme}
                                                />
                                                <span>{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="grid xl:grid-cols-2 gap-4">
                                    {values.documentType === 'passport' && (
                                        <>
                                            <DocumentUploadField
                                                name="passportCover"
                                                label="Passport Cover"
                                                {...validatedProps}
                                            >
                                                <DoubleSidedImage
                                                    className="mx-auto mb-3"
                                                    src="/img/thumbs/passport.png"
                                                    darkModeSrc="/img/thumbs/passport-dark.png"
                                                    alt=""
                                                />
                                            </DocumentUploadField>
                                            <DocumentUploadField
                                                name="passportDataPage"
                                                label="Passport Data Page"
                                                {...validatedProps}
                                            >
                                                <DoubleSidedImage
                                                    className="mx-auto mb-3"
                                                    src="/img/thumbs/passport-data.png"
                                                    darkModeSrc="/img/thumbs/passport-data-dark.png"
                                                    alt=""
                                                />
                                            </DocumentUploadField>
                                        </>
                                    )}
                                    {values.documentType === 'nationalId' && (
                                        <>
                                            <DocumentUploadField
                                                name="nationalIdFront"
                                                label="National Id Front"
                                                {...validatedProps}
                                            >
                                                <DoubleSidedImage
                                                    className="mx-auto mb-3"
                                                    src="/img/thumbs/id-card-front.png"
                                                    darkModeSrc="/img/thumbs/id-card-front-dark.png"
                                                    alt=""
                                                />
                                            </DocumentUploadField>
                                            <DocumentUploadField
                                                name="nationalIdBack"
                                                label="National Id Back"
                                                {...validatedProps}
                                            >
                                                <DoubleSidedImage
                                                    className="mx-auto mb-3"
                                                    src="/img/thumbs/id-card-back.png"
                                                    darkModeSrc="/img/thumbs/id-card-back-dark.png"
                                                    alt=""
                                                />
                                            </DocumentUploadField>
                                        </>
                                    )}
                                    {values.documentType ===
                                        'driversLicense' && (
                                        <>
                                            <DocumentUploadField
                                                name="driversLicenseFront"
                                                label="Drivers License Front"
                                                {...validatedProps}
                                            >
                                                <DoubleSidedImage
                                                    className="mx-auto mb-3"
                                                    src="/img/thumbs/drivers-license-front.png"
                                                    darkModeSrc="/img/thumbs/drivers-license-front-dark.png"
                                                    alt=""
                                                />
                                            </DocumentUploadField>
                                            <DocumentUploadField
                                                name="driversLicenseBack"
                                                label="Drivers License Back"
                                                {...validatedProps}
                                            >
                                                <DoubleSidedImage
                                                    className="mx-auto mb-3"
                                                    src="/img/thumbs/drivers-license-back.png"
                                                    darkModeSrc="/img/thumbs/drivers-license-back-dark.png"
                                                    alt=""
                                                />
                                            </DocumentUploadField>
                                        </>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" onClick={onBack}>
                                        Back
                                    </Button>
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

export default KYCForm
