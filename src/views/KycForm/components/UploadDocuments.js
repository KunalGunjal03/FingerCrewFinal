
import {
    Button,
    Upload,
    Badge,
    Segment,
    FormItem,
    FormContainer,
    Input
    

    
} from 'components/ui'
import { SvgIcon, DoubleSidedImage, SegmentItemOption } from 'components/shared'
import { DriversLicenseSvg, PassportSvg, NationalIdSvg } from 'assets/svg'
import classNames from 'classnames'
import { Field, Form, Formik } from 'formik'
import useThemeClass from 'utils/hooks/useThemeClass'
import {FiCheckCircle} from 'react-icons/fi'
import {  useDispatch,useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { getDocuments } from '../store/dataSlice'
const documentTypes = [
    { value: 'nationalId', label: 'National ID', desc: '' },
    { value: 'driversLicense', label: 'Drivers License', desc: '' },
]



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

    // const onSetFormFile = (form, field, file) => {
    //     form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    // }

    return (
        <FormItem
            label={label}
            invalid={errors[name] && touched[name]}
            errorMessage={errors[name]}
        >
            <Field name={name}
            value = {name}
            component = {Input}
            >
                
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
    const location = useLocation()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
     useEffect(() => {
         const path = location.pathname.substring(
         location.pathname.lastIndexOf('/') + 1
     )
     const requestParam = {surveyor_master_id : path , 
        token : token , 
        tokenKey : tokenKey
    }
        
 
     fetchData(requestParam);
 }, []);
 const dispatch = useDispatch()
 const fetchData = (requestParam) => {
    try {
       const Param = {
           surveyor_master_id : requestParam.surveyor_master_id , 
           token : token , 
           tokenKey : tokenKey
       }
        //const surveyor_master_id = { surveyor_master_id : requestParam.surveyor_master_id}
      //dispatch(getForm({ surveyor_master_id,token,tokenKey}));
      dispatch(getDocuments( requestParam));
      //console.log(surveyor_master_id)
      
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const formData = useSelector(
    (state) => state.accountDetailForm.data.formData.getData
    )
    console.log(formData)

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Uploaded documents</h3>
            
            </div>
            <Formik
                // initialValues={data}
                // enableReinitialize
                // validationSchema={validationSchema}
                // onSubmit={(values, { setSubmitting }) => {
                //     setSubmitting(true)
                //     setTimeout(() => {
                //         onNext(values, setSubmitting)
                //     }, 1000)
                // }}
            >
            {({ values, touched, errors, isSubmitting }) => {
                const validatedProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormItem 
                            // label="Select your document type"
                            // invalid={
                            //     errors.documentType &&
                            //     touched.documentType
                            // }
                            // errorMessage={errors.documentType}
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
                            <div className="grid xl:grid-cols-1 gap-4">
                                    
                                        <>
                                            <DocumentUploadField
                                                name="passportCover"
                                                label="Passport Cover"
                                                {...validatedProps}
                                            >
                                               
                                            </DocumentUploadField>
                                        </>
                                   
                                </div>

                            
                        </FormContainer>
                    </Form>
                )

            }}

            </Formik>
        </>
    )
}

export default UploadDocuments
