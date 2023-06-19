import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    //Select,
    FormItem,
    FormContainer,
    toast,
    Notification

} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import NumberFormat from 'react-number-format'
// import { countryList } from 'constants/countries.constant'
// import { statusOptions } from '../constants'
import { components } from 'react-select'
//import {useSelector} from 'react'
// import * as Yup from 'yup'
import {  useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
//import { apiGetAccountFormData } from 'services/AccountServices'
import { getKYC } from '../store/dataSlice'
import { useLocation } from 'react-router-dom'
import { COMMANPATH } from 'constants/api.constant'
import {FiCheckCircle} from 'react-icons/fi'
import { HiEye, HiTrash } from 'react-icons/hi'
import { Dialog, Upload } from 'components/ui'
import * as Yup from 'yup'
import { text } from 'd3-fetch'
import { verifyKYCDetails } from '../store/dataSlice'
//import DefaultImg from "../../../../public/img/default.png"
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


const KYCForm = ({
    data = {
        surveyor_profile_photo_path:'',
        surveyor_profile_photo_name:'',
        surveyor_profile_photo_file_extension:''

    },
    onNextChange,
    currentStepStatus,
}) => {

    const location = useLocation()
    const {token,tokenKey} = useSelector((state) => state.auth.user)
    const [imageUrl, setImageUrl] = useState('');

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
//  const fetchData = (requestParam) => {
//     try {
//         dispatch(getKYC(requestParam)).then((response) => {
//             const imageFilePath = response?.data?.surveyor_profile_photo_path ;
//             if (imageFilePath) {
//                 setImageUrl(imageFilePath);
//        }
        
//     });
const fetchData = async (requestParam) => {
    try {
    console.log(requestParam)
      const response = await dispatch(getKYC(requestParam));
      const imageFileName = COMMANPATH ;
      console.log(response.payload.getData)
      const data = response.payload.getData
      console.log(data)
      const imageFilePath = data.surveyor_profile_photo_path;
      const imagefile = data.surveyor_profile_photo_name;
      const imagefileextension = data.surveyor_profile_photo_file_extension;

       const finalfilepath= imageFileName + imageFilePath + imagefile  + imagefileextension;
       console.log(finalfilepath)
       setImageUrl(finalfilepath)
     console.log(finalfilepath)
    //   if (imageFilePath) {
    //     fetchImageFromServer(imageFilePath);
    //   }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
//   const fetchImageFromServer = async (imagePath) => {
//     try {
//       const url = COMMANPATH + imageFilePath; // Construct the complete URL by concatenating the common path and the image path
//       const response = await axios.get(url, {
//         responseType: 'blob'
//       });
  
//       const imageUrl = URL.createObjectURL(response.data);
//       setImageUrl(imageUrl);
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };
//     } catch (error) {
//       console.error(error);
//       return error;
//     }
//   };
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
            verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
            console.log(verified)
           const  response = await dispatch(verifyKYCDetails( verified));
            
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
        // else if(status === "Accept")
        // {
        //     verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "1",rejection_remarks: ''}
        //     console.log(verified)
        //     dispatch(verifyPersonalDetails( verified));
            
        //     // const response =  VerifyPersonalDetails(verified)
        //     // console.log(response)
        //     // if(response)
        //     // {
        //         openNotification('success')
        //         setIsOpen(false)
        //         setIsOpen1(false)
        //         setTimeout(() => {
        //             onNextChange?.('personalInformation')
        //          }, 500)
        //         setIsvalid(true)
        // }
        //           // }
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
   const verified = {surveyor_master_id : formData.surveyor_master_id,is_verified : "0",rejection_remarks: values.remark}
    console.log(verified)
   const  response = await dispatch(verifyKYCDetails( verified));
    
//     // const response =  VerifyPersonalDetails(verified)
    console.log(response.payload)
    const resp = response.payload
//     // if(response)
//     // {
        openNotification('success',resp.remarks)
        setIsOpen(false)
        setIsOpen1(false)
        setTimeout(() => {
            onNextChange?.('addressInformation')
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
const formData = useSelector(
    (state) => state.accountDetailForm.data.formData.getData
)
const validationSchema = Yup.object().shape({
    remark: Yup.string().required('Please enter your rejection remark')
    .matches(/^[aA-zZ0-9\s]+$/,'Special character not alowed!'),
})
return (
    <>
        <div className="mb-8">
            <h3 className="mb-2">KYC Details</h3>
            {/* <p>Basic information for an account opening</p> */}
        </div>
        <Formik
            initialValues={data}
            //enableReinitialize={true}
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
                                
                               
                                {/* <FormItem
                                //label="surveyor_profile_photo_path"
                            >
                                
                                     { <Field
                                            type="text"
                                            name="imageUrl"
                                            component={Input}
                                             value ={imageUrl }
                                             readOnly
                                         /> }
                                   </FormItem>
                            
                            */}
                            { data ? (
                                <div>
                              <img
                               //className="w-75"
                               style={{width:"60%"}}
                               src={imageUrl}
                               //src={'https://www.pngitem.com/pimgs/m/20-203432_profile-icon-png-image-free-download-searchpng-ville.png'}
                               alt={''}
                             />
                               
                               <div className="flex justify-end gap-2">
                                    <Button
                                    // loading={isSubmitting}
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
                            <p> Are you want to validate KYC details!!</p>
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
                    <h5 className="mb-4">KYC Details Verification</h5>
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
                                    <Button variant="solid" type="submit" onClick={onDialogReject}>
                                    Yes
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

export default KYCForm
