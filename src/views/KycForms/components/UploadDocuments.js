
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
import Invoice from './Report.pdf'
import { Document, Page } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {PDFtoIMG} from 'react-pdf-to-image';

import { useNavigate } from 'react-router-dom'


// const documentTypes = [
//     { value: 'ssn', label: 'SSN Certificate', desc: '' },
//     { value: 'driversLicense', label: 'Drivers License', desc: '' },
// ]



const DocumentTypeIcon = ({ type }) => {
    switch (type) {
        case '10':
            return  <DriversLicenseSvg />

        // case '3':
        //     return <NationalIdSvg />
        default:
            return null
    }
}


const DocumentUploadField = (props) => {
    const [selectedImg, setSelectedImg] = useState({})
    const [numPages, setNumPages] = useState(null);
    const [viewOpen, setViewOpen] = useState(false)
    const { label, name, children, touched, errors, path ,exe } = props
    console.log(exe)
    if(exe === "pdf")
    {

    }
    else{

    
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
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
    const PDFJS = require("pdfjs-dist/webpack");

    const readFileData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
        resolve(e.target.result);
        };
        reader.onerror = (err) => {
        reject(err);
        };
        reader.readAsDataURL(file);
    });
    };

//param: file -> the input file (e.g. event.target.files[0])
//return: images -> an array of images encoded in base64 
const convertPdfToImages = async (file) => {
  const images = [];
  const data = await readFileData(file);
  const pdf = await PDFJS.getDocument(data).promise;
  const canvas = document.createElement("canvas");
  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const viewport = page.getViewport({ scale: 1 });
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport: viewport }).promise;
    images.append(canvas.toDataURL());
  }
  canvas.remove();
  return images;
}
    // const Img =  convertPdfToImages(Invoice)
    // console.log(Img)
    return (
        <>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <div className="group relative rounded border p-2 flex">
            
        {/* <PDFtoIMG file={Invoice}>
            {({pages}) => {
                 if (!pages.length) return 'Loading...';
                return pages.map((page, index)=>
                    <img key={index} src={page} alt ={''}/>
                )
            }}
        </PDFtoIMG> */}
             <img
                        className="rounded max-h-full max-w-full"
                        src={FinalPath}
                        alt={label}
            />
            {/* <div className="rounded max-h-full max-w-full"> */}
            {/* <Document
            file={Invoice}
            options={{ workerSrc: {pdfjsWorker} }}
            onLoadSuccess={onDocumentLoadSuccess}
            className="rounded max-h-full max-w-full"
            >
            {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} className="w-full" />
            ))}
            </Document> */}
            {/* </div> */}
            
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
}


const documentMapping = {
    
    10: ''
    //3: 'SSN Certificate'
    // Add more document IDs and names as needed
  };
 
  const DocumentName = ({ id }) => {
    // Lookup the document name based on the ID
    const documentName = documentMapping[id];
  
    return <span>{documentName}</span>;
  };
const UploadDocuments = ({
    data = {
        installer_document_mast_id: '',
        installer_master_id: '',
        document_file_path: '',
        document_file_name: '',
        document_master_id: '',
        document_file_extension: '',
        document_type:''
    },
    onNextChange,
    onBackChange,
    currentStepStatus,
}) => {
    const { textTheme, bgTheme } = useThemeClass()
    const location = useLocation()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const[InstallerId,setInstallerID] = useState([''])
   
     useEffect(() => {
         const path = location.pathname.substring(
         location.pathname.lastIndexOf('/') + 1
     )
     const requestParam = {installer_master_id : path , 
        token : token , 
        tokenKey : tokenKey
    }
        
 
     fetchData(requestParam);
 }, []);
 const dispatch = useDispatch()
 const fetchData = (requestParam) => {
    try {
        const InstallerId = {installer_master_id:requestParam.installer_master_id}
        setInstallerID(InstallerId)
        
      dispatch(getDocuments(requestParam));
    } catch (error) {
      console.error(error);
      return error;
    }
  };

//   const [dialogIsOpen, setIsOpen] = useState(false)
//   const [dialog1IsOpen,setIsOpen1] = useState(false)
//   const openNotification = (type,msg) => {
//     toast.push(
//         <Notification
//             title={msg}
//             type={type}
            
//         />,{
//             placement: 'top-end'
//         })
            
       
    
// }
//   const openDialog = (e) => {
//     setIsOpen(true)

// }
// const OpenRejectionDialog = (e)=>{
//     setIsOpen1(true)
// }
// const onDialogClose = (e) => {
//    console.log(e)
// //    OpenRejectionDialog()
   
//     setIsOpen(false)
//     // setRejectionRemarkVisible(true)
// }
// const onDialog1Close = (e) => {
//     setIsOpen(true)
//      setIsOpen1(false)
//      // setRejectionRemarkVisible(true)
//  }
// // let isVerified = false;
// const onDialogOk = async(status,values)=>{

//   var verified = {}
// //   setIsOpen(true)
// //   setIsOpen1(true)
    
//     try
//     {
//         // if(status === "Reject")
//         // {
//             verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
//             console.log(verified)
//            const  response = await dispatch(verifyDocumentsDetails( verified));
            
//         //     // const response =  VerifyPersonalDetails(verified)
//             console.log(response.payload)
//             const resp = response.payload
//         //     // if(response)
//         //     // {
//                 openNotification('success',resp.remarks)
//                 setIsOpen(false)
//                 setIsOpen1(false)
//                 setTimeout(() => {
//                     onNextChange?.('personalInformation')
//                  }, 500)
               
 
//              // }
//     }
//     catch(error)
//     {
//         console.error(error)
//         return error;
//     }
//       // onNextChange?.(values, 'personalInformation', setSubmitting)
// }

// const onDialogReject = async(status,values)=>{
//    try
//    {
//     console.log(status)
//     console.log(values)
//    const verified = {surveyor_master_id : SurveyorId.surveyor_master_id,is_verified : "0",rejection_remarks: values.remark}
//     console.log(verified)
//    const  response = await dispatch(verifyDocumentsDetails( verified));
    
// //     // const response =  VerifyPersonalDetails(verified)
//     console.log(response.payload)
//     const resp = response.payload
// //     // if(response)
// //     // {
//         openNotification('danger',resp.remarks)
//         setIsOpen(false)
//         setIsOpen1(false)
//         setTimeout(() => {
//             onNextChange?.('personalInformation')
//          }, 500)
        
//    }
//    catch(error)
//    {
//     console.error(error)
//     return error
//    }
   
   
    
    
    
// }
const navigate = useNavigate()
  const onNext = () => {
   
    navigate(`/installerlist`);
    //onNextChange?.(values, 'personalInformation', setSubmitting)
    // try{
    
      
    //     openDialog()
      
        
    // }
    // catch(error)
    // {
    //     console.log(error)
    // }
    
}
// const validationSchema = Yup.object().shape({
//     remark: Yup.string().required('Please enter your rejection remark')
//     .matches(/^[aA-zZ0-9\s]+$/,'Special character not alowed!'),
// })
  const formData = useSelector(
    (state) => state.accountDetailForm.data.formData.getData
    )
    console.log(formData)
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
                // onSubmit={(values, { setSubmitting }) => {
                  
                // //     setSubmitting(true)
                // //     // setTimeout(() => {
                // //         onNext(values, setSubmitting)
                // //     // }, 1000)
                //  }}
                
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
                                                                                        //<DocumentName id={item.document_master_id} />
                                                                                        item.document_type
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
                            {/* <div className="grid xl:grid-cols-1 gap-4"> */}
                            {/* {values.documentType === '3' && (
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
                            )} */}
                             { values && values.documentType === '10' && (
                                        <>
                                            <DocumentUploadField
                                                name={data[0].document_file_name}
                                                //label="Driver License"
                                               
                                                path = {data[0].document_file_path}
                                                exe = {data[0].document_file_extension}
                                                {...validatedProps}
                                            >
                                               
                                            </DocumentUploadField>
                                        </>
                            )}
                            
                                {/* </div> */}
                                <div className="flex justify-end gap-2 mt-6">
                               
                                <Button variant="solid" onClick={onNext}>
                                         {/* {currentStepStatus === 'complete'
                                            ? 'Save'
                                            : 'Next'} */}
                                            close
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
            {/* <Dialog
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
                        {/* <Formik
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
                                            type = "text"
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
            </Dialog> */} 
        </>
    )
}

export default UploadDocuments
