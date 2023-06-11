
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
import {FiCheckCircle} from 'react-icons/fi'

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

const UploadDocuments = ({
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
           <div>
           UploadDocuments
           </div>
        </>
    )
}

export default UploadDocuments
