
import {
    Button,
    Upload,
    Badge,
    Segment,
    FormItem,
    FormContainer,
    Input,
    toast,
    Notification,
    Dialog

    
} from 'components/ui'
import { SvgIcon, DoubleSidedImage, SegmentItemOption } from 'components/shared'
import { DriversLicenseSvg, PassportSvg, NationalIdSvg } from 'assets/svg'
import classNames from 'classnames'
import { Field, Form, Formik } from 'formik'
import useThemeClass from 'utils/hooks/useThemeClass'
import {FiCheckCircle} from 'react-icons/fi'
import {  useDispatch,useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useEffect ,useState} from 'react'
import { getDocuments } from '../store/dataSlice'
import { COMMANPATH } from 'constants/api.constant'
import * as Yup from 'yup'
import { text } from 'd3-fetch'
import { verifyDocumentsDetails } from '../store/dataSlice'
import { HiEye,HiDownload } from 'react-icons/hi'
import {MdDownload} from 'react-icons/md'
// const documentTypes = [
//     { value: 'ssn', label: 'SSN Certificate', desc: '' },
//     { value: 'driversLicense', label: 'Drivers License', desc: '' },
// ]



const DocumentTypeIcon = ({ type }) => {
    switch (type) {
        case '2':
            return <NationalIdSvg />
        case '3':
            return <DriversLicenseSvg />
        default:
            return null
    }
}


const DocumentUploadField = (props) => {
    const [selectedImg, setSelectedImg] = useState({})
    const [viewOpen, setViewOpen] = useState(false)
    const { label, name, children, touched, errors, path ,exe } = props
    const onViewOpen = (img) => {
        setSelectedImg(img)
        setViewOpen(true)
    }
    const onDialogClose = () => {
        setViewOpen(false)
        setTimeout(() => {
            setSelectedImg({})
        }, 300)
    }
    const onDownload = (img,label) =>{
        fetch(img)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = label;
					a.click();
				});
				//window.location.href = response.url;
		});
    }
    console.log(props)

    // const onSetFormFile = (form, field, file) => {
    //     form.setFieldValue(field.name, URL.createObjectURL(file[0]))
    // }
    const FinalPath = COMMANPATH + path + name + exe
    console.log(FinalPath)
    return (
        <>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="group relative rounded border p-2 flex">
             <img
                        className="rounded max-h-full max-w-full"
                        src={FinalPath}
                        alt={label}
            />
            <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                        <span
                            onClick={() => onViewOpen(FinalPath)}
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        >
                            <HiEye />
                        </span>
                        <span
                            onClick={() => onDownload(FinalPath,label)}
                            className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                        >
                            <MdDownload />
                        </span>

                    </div>
        </div>
        </div>
        <Dialog
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">{label}</h5>
                <img
                    className="w-full"
                    src={FinalPath}
                    alt={label}
                />
        </Dialog>
        </>
        // <FormItem
        //     label={label}
        //     invalid={errors[name] && touched[name]}
        //     errorMessage={errors[name]}
        // >
        //     <Field name={name}
        //     value = {name}
        //     component = {Input}
        //     >
                
        //     </Field>
        // </FormItem>
    )
}
const documentMapping = {
    
    2: 'Driving Licence',
    3: 'SSN Certificate'
    // Add more document IDs and names as needed
  };
  const DocumentName = ({ id }) => {
    // Lookup the document name based on the ID
    const documentName = documentMapping[id];
  
    return <span>{documentName}</span>;
  };
const UploadDocuments = ({
    data = {
        documentType: '',
        documents_id: '',
        document_path: '',
        document_name: '',
        document_master_id: '',
        document_extention: '',
    },
    onNextChange,
    onBackChange,
    currentStepStatus,
}) => {
    const { textTheme, bgTheme } = useThemeClass()
    const location = useLocation()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const[SurveyorId,setSurveyorID] = useState([''])
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
        const SurveyorID = {surveyor_master_id:requestParam.surveyor_master_id}
        setSurveyorID(SurveyorID)
        //const surveyor_master_id = { surveyor_master_id : requestParam.surveyor_master_id}
      //dispatch(getForm({ surveyor_master_id,token,tokenKey}));
      dispatch(getDocuments( requestParam));
      //console.log(surveyor_master_id)
      
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const [dialogIsOpen, setIsOpen] = useState(false)
  const [dialog1IsOpen,setIsOpen1] = useState(false)
  const openNotification = (type,msg) => {
    toast.push(
        <Notification
            title={msg}
            type={type}
            
        />,{
            placement: 'top-end'
        })
            
       
    
}
  const openDialog = (e) => {
    setIsOpen(true)

}
const OpenRejectionDialog = (e)=>{
    setIsOpen1(true)
}
const onDialogClose = (e) => {
   console.log(e)
//    OpenRejectionDialog()
   
    setIsOpen(false)
    // setRejectionRemarkVisible(true)
}
const onDialog1Close = (e) => {
    setIsOpen(true)
     setIsOpen1(false)
     // setRejectionRemarkVisible(true)
 }
// let isVerified = false;
const onDialogOk = async(status,values)=>{

  var verified = {}
//   setIsOpen(true)
//   setIsOpen1(true)
    
    try
    {
        // if(status === "Reject")
        // {
            verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
            console.log(verified)
           const  response = await dispatch(verifyDocumentsDetails( verified));
            
        //     // const response =  VerifyPersonalDetails(verified)
            console.log(response.payload)
            const resp = response.payload
        //     // if(response)
        //     // {
                openNotification('success',resp.remarks)
                setIsOpen(false)
                setIsOpen1(false)
                setTimeout(() => {
                    onNextChange?.('personalInformation')
                 }, 500)
               
 
             // }
    }
    catch(error)
    {
        console.error(error)
        return error;
    }
      // onNextChange?.(values, 'personalInformation', setSubmitting)
}

const onDialogReject = async(status,values)=>{
   try
   {
    console.log(status)
    console.log(values)
   const verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "0",rejection_remarks: values.remark}
    console.log(verified)
   const  response = await dispatch(verifyDocumentsDetails( verified));
    
//     // const response =  VerifyPersonalDetails(verified)
    console.log(response.payload)
    const resp = response.payload
//     // if(response)
//     // {
        openNotification('danger',resp.remarks)
        setIsOpen(false)
        setIsOpen1(false)
        setTimeout(() => {
            onNextChange?.('personalInformation')
         }, 500)
        
   }
   catch(error)
   {
    console.error(error)
    return error
   }
   
   
    
    
    
}
  const onNext = async(values, setSubmitting) => {
    try{
    
      
        openDialog()
      
        
    }
    catch(error)
    {
        console.log(error)
    }
    
}
const validationSchema = Yup.object().shape({
    remark: Yup.string().required('Please enter your rejection remark')
    .matches(/^[aA-zZ0-9\s]+$/,'Special character not alowed!'),
})
//   const formData = useSelector(
//     (state) => state.accountDetailForm.data.formData.getData
//     )
    // console.log(formData)
    console.log(data)

    return (
        <>
            <div className="mb-8">
                <h3 className="mb-2">Uploaded documents</h3>
            
            </div>
            <Formik
                initialValues={data}
                // enableReinitialize
                // validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    // setTimeout(() => {
                        onNext(values, setSubmitting)
                    // }, 1000)
                }}
                
            >
            {({ values, touched, errors, isSubmitting }) => {
                const validatedProps = {touched, errors}
                return (
                    <Form>
                        <FormContainer>
                        {Array.isArray(data) && data.length!== 0 ? (
                            <div>
                            <FormItem 
                             label="View uploaded documents"
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
                                                    {Array.isArray(data) &&  data.map(
                                                        (item, index) => (
                                                            <Segment.Item
                                                                value={
                                                                    item.document_master_id
                                                                }
                                                                key={item.document_master_id}
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
                                                                                        <DocumentName id={item.document_master_id} />
                                                                                        // item.document_master_id === 2 && <label>'Driving Licence'</label>
                                                                                    }
                                                                                </h6>
                                                                            </div>
                                                                        </SegmentItemOption>
                                                                    )
                                                                }}
                                                            </Segment.Item>
                                                        )

                                                    )
                                                    }
                                                </>
                                            </Segment>
                                        )}
                                    </Field>
                            </FormItem>
                            <div className="grid xl:grid-cols-1 gap-4">
                            {values.documentType === '3' && (
                                        <>
                                            <DocumentUploadField
                                                name={data[0].document_name}
                                                label="SSN Certificate"
                                                path = {data[0].document_path}
                                                exe = {data[0].document_extention}
                                                {...validatedProps}
                                            >
                                               
                                            </DocumentUploadField>
                                        </>
                            )}
                             {values.documentType === '2' && (
                                        <>
                                            <DocumentUploadField
                                                name={data[1].document_name}
                                                label="Driver License"
                                                path = {data[1].document_path}
                                                exe = {data[1].document_extention}
                                                {...validatedProps}
                                            >
                                               
                                            </DocumentUploadField>
                                        </>
                            )}
                                </div>
                                <div className="flex justify-end gap-2 mt-6">
                               
                                     <Button
                                        //  loading={isSubmitting}
                                         variant="solid"
                                         type="submit"
                                         icon={<FiCheckCircle />}
                                     >
                                    Validate
                                     </Button>
                                </div>
                                </div>
                         ) : (
                            <p>No data available.</p>
                         )} 
                        </FormContainer>
                    </Form>
                )

            }}

            </Formik>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Confirm Verification</h5>
                    <div className="max-h-96 overflow-y-auto">
                            <p> Are you want to validate uploaded documents!!</p>
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            // variant="plain"
                            onClick={OpenRejectionDialog}
                        >
                            No
                        </Button>
                        <Button variant="solid" onClick = {onDialogOk} >
                            Yes
                        </Button>
                    </div>
                </div>

            </Dialog>
            <Dialog
                isOpen={dialog1IsOpen}
                onClose={onDialog1Close}
                onRequestClose={onDialog1Close}
            >
                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Documents  Verification</h5>
                    <div className="max-h-96 overflow-y-auto px-2 ">
                            {/* <p> Enter Rejection remarks</p> */}
                        <Formik
                        initialValues={{
                            remark: ''
                            
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            onDialogReject('Reject',values)
                        }}
                        >
                        {({ touched, errors }) => (
                            <Form>
                                <FormContainer>
                                    <FormItem
                                     label="Rejection remark"
                                     invalid={errors.remark && touched.remark}
                                     errorMessage={errors.remark}
                                    >
                                         <Field
                                            name = "remark"
                                            component = {Input}
                                            type = {text}
                                            placeholder = "Enter rejection remarks here"
                                        />
                                    </FormItem>
                                    <div className="text-right mt-2">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        // variant="plain"
                                        onClick={onDialog1Close}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="solid" type="submit" onClick={onDialogReject} color = "red-600">
                                    Confirm
                                    </Button>
                                </div>
                                </FormContainer>
                            </Form>
                        )}
                        </Formik>
                           
                    </div>
                    
                </div>
            </Dialog>
        </>
    )
}

export default UploadDocuments
